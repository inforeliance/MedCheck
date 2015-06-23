'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    profilename: String,
    age: String,
    gender: String,
    pregnant: {type: Number, default: 0},
    avatar: String,
    createdAt: { type: Date, default: Date.now },
    allergens: [ { 
        name: String 
    } ]    
});

module.exports = mongoose.model('Profile', ProfileSchema);

