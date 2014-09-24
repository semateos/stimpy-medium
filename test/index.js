// Load modules
var Lab = require('lab');
var Hapi = require('hapi');
var Async = require('async');

// Test shortcuts
var lab = exports.lab = Lab.script();
var expect = Lab.expect;
var beforeEach = lab.beforeEach;
var before = lab.before;
var after = lab.after;
var afterEach = lab.afterEach;
var experiment = lab.experiment;
var test = lab.test;


experiment('Stimpy-medium', function () {
    
    var server;
    var config = require('../server/config');

    beforeEach(function(done) {
        
        server = Hapi.createServer(config.host, config.port, config.hapi.options);
        
        done();
        
    });
    
    afterEach(function(done) {
        
        var orm = server.plugins.dogwater.cats.waterline;
        
        /* Take each connection used by the orm... */
        Async.each(Object.keys(orm.connections), function(key, cbDone) {
            
            var adapter = orm.connections[key]._adapter;
            
            /* ... and use the relevant adapter to kill it. */
            if (typeof adapter.teardown === "function") {
                
                adapter.teardown(function() {
                    cbDone();
                });
                
            } else {
                cbDone();
            }
            
        },
        function (err) {
            done(err);
        });
        
    });
    
    test('loads certain plugins from config on a server with some options.', function (done) {
        
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
        });
    });

    test('test index page', function (done) {
        
        server.pack.register([{ plugin: require("../index") }], function(err) {
                
            var options = {
                method: "GET",
                url: "/"
            };
         
            server.inject(options, function(response) {

                var result = response.result;
         
                Lab.expect(response.statusCode).to.equal(200);
         
                done();
            });
        });
    });
    
});