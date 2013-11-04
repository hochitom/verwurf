var express = require('express'),
    Item = require('../models/item'),
    mapper = require('../lib/model-mapper');


module.exports = function(app) {

    app.param('itemId', function(req, res, next, id) {
        Item.findOne({ _id : id }, function(err, item) {
            if (err) {
                next(err);
            } else {
                res.locals.item = item;
                next();
            }
        });
    });
    
    app.get('/api/stream', function(req, res) {
        Item.find({}, function(err, items) {
            res.send(items);
        });
    });

    app.get('/api/item/:itemId', function(req, res) {
        res.send(res.locals.item);
    });

    app.put('/api/item/:itemId', function(req, res) {
        var item = res.locals.item;
        mapper.map(req.body).to(item);

        item.save(function(err) {
            if (err) res.send(err);

            res.send('Item updated');
        });
    });

    app.delete('/api/item/:itemId', function(req, res) {
        Item.remove({ _id : req.params.itemId }, function(err) {
            if (err) res.send(err);
            res.send('item deleted!');
        });
    });
}