const OAUTH_CLIENT_ID = 'CLIENT_ID';
const OAUTH_CLIENT_SECRET = 'CLIENT_SECRET';

const TEAMWORK_AUTH_URL = 'https://www.teamwork.com/launchpad/login';
const TEAMWORK_TOKEN_URL = 'https://www.teamwork.com/launchpad/v1/token.json';

export default class AuthService {
  private static instance: AuthService;
  private service: GoogleAppsScriptOAuth2.OAuth2Service;

  constructor() {
    const properties = PropertiesService.getScriptProperties();

    const clientId = properties.getProperty(OAUTH_CLIENT_ID);
    const clientSecret = properties.getProperty(OAUTH_CLIENT_SECRET);

    this.service = OAuth2.createService('teamwork_connector')
      .setAuthorizationBaseUrl(TEAMWORK_AUTH_URL)
      .setTokenUrl(TEAMWORK_TOKEN_URL)
      .setClientId(clientId)
      .setClientSecret(clientSecret)
      .setPropertyStore(PropertiesService.getUserProperties())
      .setCallbackFunction('authCallback');
  }

  static getInstance(): AuthService {
    if (!this.instance) {
      this.instance = new AuthService();
    }
    return this.instance;
  }

  getRedirectUrl(): string {
    return this.service.getRedirectUri();
  }

  getAuthorizationUrl(): string {
    return this.service.getAuthorizationUrl();
  }

  handleAuthCallback(request: any) {
    const { parameters } = request;
    let { code } = parameters;

    if (Array.isArray(code)) {
      code = code[0];
    }

    const data = { parameter: { code } };
    const authorized = this.service.handleCallback(data);

    if (!authorized) {
      return HtmlService.createHtmlOutput('Authorization failed.');
    }

    return HtmlService.createHtmlOutput('Successfully authorized');
  }

  hasAccess(): boolean {
    return this.service.hasAccess();
  }

  getAccessToken(): string {
    return this.service.getAccessToken();
  }

  getToken(): any {
    return this.service.getToken();
  }
}
