/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /profiles              ->  index
 * POST    /profiles              ->  create
 * GET     /profiles/:id          ->  show
 * PUT     /profiles/:id          ->  update
 * DELETE  /profiles/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Profiles = require('./profile.model');

