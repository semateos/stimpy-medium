// This is the assets controller. Goal is to serve css, js, partials, images, or bower packages.
var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    partials: {
        handler: {
            directory: { path: rootPath + '/views/partials' }
        }
    },
    images: {
        handler: {
            directory: { path: rootPath + '/public/images' }
        }
    },
    css: {
        handler: {
            directory: { path: rootPath + '/public/css' }
        }
    },
    js: {
        handler: {
            directory: { path: rootPath + '/public/js' }
        }
    },
    bower: {
        handler: {
            directory: { path: rootPath + '/public/bower_components' }
        }
    }
}