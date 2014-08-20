var Hapi = require('hapi'),


// Require the routes and pass the server object.
var routes = require('./server/routes/routes')();

var plugins = require('./server/config/plugins');

exports.register = function(plugin, options, next) {

	plugin.register(plugins, function(err) {
        if (err) throw err;
    });

	plugin.route(routes);

	plugin.views({
        path: __dirname + '/server/views',
        engines: {
            html: require('swig')
        }
    });
	
	next();
};

exports.register.attributes = {
    pkg: require("./package.json")
}