// This is the hapi plugin version to be included in other projects

// Dependencies
var Hapi = require('hapi');
var Hoek = require('hoek');

// Server Config
var config = require('./server/config');

// Hapi Server Plugins
var plugins = require('./server/config/plugins');

exports.register = function(server, options, next) {

	//make config available to templates
	server.ext('onPostHandler', function (request, reply) {

		// Get the response object
		var response = request.response;

		if (request.response.variety === 'view') {
			request.response.source.context = Hoek.applyToDefaults(config, request.response.source.context);
		}

		reply.continue();

	});

	server.register(plugins, function(err) {

	    if (err) return next(err);

	    // Make sure DB is available
	    server.dependency('dogwater');

	    server.route(require('./server/routes')(server, options));

	    server.views(config.hapi.options.views);

	    next();

	});

};

var Package = require("./package.json");
exports.register.attributes = {
    name: 	Package.name,
    version: 	Package.version
}
