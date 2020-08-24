import AuthService from './auth_service';
import { Connector } from './connector';
import { GetAuthType, ResetAuth } from './types';

const AUTH_PROPERTY_PATH = 'dscc.key';

const getService = (): AuthService => {
  const service = AuthService.getInstance();
  return service;
};

const validateCredentials = (key: string): boolean => {
  let res: any = undefined;
  let err: Error = undefined;

  try {
    res = UrlFetchApp.fetch('https://api.teamwork.com/authenticate.json', {
      headers: {
        Authorization: `Basic ${Utilities.base64Encode(`${key}:x`)}`
      },
      muteHttpExceptions: true
    });
  } catch (e) {
    err = e;
  }

  if (err) {
    return false;
  }

  const code = res.getResponseCode();

  return code === 200;
};

// https://developers.google.com/datastudio/connector/auth#getauthtype
const getAuthType: GetAuthType = () => {
  const conn = Connector.getInstance({} as any);
  const cc = conn.getCc();
  return cc
    .newAuthTypeResponse()
    .setAuthType(cc.AuthType.OAUTH2)
    .build();
};

// https://developers.google.com/datastudio/connector/auth#isauthvalid
const isAuthValid = (): boolean => {
  return getService().hasAccess();
};

const getOAuthService = (): AuthService => {
  return getService();
};

// https://developers.google.com/datastudio/connector/auth#resetauth
const resetAuth: ResetAuth = () => {
  const userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty(AUTH_PROPERTY_PATH);
};

const getRedirectUrl = (): string => {
  const authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
  const url = authInfo.getAuthorizationUrl();
  return url;
};

const get3PAuthorizationUrls = (): string => {
  return getService().getAuthorizationUrl();
};

const authCallback = (request: any) => {
  return getService().handleAuthCallback(request);
};
