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
var Profile = require('./profile.model');
var User = require('../user/user.model');

/**
 * Drop Allergen
 */   
exports.dropAllergen = function (req, res, next) {

  console.log('Drop Allergen Called');
  
  //Sample Statment ran in RoboMongo to test: 
  //  db.users.update({'profiles._id': ObjectId("558cbee0e35fadacf1193cab")}, {$pull: {'profiles.$.allergens': {'name': 'Male2'}}})
  console.log(req.body);
  
  var _user = req.user;
  var mongoose = require('mongoose');
  var id = mongoose.Types.ObjectId(_user._id),
    profileId = mongoose.Types.ObjectId(req.body._id),
    query = {
      "_id": id,
      "profiles._id": profileId
    },
    update = {
      "$pull": {
        "profiles.$.allergens": { "name": req.body.allergens.name }
      }
    },
    options = { "multi": true, "upsert": true };

  User.findOneAndUpdate(query, update, options, function (err, model) {
    if (err) {
      console.log(err);
      return res.status(500).send('Error Deleting Allergen');
    }
    console.log(model);
    return res.status(200).send('Allergen Deleted!');
  });  
};


/**
 * Add Allergen
 */   
exports.addAllergen = function(req, res, next)  {
  
 console.log('addAllergen Called');    
  
  //Sample Statment ran in RoboMongo to test: 
  //  db.users.update({'profiles._id': ObjectId("558cbee0e35fadacf1193cab")}, {$push: {'profiles.$.allergens': {'name': 'Male2'}}})
   
  console.log(req.body);
  console.log(req.body.allergens.name);
  console.log('-------------------');
   
  var _user = req.user;
  var mongoose = require('mongoose');
  var id = mongoose.Types.ObjectId(_user._id),
    profileId = mongoose.Types.ObjectId(req.body._id),
    query = {
      "_id": id,
      "profiles._id": profileId
    },
    update = {
      "$push": {
        "profiles.$.allergens": { "name": req.body.allergens.name }
      }
    },
    options = { "multi": true, "upsert": true };

  User.findOneAndUpdate(query, update, options, function (err, model) {
    if (err) {
      console.log(err);
      return res.status(500).send('Error Adding Allergen');
    }
    console.log(model);
    return res.status(200).send('Allergen Added!');
  });
};

