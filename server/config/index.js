/**
* Dependencies.
*/
var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');

var pjson = require('../../package.json');
console.log('version', pjson.version);

console.log('node env', process.env.NODE_ENV);

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
                    html: require('swig')
                }
            },
            routes: {
                cors: true
            }
        }
    }
}

switch(process.env.NODE_ENV){

    case 'development':
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
