import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  issuer: 'https://openid.uni-mainz.de',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/signin-oicd',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'jgu.net_portal_website',

  // set the scope for the permissions the client should request
  scope: 'openid ',
};
