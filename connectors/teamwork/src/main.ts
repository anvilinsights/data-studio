import { Connector, InternalField } from './connector';
import {
  GetSchemaRequest,
  GetDataRequest,
  Fields,
  GetSchema,
  GetData,
  GetConfigRequest
} from './types';

const cc = DataStudioApp.createCommunityConnector();

// https://developers.google.com/datastudio/connector/reference#isadminuser
const isAdminUser = () => {
  return true;
};

interface Config {
  site_hostname: string;
  site_resource: string;
}

// https://developers.google.com/datastudio/connector/reference#getconfig
const getConfig = (request: { configParams?: Config }) => {
  const config = cc.getConfig();

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
    );

  const siteResource =
    request && request.configParams && request.configParams.site_resource;

  if (!siteResource) {
    (config as any).setIsSteppedConfig(true);
  } else if (siteResource == 'time_entries.json') {
    // config
    //   .newInfo()
    //   .setText(
    //     'The following fields are optional and can be used to filter requested from the Teamwork API'
    //   );

    // config
    //   .newTextInput()
    //   .setId('userId')
    //   .setName('User Id')
    //   .setAllowOverride(true);

    // config
    //   .newTextInput()
    //   .setId('projectId')
    //   .setName('Project Id')
    //   .setAllowOverride(true);

    // config
    //   .newSelectSingle()
    //   .setId('showDeleted')
    //   .setName('Show Deleted')
    //   .addOption(
    //     config
    //       .newOptionBuilder()
    //       .setLabel('True')
    //       .setValue('true')
    //   )
    //   .addOption(
    //     config
    //       .newOptionBuilder()
    //       .setLabel('False')
    //       .setValue('False')
    //   )
    //   .setAllowOverride(true);
    config.setDateRangeRequired(true);
  }

  config.printJson();

  return config.build();
};

const getFields = (
  request: GetSchemaRequest<Config> | GetDataRequest<Config>
): Fields => {
  const conn = Connector.getInstance(request.configParams);

  // just fetch 1 so we can get an idea what the schema will be
  const data = conn.tryFetchData({
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
  Logger.log('getData');
  Logger.log(request.fields);

  const conn = Connector.getInstance(request.configParams);

  const query: any = {};

  if (request.dateRange) {
    query['todate'] = request.dateRange.endDate;
    query['fromdate'] = request.dateRange.startDate;
  }

  const responseData = conn.tryFetchData({ query });

  // Google seems to not like fields that contain a - in the key so we strip that out,
  // but still need to be able to translate the cleaned key (we call id) to the actual
  // key returned by the api. We can do this by mapping the
  // Google Field Id to the API response key.
  const fieldMap: { [id: string]: InternalField } = conn
    .getFields(responseData[0])
    .reduce((m, item) => {
      m[item.id] = item;
      return m;
    }, {});

  const requestedFields = getFields(request).forIds(
    request.fields.map(field => field.name)
  );

  // responseData should be an array - get the data from that and pull the requested fields + format
  const rows = responseData.map(row => {
    const values = requestedFields.asArray().map(f => {
      return row[fieldMap[f.getId()].key];
    });
    return { values };
  });

  return {
    schema: requestedFields.build(),
    rows
  };
};
