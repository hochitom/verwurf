var express = require('express'),
    fs = require('fs'),
    gm = require('gm');

module.exports = function (id, cb) {
    console.log('hi');
    var dir = __dirname + '/../public/uploads/' + id;
    console.log(dir);
    gm(dir + '/full.png')
        .resize(300, 200)
        .write(dir + '/thumb.png', function (err) {
            if (err) {
                console.error(err);
                return err;
            } else {
                cb;
            }
        });
};