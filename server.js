// This is the server version to be run standalone

// Dependencies
var Hapi = require('hapi');

// Server Config
var config = require('./server/config');

// Create a server with a host, port, and options
var server = new Hapi.Server();

server.connection({
    host: config.host,
    port: config.port,
    routes: config.hapi.options.routes
});

var plugins = require('./server/config/plugins');

plugins = plugins.concat([
    {
        register: require("good"),
        options: {
            reporters: [{
		reporter: require('good-console'),
		args: [{
		    request: '*',
		    log: '*',
		    error: '*',
		    ops: '*'
		}]
            }]
        }
    },
    { 
	register: require("./index")
    }
]);

server.register(plugins, function(err) {
	
	if (err) throw err;
	server.start(function() {
	    console.log("Hapi server started @ " + server.info.uri.replace('0.0.0.0', 'localhost'));
	});
    }
    
);
