var express = require('express'),
    Item = require('../models/item'),
    fs = require('fs'),
    Parser = require('psd').Parser,
    Canvas = require('canvas'),
    PixelArray = require('canvas/lib/bindings').CanvasPixelArray,
    ImageData = require('canvas/lib/bindings').ImageData

module.exports = function (path, cb) {
    var data = fs.readFileSync(path);

    var psd = new Parser(data);
    psd.parse()
        .imageData
        .createCanvas()
        .pngStream()
        .pipe(fs.createWriteStream(__dirname + '/../public/uploads/' + new Date().getTime() + '.png'))
        .on("finish", cb);
};
