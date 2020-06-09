import { Fields, Field, FieldType } from './types';

type GoogleURLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

interface URLFetchRequestOptions
  extends GoogleAppsScript.URL_Fetch.URLFetchRequestOptions {
  query?: { [key: string]: any };
}

export const AUTH_PROPERTY_PATH = 'dscc.key';

export interface Config {
  site_hostname: string;
  site_resource: string;
}

export enum Resources {
  TIME_ENTRIES = 'time_entries.json',
  PROJECTS = 'projects.json'
}

export interface Response {
  data: any[];
  headers: { [key: string]: any };
}

export interface InternalField {
  // id is the id/key of the field for google while key is the id/key of the field in the inquicker response
  id: string;
  key: string;
  name: string;
  fieldType: FieldType;
  valueType: 'metric' | 'dimension';
}

export class Connector {
  private static instance: Connector;
  private readonly apiKey: string;
  private readonly cc: GoogleAppsScript.Data_Studio.CommunityConnector;

  static getInstance(config: Config): Connector {
    if (!this.instance) {
      this.instance = new Connector(config);
    }
    return this.instance;
  }

  constructor(private readonly config: Config) {
    const properties = PropertiesService.getUserProperties();
    this.apiKey = properties.getProperty(AUTH_PROPERTY_PATH);
    this.cc = DataStudioApp.createCommunityConnector();
    if (!this.config.site_resource) {
      this.config.site_resource = Resources.TIME_ENTRIES;
    }
  }

  makeRequest(
    options: URLFetchRequestOptions = {}
  ): { url: string; options: GoogleURLFetchRequestOptions } {
    const { query, ...params } = options;

    let queryString =
      !!query &&
      Object.entries(query)
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join('&');

    queryString = queryString ? `?${queryString}` : '';

    const reqParams = params && {
      ...params,
      headers: {
        ...(params.headers || {}),
        Authorization: `Basic ${Utilities.base64Encode(`${this.apiKey}:x`)}`
      }
    };

    const url = `https://${this.config.site_hostname}/${this.config.site_resource}${queryString}`;

    return { url, options: reqParams };
  }

  fetchRequest(reqOptions: URLFetchRequestOptions = {}) {
    const { url, options } = this.makeRequest(reqOptions);

    return UrlFetchApp.fetch(url, options);
  }

  fetchAllRequests(reqOptions: URLFetchRequestOptions = {}) {
    // will override the passed query params if they contain page or page size
    const pageSize = 500;

    const data = [];
    const query = reqOptions.query || {};

    query['page'] = 1;
    query['pageSize'] = pageSize;

    reqOptions.query = query;

    // make the first request to get the total number of pages
    const firstReq = this.fetchRequest(reqOptions);

    const firstRes = Utilities.jsonParse(firstReq.getContentText());
    const keys = Object.keys(firstRes).filter(k => k !== 'STATUS');

    if (keys.length !== 1) {
      this.cc
        .newDebugError()
        .setText(
          `[fetchAllRequests] the response from the first request contains an unexpected number of keys. Expected = 1, Actual = ${keys.length}`
        )
        .throwException();
    }

    const key = keys[0];
    data.push(...firstRes[key]);

    const headers = firstReq.getAllHeaders();
    const totalPages = Number(headers['x-pages']);
    const totalRecords = Number(headers['x-records']);

    if (!totalPages || totalPages === NaN) {
      this.cc
        .newDebugError()
        .setText(
          '[fetchAllRequests] the first request did not contain the x-pages header.'
        )
        .throwException();
    }

    // get the rest of the pages
    // if there are 9 pages we want to get 2..9, we already have one
    // [...[0..(9-1)]].map(i + 2) = [2..9]
    const requests = [...Array(totalPages - 1).keys()]
      .map(i => i + 2)
      .map(page => {
        query['page'] = page;
        reqOptions.query = query;
        reqOptions.muteHttpExceptions = true;
        const req = this.makeRequest(reqOptions);
        return {
          url: req.url,
          ...req.options
        };
      });

    UrlFetchApp.fetchAll(requests).forEach(response => {
      if (response.getResponseCode() !== 200) {
        console.error({ body: response.getContentText() });
        this.cc
          .newDebugError()
          .setText(
            '[fetchAllReuests] A request in fetchAll call returned a non 200 response!'
          )
          .throwException();
      }
      const body = Utilities.jsonParse(response.getContentText());
      data.push(...body[key]);
    });

    if (data.length !== totalRecords) {
      Logger.log(
        `[warning]: total records at end of fetch does not equal the expected number of records. Expected ${totalRecords}, Actual: ${data.length}`
      );
    }

    return data;
  }

  getFields(data: any): Array<InternalField> {
    const types = this.cc.FieldType;

    return Object.entries(data)
      .map(([key, value]): InternalField | null => {
        if (
          typeof value !== 'string' &&
          typeof value !== 'number' &&
          typeof value !== 'boolean'
        ) {
          return null;
        }

        let fieldType: FieldType;

        if (typeof value === 'boolean') {
          fieldType = types.BOOLEAN;
        } else if (typeof value === 'number') {
          fieldType = types.NUMBER;
        } else {
          fieldType = types.TEXT;
        }

        const id = key
          .trim()
          .split('-')
          .join('_');

        const name = key
          .trim()
          .split(/[-_\ ]/)
          .filter(s => s.length > 0)
          .map(s => {
            if (s.length === 1) {
              return s;
            }
            return s[0].toUpperCase() + s.slice(1);
          })
          .join('');

        return {
          fieldType,
          name,
          key,
          id,
          valueType: typeof value === 'number' ? 'metric' : 'dimension'
        };
      })
      .filter(f => f !== null);
  }

  makeSchema(data: any): Fields {
    const fields = this.cc.getFields();

    this.getFields(data).forEach(f => {
      let field: Field;

      if (f.valueType === 'metric') {
        field = fields.newMetric();
      } else {
        field = fields.newDimension();
      }

      field
        .setId(f.id)
        .setName(f.name)
        .setType(f.fieldType);
    });

    return fields;
  }

  // this is similar to makeRequest but works under the assumption that it's a teamwork
  // request, with data in the response that should be extracted, if not it will throw exceptions
  // that are expected to be exposed to the client
  tryFetchData(options: URLFetchRequestOptions = {}): Response {
    const res = this.fetchRequest(options);

    // 200 <= code < 300
    if (res.getResponseCode() < 200 || res.getResponseCode() >= 300) {
      this.cc
        .newUserError()
        .setText('The teamwork API returned an error')
        .setDebugText(
          `Teamwork api returned response with status code outside of expected range.
          Expected: 200 <= code < 300, Actual: ${res.getResponseCode()}`
        )
        .throwException();
    }

    const body = Utilities.jsonParse(res.getContentText());
    // The response should only have 2 items STATUS and the one with the data. The teamwork API does not
    // use a static 'data' variable with the response so we have to try and figure out the name of the key
    // associated with the data.
    const key = Object.keys(body).filter(s => s !== 'STATUS')[0];

    if (key === undefined) {
      this.cc
        .newUserError()
        .setText('The teamwork API returned an invalid response')
        .setDebugText(
          `Teamwork API returned response with only STATUS key. Response keys: ${Utilities.jsonStringify(
            Object.keys(body)
          )}`
        )
        .throwException();
    }

    const data = body[key];
    const headers = res.getHeaders();

    return { data, headers };
  }

  getCc() {
    return this.cc;
  }
}
