import { Connector, InternalField } from './connector';
import {
  GetSchemaRequest,
  GetDataRequest,
  Fields,
  GetSchema,
  GetData
} from './types';

// https://developers.google.com/datastudio/connector/reference#isadminuser
const isAdminUser = () => {
  const userEmail = Session.getEffectiveUser().getEmail();
  const matches = userEmail.match(/@(.+)$/gm);

  if (Array.isArray(matches) && matches.length > 0) {
    const domain = matches[0];
    return domain.toLowerCase() === '@anvilinsights.com';
  }

  return false;
};

interface Config {
  site_hostname: string;
  site_resource: string;
}

// https://developers.google.com/datastudio/connector/reference#getconfig
const getConfig = (request: { configParams?: Config; site_resource?: any }) => {
  const conn = Connector.getInstance(request as any);
  const cc = conn.getCc();
  const isFirstRequest = request.configParams === undefined;

  const config = cc.getConfig();

  if (isFirstRequest) {
    // TODO should update upstream type defs
    (config as any).setIsSteppedConfig(true);
  }

  config
    .newInfo()
    .setId('general_info')
    .setText(
      'This is a data studio connector for pulling data from the Teamwork API.'
    );

  config
    .newTextInput()
    .setId('site_hostname')
    .setName('Teamwork Site Hostname')
    .setHelpText('e.g. yoursite.teamwork.com');

  config
    .newSelectSingle()
    .setId('site_resource')
    .setName('Teamwork Resource')
    .addOption(
      config
        .newOptionBuilder()
        .setLabel('Time Entries')
        .setValue('time_entries.json')
    )
    .addOption(
      config
        .newOptionBuilder()
        .setLabel('Projects')
        .setValue('projects.json')
    );

  if (request.site_resource == 'time_entries.json') {
    config.setDateRangeRequired(true);
  }

  return config.build();
};

const getFields = (
  request: GetSchemaRequest<Config> | GetDataRequest<Config>
): Fields => {
  const conn = Connector.getInstance(request.configParams);
  const cc = conn.getCc();

  // just fetch 1 so we can get an idea what the schema will be
  const { data } = conn.tryFetchData({
    query: { pageSize: 1 },
    muteHttpExceptions: true
  });

  if (data.length === 0) {
    cc.newUserError()
      .setText('The teamwork API returned no data')
      .setDebugText(`Teamwork API returned response with no items.`)
      .throwException();
  }

  return conn.makeSchema(data[0]);
};

// https://developers.google.com/datastudio/connector/reference#getschema
const getSchema: GetSchema<Config> = (request: GetSchemaRequest<Config>) => {
  const fields = getFields(request);
  return { schema: fields.build() };
};

// https://developers.google.com/datastudio/connector/reference#getdata
const getData: GetData<Config> = request => {
  const conn = Connector.getInstance(request.configParams);

  const query: any = {};

  if (request.dateRange) {
    query['todate'] = request.dateRange.endDate;
    query['fromdate'] = request.dateRange.startDate;
  }

  const responseData = conn.fetchAllRequests({ query });

  // Google seems to not like fields that contain a dash (-) in the key so we strip that out,
  // but still need to be able to translate the cleaned key (we call id) to the actual
  // key returned by the api. We can do this by mapping the
  // Google Field Id to the API response key.
  const fieldMap: { [id: string]: InternalField } = conn
    .getFields(responseData[0])
    .reduce((m, item) => {
      m[item.id] = item;
      return m;
    }, {});

  const requestedFields = conn
    .makeSchema(responseData[0])
    .forIds(request.fields.map(field => field.name));

  const fieldArray = requestedFields.asArray();

  // responseData should be an array - get the data from that and pull the requested fields + format
  const rows = responseData.map(row => {
    const values = fieldArray.map(f => {
      return row[fieldMap[f.getId()].key];
    });
    return { values };
  });

  return {
    schema: requestedFields.build(),
    rows
  };
};
