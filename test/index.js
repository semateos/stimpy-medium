// Load modules
var Lab = require('lab');
var Hapi = require('hapi');

// Test shortcuts
var lab = exports.lab = Lab.script();
var expect = Lab.expect;
var beforeEach = lab.beforeEach;
var experiment = lab.experiment;
var test = lab.test;


experiment('Stimpy-medium', function () {
    
    test('loads certain plugins from config on a server with some options.', function (done) {
        
        // Server Config
        var config = require('../server/config');
        
        // Create a server with a host, port, and options
        var server = Hapi.createServer(config.host, config.port, config.hapi.options);
        
        // Hapi Server Plugins
        var plugins = require('../server/config/plugins');;
        
        server.pack.register(plugins, function(err) {
                
                expect(err).to.not.exist;
                
                // Glean the names of the plugins that were included.                
                var pluginNames = Object.keys(server._registrations);
                
                expect(pluginNames).to.have.members(['dogwater',
                                                     'good',
                                                     'hapi-named-routes',
                                                     'hapi-cache-buster',
                                                     'hapi-assets']);
                
                done();
            }
            
        );
    });
    
});