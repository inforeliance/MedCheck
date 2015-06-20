'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://127.0.0.1:9000',
  SESSION_SECRET: "medcheck-secret",

  FACEBOOK_ID: 'app-id',
  FACEBOOK_SECRET: 'secret',

  TWITTER_ID: 'app-id',
  TWITTER_SECRET: 'secret',

  GOOGLE_ID: '432825018485-itfrn4ih322p1nrfsuqa6lgpitghoatl.apps.googleusercontent.com',
  GOOGLE_SECRET: 'QZN-vv_MKLD335QrKV1ewP4w',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
