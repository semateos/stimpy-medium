// This is the hapi plugin version to be included in other projects

// Dependencies
var Hapi = require('hapi');

// Server Config
var config = require('./server/config');

// Export the plugin
exports.register = function(plugin, options, next) {
	
    // Make sure DB is available
    plugin.dependency('dogwater');
    
    plugin.route(require('./server/routes'));
    
    plugin.views(config.hapi.options.views);
    
    next();
};

exports.register.attributes = {
    pkg: require("./package.json")
}