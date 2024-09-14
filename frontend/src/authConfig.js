module.exports = {
  creds: {
    identityMetadata: `https://login.microsoftonline.com/YOUR_TENANT_ID/v2.0/.well-known/openid-configuration`,
    clientID: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    responseType: 'code id_token',
    responseMode: 'form_post',
    redirectUrl: 'http://localhost:3000/auth/openid/return',
    allowHttpForRedirectUrl: true,
    validateIssuer: false,
    passReqToCallback: false,
    useCookieInsteadOfSession: true,
    cookieEncryptionKeys: [
      { key: '12345678901234567890123456789012', iv: '123456789012' },
      { key: 'abcdefghijklmnopqrstuvwxyzabcdef', iv: 'abcdefghijkl' },
    ],
    scope: ['profile', 'offline_access', 'https://graph.microsoft.com/mail.read'],
  },
  destroySessionUrl: 'https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=http://localhost:3000',
};