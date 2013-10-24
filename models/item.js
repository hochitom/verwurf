var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Item = new Schema({
    name: { type: String },
    files: { type: String },
    date: { type: Date, default: now }
});

module.exports = mongoose.model('Items', Item);