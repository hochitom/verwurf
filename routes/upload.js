var express = require('express'),
    Item = require('../models/item'),
    processPSD = require('../lib/processpsd'),
    mapper = require('../lib/model-mapper');


module.exports = function(app) {
    app.get('/new', function(req, res) {
        res.render('item/upload', { item : new Item() });
    });

    app.post('/new', function(req, res) {
        var item = new Item();

        // To-Do: check filetype to process image the right way
        item.save(function (err, data) {
            if (err) {
                console.error(err);
                res.send('sorry, there was an error saving your file');
                res.end();
            }

            processPSD(req.files.file.path, item._id, res.redirect('/verwurf/' + item._id));
        });
    });
}