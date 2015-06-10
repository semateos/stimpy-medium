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

var registerOpts = [
  {
  	register: require("./index")
  }
];


var start = function(){

  // Add good
  registerOpts.push({
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
  });

  server.register(registerOpts, function(err) {

    if (err) throw err;

    server.start(function() {

      console.log("Hapi server started @ " + server.info.uri.replace('0.0.0.0', 'localhost'));

      //use browserSync in dev mode
      if(config.env == 'development'){

        var browserSync = require('browser-sync').create();

        browserSync.init({

          proxy: "localhost:3000",
          files: ['public/**/*.{js,css,html}']

        });
      }

    });

  });

}

module.exports = {
  server: server,
  registerOpts: registerOpts,
  start: start
}

if (!module.parent) {

  start();
}
