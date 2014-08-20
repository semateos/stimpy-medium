/**
* Dependencies.
*/
var Hapi = require('hapi');

//
var config = require('./server/config');

// Create a server with a host, port, and options
var server = Hapi.createServer('0.0.0.0', config.port, config.hapi.options);

// Bootstrap Hapi Server Plugins, passes the server object to the plugins
var plugins = require('./server/config/plugins');

server.pack.register(plugins, function(err) {
    if (err) throw err;
});

// Add the server routes
server.route(require('./server/routes/base'));
server.route(require('./server/routes/static'));

//Start the server
server.start(function() {
    //Log to the console the host and port info
    console.log('Server started at: ' + server.info.uri);    
});
