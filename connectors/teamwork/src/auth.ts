import {
  GetAuthType,
  SetCredentials,
  KeyCredentials,
  ResetAuth,
  OAuthCreds
} from './types';

import { Connector } from './connector';
import AuthService from './auth_service';

const AUTH_PROPERTY_PATH = 'dscc.key';
const OAUTH_CLIENT_ID = 'CLIENT_ID';
const OAUTH_CLIENT_SECRET = 'CLIENT_SECRET';

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
  // const userProperties = PropertiesService.getUserProperties();
  // const key = userProperties.getProperty(AUTH_PROPERTY_PATH);

  // return validateCredentials(key);
  return getService().hasAccess();
};

const getOAuthService = (): AuthService => {
  return getService();
};

// https://developers.google.com/datastudio/connector/auth#setcredentials
// const setCredentials: SetCredentials = (request: KeyCredentials) => {
//   const key = request.key;

//   const validKey = validateCredentials(key);
//   if (!validKey) {
//     return {
//       errorCode: 'INVALID_CREDENTIALS'
//     };
//   }

//   const userProperties = PropertiesService.getUserProperties();
//   userProperties.setProperty(AUTH_PROPERTY_PATH, key);

//   return {
//     errorCode: 'NONE'
//   };
// };

// https://developers.google.com/datastudio/connector/auth#resetauth
const resetAuth: ResetAuth = () => {
  const userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty(AUTH_PROPERTY_PATH);
};

// const getOAuthCredentials = (): OAuthCreds => {
//   const properties = PropertiesService.getScriptProperties();

//   const clientId = properties.getProperty(OAUTH_CLIENT_ID);
//   const clientSecret = properties.getProperty(OAUTH_CLIENT_SECRET);

//   return { clientId, clientSecret };
// };

const getRedirectUrl = (): string => {
  const authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
  const url = authInfo.getAuthorizationUrl();
  return url;
};

const get3PAuthorizationUrls = (): string => {
  return getService().getAuthorizationUrl();
};

const authCallback = (request: any) => {
  console.log({ message: 'authcallback invoked', request });

  return getService().handleAuthCallback(request);
};
