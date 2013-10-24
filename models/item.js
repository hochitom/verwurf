var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Item = new Schema({
    name: { type: String },
    files: { 
    	big: {type: String},
    	big_r: {type: String},
    	medium: {type: String},
    	medium_r: {type: String},
    	thumbnail: {type: String},
    	thumbnail_r: {type: String},
    },
    date: { type: Date, default: now }
});

module.exports = mongoose.model('Items', Item);