// const request = require('request');
const { google } = require('googleapis');
const cS = require('../client_secret.json');
const url = require('url');

const loginController = {};

// REDIRECTING CLIENT
loginController.googleOAuth = (req, res, next) => {
  const oauth2Client = new google.auth.OAuth2(
    cS.web.client_id,
    cS.web.client_secret,
    cS.web.redirect_uris[0]
  );

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: cS.web.scopes,
    include_granted_scopes: true,
  });

  console.log('authorizationUrl', authorizationUrl);
  res.locals.redirect = authorizationUrl;
  next();
};

// RETRIEVING INFO FROM GOOGLE AFTER AUTHENTICATION
loginController.getTokens = async (req, res, next) => {
  try {
    let q = url.parse(req.url, true).query;

    const oauth2Client = new google.auth.OAuth2(
      cS.web.client_id,
      cS.web.client_secret,
      cS.web.redirect_uris[0]
    );

    // Get access and refresh tokens (if access_type is offline)
    let { tokens } = await oauth2Client.getToken(q.code);
    oauth2Client.setCredentials(tokens);

    res.locals.client = oauth2Client;
    next();
  } catch (err) {
    console.error('The getTokens middleware returned an error: ' + err);
    next(err);
  }
};

loginController.getUserInfo = async (req, res, next) => {
  try {
    const people = google.people('v1');
    const oauth2Client = res.locals.client;
    const response = await people.people.get({
      resourceName: 'people/me',
      personFields: 'names,emailAddresses',
      auth: oauth2Client,
    });

    const { names, emailAddresses } = response.data;
    const name = names && names.length ? names[0].displayName : '';
    const email =
      emailAddresses && emailAddresses.length ? emailAddresses[0].value : '';

    res.locals.name = name;
    res.locals.email = email;
    console.log('name:', res.locals.name);
    console.log('email:', res.locals.email);
    next();
  } catch (err) {
    console.error('The getUserInfo middleware returned an error: ' + err);
    next(err);
  }
};

module.exports = loginController;
