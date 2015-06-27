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
  console.log('index Getting Hit');
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  console.log('create Getting Hit');
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
  console.log('User Show Getting Hit');
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
  console.log('destroy Getting Hit');
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  console.log('changePassword Getting Hit');
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
 * Add New Profile
 */   
exports.addProfile = function(req, res, next) {

  
 console.log('addProfile Called');   
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
          //return res.status(200).send('Profile Saved!');  
          //console.log(user);
          //res.json(user);
          
           console.log(model); 
           console.log('------------------'); 
          
           User.findOne({
            _id: _user._id
          }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
            if (err) return next(err);
            if (!user) return res.json(401);
             console.log(user);
            res.json(user);
          });    
      }); 
};

/**
 * Drop Profile
 */
 exports.dropProfile = function(req, res, next) {
   
   console.log('Drop Profile Called');
   
    var _user = req.user;
    
    console.log(_user.id);
    console.log(req.body._id);
    
     User.findByIdAndUpdate(_user._id,    
     { $pull: {
          profiles: {        
            _id: req.body._id            
          }
        }
     },
     {  safe: true, upsert: true},
       function(err, model) {
         if(err){
        	console.log(err);
        	return res.status(403).send('Error Deleting Profile');
         }
          return res.status(200).send('Profile Deleted!');       
      }); 
    
    
   
 };  

/**
 * Update User
 */
exports.update = function(req, res, next) {
  
  console.log('exports.update Getting Hit');  
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
 * Get my info
 */
exports.me = function(req, res, next) {
     console.log('exports.me Getting Hit');

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
     console.log('authCallback Getting Hit');

  res.redirect('/');
};
