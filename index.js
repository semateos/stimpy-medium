// This is the hapi plugin version to be included in other projects

// Dependencies
var Hapi = require('hapi');

// Server Config
var config = require('./server/config');

// Export the plugin
exports.register = function(server, options, next) {
	
    // Make sure DB is available
    server.dependency('dogwater');
    
    server.route(require('./server/routes'));
    
    server.views(config.views);
    
    next();
};

var Package = require("./package.json");
exports.register.attributes = {
    name: 	Package.name,
    version: 	Package.version
}