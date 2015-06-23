'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
* In Mongoose, we can create relationships between different data models using the ObjectId type. 
* The ObjectId data type refers to a 12 byte MongoDB ObjectId, which is actually what is stored in the database. 
* The ref property tells Mongoose what type of object the ID references and enables us
* to retrieve both items simultaneously.
*/
var ProfileSchema = new Schema({
    profilename: String,
    age: String,
    gender: String,
    pregnant: {type: Number, default: 0},
    avatar: String,
    createdAt: { type: Date, default: Date.now },
    allergens: [ { 
        name: String 
    } ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    
});

module.exports = mongoose.model('Profile', ProfileSchema);

