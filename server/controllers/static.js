// This is the assets controller. Goal is to serve css, js, partials, images, or bower packages.
var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    partials: {
        handler: {
            directory: { path: rootPath + '/views/partials' }
        },
        app: {
            name: 'partials'
        }
    },
    images: {
        handler: {
            directory: { path: rootPath + '/public/images' }
        },
        app: {
            name: 'images'
        }
    },
    css: {
        handler: {
            directory: { path: rootPath + '/public/css' }
        },
        app: {
            name: 'css'
        }
    },
    js: {
        handler: {
            directory: { path: rootPath + '/public/js' }
        },
        app: {
            name: 'js'
        }
    },
    bower: {
        handler: {
            directory: { path: rootPath + '/public/bower_components' }
        },
        app: {
            name: 'bower'
        }
    }
}