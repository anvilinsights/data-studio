// TODO - all of the `Object` types could probably be better specified in the
// future, but since that's what the builder's `.build()` return, this is the
// best we can do for now.

// getAuthType
export type GetAuthTypeResponse = {};

// getSchema

export interface GetSchemaRequest<T> {
  configParams: T;
}
export interface GetSchemaResponse {
  schema: {}[];
}

// getConfig

export interface GetConfigRequest {
  languageCode: string;
}
export type GetConfigResponse = {};

// getData

export interface DefaultConfigParams {
  [configId: string]: string;
}
export interface GetDataRequest<T> {
  configParams?: T;
  scriptParams: {
    sampleExtraction: boolean;
    lastRefresh: string;
  };
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  fields: Array<{
    name: string;
  }>;
}

export type GetDataRowValue = string | number | boolean;
export interface GetDataRow {
  values: Array<GetDataRowValue>;
}
export type GetDataRows = Array<GetDataRow>;

export interface GetDataResponse {
  schema: Object[];
  rows: GetDataRows;
}

// setCredentials
export interface UserPassCredentials {
  userPass: {
    username: string;
    password: string;
  };
}

export interface UserTokenCredentials {
  userToken: {
    username: string;
    token: string;
  };
}

export interface KeyCredentials {
  key: string;
}

export type SetCredentialsRequest =
  | UserPassCredentials
  | UserTokenCredentials
  | KeyCredentials;

export interface SetCredentialsResponse {
  errorCode: 'NONE' | 'INVALID_CREDENTIALS';
}

export type FieldType = GoogleAppsScript.Data_Studio.FieldType;
export type Field = GoogleAppsScript.Data_Studio.Field;
export type Fields = GoogleAppsScript.Data_Studio.Fields;

// Useful connector functions
export type GetFields = () => Fields;

// Connector Function Types

export type IsAdminUser = () => boolean;
export type GetConfig = (request: GetConfigRequest) => GetConfigResponse;
export type GetData<T = DefaultConfigParams> = (
  request: GetDataRequest<T>
) => GetDataResponse;
export type GetSchema<T = DefaultConfigParams> = (
  request: GetSchemaRequest<T>
) => GetSchemaResponse;
export type IsAuthValid = () => boolean;
export type ResetAuth = () => void;
export type AuthCallback = (
  request: object
) => GoogleAppsScript.HTML.HtmlOutput;
export type SetCredentials = (
  request: SetCredentialsRequest
) => SetCredentialsResponse;
export type GetAuthType = () => GetAuthTypeResponse;
