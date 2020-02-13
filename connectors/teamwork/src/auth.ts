import {
  GetAuthType,
  SetCredentials,
  KeyCredentials,
  ResetAuth
} from './types';

import { Connector } from './connector';

const AUTH_PROPERTY_PATH = 'dscc.key';

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
    .setAuthType(cc.AuthType.KEY)
    .build();
};

// https://developers.google.com/datastudio/connector/auth#isauthvalid
const isAuthValid = (): boolean => {
  const userProperties = PropertiesService.getUserProperties();
  const key = userProperties.getProperty(AUTH_PROPERTY_PATH);
  Logger.log(key);
  return validateCredentials(key);
};

// https://developers.google.com/datastudio/connector/auth#setcredentials
const setCredentials: SetCredentials = (request: KeyCredentials) => {
  Logger.log(request);
  const key = request.key;

  const validKey = validateCredentials(key);
  if (!validKey) {
    return {
      errorCode: 'INVALID_CREDENTIALS'
    };
  }
  const userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty(AUTH_PROPERTY_PATH, key);
  return {
    errorCode: 'NONE'
  };
};

// https://developers.google.com/datastudio/connector/auth#resetauth
const resetAuth: ResetAuth = () => {
  const userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty(AUTH_PROPERTY_PATH);
};
