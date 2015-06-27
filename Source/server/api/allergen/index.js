'use strict';

var express = require('express');
var controller = require('./allergen.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

//router.get('/', auth.isAuthenticated(), controller.index);
//router.get('/:id', auth.isAuthenticated(), controller.show);
//router.post('/', auth.isAuthenticated(), controller.create);
//router.put('/:id', auth.isAuthenticated(), controller.update);
//router.patch('/dropallergen', auth.isAuthenticated(), controller.dropAllergen);
//router.patch('/addallergen', auth.isAuthenticated(), controller.addAllergen);
//router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;