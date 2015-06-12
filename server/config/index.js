/**
* Dependencies.
*/
var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');

var pjson = require('../../package.json');
console.log('version', pjson.version);

console.log('node env', process.env.NODE_ENV);

//templating engine:
var swig = require('swig');

//set template render chaching to false on dev
if(process.env.NODE_ENV == 'dev'){

  swig.setDefaults({ cache: false });
}

var config = {
    root: rootPath,
    host: '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 3000,
    api: '',
    title: 'Stimpy Medium',
    package: pjson,
    hapi: {
        options: {
            views: {
                path: rootPath + '/server/views',
                engines: {
                    html: {
                      module: swig
                    }
                },
                isCached: (process.env.NODE_ENV == 'development') ? false : true
            },
            routes: {
                cors: true
            }
        }
    }
}

switch(process.env.NODE_ENV){

    case 'dev':
    case 'production':
    case 'cordova':
    default:

        config.api = 'http://localhost:' + config.port;
        break;

}

config.env = process.env.NODE_ENV;

config.serveBuild = (config.env === "production" || config.env === "staging");

// Defaults that you can access when you require this config.
module.exports = config;
