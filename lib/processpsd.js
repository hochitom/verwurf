var express = require('express'),
    fs = require('fs'),
    Parser = require('psd').Parser,
    Canvas = require('canvas'),
    PixelArray = require('canvas/lib/bindings').CanvasPixelArray,
    ImageData = require('canvas/lib/bindings').ImageData;

module.exports = function (srcPath, id, cb) {
    fs.readFile(srcPath, function (err, data) {
        if (err) {
            console.error(err);
            return err;
        }

        var psd = new Parser(data);
        psd.parse();

        var height = psd.header.rows;
        var width = psd.header.columns;

        var pixels = new PixelArray(width, height);
        var channels = psd.imageData.image.channel;

        var color = psd.imageData.createColor(psd.header, psd.colorModeData);

        var x, y, index;
        for(y = 0; y < height; ++y) {
            for(x = 0; x < width; ++x) {
                index = (y * width + x);
                pixels[index * 4    ] = color[0][index];
                pixels[index * 4 + 1] = color[1][index];
                pixels[index * 4 + 2] = color[2][index];
                pixels[index * 4 + 3] = 255;
            }
        }

        var canvas = new Canvas(width, height);
        var ctx = canvas.getContext('2d');

        var imageData = new ImageData(pixels);
        ctx.putImageData(imageData, 0, 0);

        var dir = __dirname + '/../public/uploads/' + id;
        fs.mkdir(dir, function () {
            canvas.pngStream().pipe(fs.createWriteStream(dir + '/full.png', cb));
        });
    });
};