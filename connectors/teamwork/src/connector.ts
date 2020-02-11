import { Fields, Field, FieldType } from './types';

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
  TIME_ENTRIES = 'time_entries.json'
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

  makeRequest(options: URLFetchRequestOptions = {}) {
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

    return UrlFetchApp.fetch(
      `https://${this.config.site_hostname}/${this.config.site_resource}${queryString}`,
      reqParams
    );
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
  tryFetchData(options: URLFetchRequestOptions = {}): any[] {
    const res = this.makeRequest(options);

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

    return data;
  }
}
