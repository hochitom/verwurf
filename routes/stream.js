var express = require('express'),
    Item = require('../models/item'),
    mapper = require('../lib/model-mapper');


module.exports = function(app) {
    app.get('/', function(req, res) {
        Item.find({}, function(err, items) {
            res.render('item/index', { items : items });
        });
    });
}