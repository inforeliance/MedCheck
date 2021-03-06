/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below  
  app.use('/api/users', require('./api/user')); 
  app.use('/api/profile', require('./api/profile')); 

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);
  
    var express = require("express");
  
    app.use('/node_modules', express.static('node_modules'));


  // All other routes should redirect to the index.html
   app.route('/*')
     .get(function(req, res) {
       res.sendfile(app.get('appPath') + '/index.html');
     });
};
