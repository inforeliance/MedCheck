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
var Allergen = require('./allergen.model');
var User = require('../user/user.model');



/**
 * Drop Allergen
 */   
exports.dropAllergen = function(req, res, next) {

 console.log('Drop Allergen Called');
 
 console.log(res);
   
   //  db.users.update({'profiles._id': ObjectId("558cbee0e35fadacf1193cab")}, {$pull: {'profiles.$.allergens': {'name': 'Male2'}}})
   
   // var _user = req.user;
    
    //console.log(_user.id);
    //console.log(req.body._id);
    //console.log(profile._id);
    
    /*
    User.findByIdAndUpdate(_user._id, { 'profiles._id': req.body._id }, {$pull: { 'profiles.$.allergens': { name: obj.id}}},
     {  safe: true, upsert: true},
       function(err, model) {
         if(err){
        	console.log(err);
        	return res.status(403).send('Error Deleting Profile');
         }
          return res.status(200).send('Profile Deleted!');       
      });   */ 
      
    //   return res.status(200).send('Allergen Added!'); 
 
};


/**
 * Add Allergen
 */   
exports.addAllergen = function(req, res, next)  {
  
 console.log('addAllergen Called');    
 var _user = req.user;
 
 
  
 User.findByIdAndUpdate(_user._id,    
     { $push: {
          profiles: {        
            allergens: _.extend({}, req.body.profiles.allergens),
            profilename: req.body.profiles.profilename,
            pregnant: req.body.profiles.pregnant,
            gender: req.body.profiles.gender,
            age: req.body.profiles.age,
            avatar: req.body.profiles.avatar 
          }
        }
     },
     {  safe: true, upsert: true},
       function(err, model) {
         if(err){
        	console.log(err);
        	return res.status(403).send('Error Adding Profile');
         }
          return res.status(200).send('Profile Saved!');       
      }); 
     
      
      return res.status(200).send('Allergen Added!'); 
};

