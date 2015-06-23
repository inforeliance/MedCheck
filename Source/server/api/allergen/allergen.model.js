'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AllergenSchema = new Schema({    
    name: String     
});

module.exports = mongoose.model('Allergen', AllergenSchema);