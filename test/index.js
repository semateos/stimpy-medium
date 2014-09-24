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


experiment('stimpy-medium', function () {
    
    var server;
    var config = require('../server/config');

    before(function(done) {
        
        server = Hapi.createServer(config.host, config.port, config.hapi.options);
        
        server.pack.register([{ plugin: require("../index") }], function(err) {

            done(err);
        });
    });
    
    after(function(done) {
        
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
        
        // Glean the names of the plugins that were included.                
        var pluginNames = Object.keys(server._registrations);

        expect(pluginNames).to.have.members(['stimpy-medium',
                                             'dogwater',
                                             'good',
                                             'hapi-named-routes',
                                             'hapi-cache-buster',
                                             'hapi-assets']);
        
        done();
    });

    test('assets parsed', function (done) {
        
        var assets = require('../server/config/assets');

        expect(assets.development.js).to.be.an('array');
        expect(assets.development.css).to.be.an('array');

        expect(server._registrations['hapi-assets'].options.development.js).to.be.an('array');
        expect(server._registrations['hapi-assets'].options.development.css).to.be.an('array');
        expect(server._registrations['hapi-assets'].options.production.js).to.be.an('array');
        expect(server._registrations['hapi-assets'].options.production.css).to.be.an('array');

        expect(assets.development.js).to.eql(server._registrations['hapi-assets'].options.development.js);
        expect(assets.development.css).to.eql(server._registrations['hapi-assets'].options.development.css);

        done();
    });

    test('index view responds', function (done) {
        
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
    
    test('404 view reponds 404', function (done) {
        
        var options = {
            method: "GET",
            url: "/aksjdhfkajshflkajhfdlkajsdflaksdjfhsadkljfhsadlkjfhasdlkjfhasdlkjfhadslkjfhalkdsfjh"
        };
     
        server.inject(options, function(response) {

            var result = response.result;
        
            Lab.expect(response.statusCode).to.equal(404);
     
            done();
        });

    });

});