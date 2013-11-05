var express = require('express'),
    Item = require('../models/item'),
    gm = require('gm'),
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

    app.get('/item/:itemId', function(req, res) {
        var dir = __dirname + '/../public/uploads/' + res.locals.item._id;
        console.log(dir);
        gm(dir + '/full.png')
            .thumb(300, 200, dir + '/thumb.png', 60, function (err) {
                res.send(err);
            });
        res.render('item/detail');
    });

    app.get('/item/:itemId/edit', function(req, res) {
        res.render('item/edit');
    });

    app.post('/item/:itemId/edit', function(req, res) {
        var item = res.locals.item;
        mapper.map(req.body).to(item);

        item.save(function(err) {
            if (err) {
                res.render('item/edit', {
                    item : item
                });
            } else {
                res.redirect('/item/:itemId');
            }
        });
    });

    app.get('/item/:itemId/detail', function(req, res) {
        res.render('item/detail');
    });

    app.get('/item/:itemId/delete', function(req, res) {
        res.render('item/delete');
    });

    app.post('/item/:itemId/delete', function(req, res) {
        Item.remove({ _id : req.params.itemId }, function(err) {
            res.redirect('/items');
        });
    });
}