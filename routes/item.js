var express = require('express'),
    Item = require('../models/item'),
    processPSD = require('../lib/processpsd'),
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
    
    app.get('/items', function(req, res) {
        Item.find({}, function(err, items) {
            res.render('item/index', { items : items });
        });
    });

    app.get('/new', function(req, res) {
        res.render('item/upload', { item : new Item() });
    });

    app.post('/new', function(req, res) {
        var item = new Item();

        item.save(function (err, data) {
            if (err) {
                console.error(err);
                res.send('sorry, there was an error saving your file');
                res.end();
            }

            processPSD(req.files.file.path, res.redirect('/verwurf/' + item._id));
        });
    });

    app.get('/items/:itemId/edit', function(req, res) {
        res.render('item/edit');
    });

    app.post('/items/:itemId/edit', function(req, res) {
        var item = res.locals.item;
        mapper.map(req.body).to(item);

        item.save(function(err) {
            if (err) {
                res.render('item/edit', {
                    item : item
                });
            } else {
                res.redirect('/items');
            }
        });
    });

    app.get('/items/:itemId/detail', function(req, res) {
        res.render('item/detail');
    });

    app.get('/items/:itemId/delete', function(req, res) {
        res.render('item/delete');
    });

    app.post('/items/:itemId/delete', function(req, res) {
        Item.remove({ _id : req.params.itemId }, function(err) {
            res.redirect('/items');
        });
    });
}