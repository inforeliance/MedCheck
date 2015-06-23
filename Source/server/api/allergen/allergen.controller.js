/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /allergens              ->  index
 * POST    /allergens              ->  create
 * GET     /allergens/:id          ->  show
 * PUT     /allergens/:id          ->  update
 * DELETE  /allergens/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Profiles = require('./allergen.model');
