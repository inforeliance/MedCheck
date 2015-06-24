'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

/**
 * User Factory managed by component/auth/user.service.js
 */

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.status(403).send('The request is for something forbidden. Authorization will not help.');
    }
  });
};

/**
 * Update User
 */
exports.update = function(req, res, next) {
  
  console.log('updateUser Called');  
  var user = req.user;
	//user = _.extend(user, req.body);  

	user.save(function(err) {
		if (err) {
			return res.status(400).send('Error updating User');		
		} else {
			res.json(user);
		}
	});
};
  
/**
 * Add New Profile
 */   
exports.addProfile = function(req, res, next) {
  
 console.log('addProfile Called');   
 var _user = req.user;  ;
   
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
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
