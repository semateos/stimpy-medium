// assets to be used by the 'hapi-assets' module based on process.env.NODE_ENV

var _ = require('underscore-node');
var path = require('path');
var config = require('./index');

var files  = require('bower-files')({
    dir: config.root + '/public/bower_components',
    json: config.root + '/bower.json'
});


files.js = _.map(files.js, function(filePath){

	return path.relative(config.root + '/public', filePath);
});

files.css = _.map(files.css, function(filePath){

	return path.relative(config.root + '/public', filePath);
});


module.exports = {
    development: {
        js: files.js.concat([
        	'js/main.js'
        ]),
        css: files.css.concat([
        	'css/styles.css'
        ])
    },
    production: {
        js: ['js/scripts.min.js'],
        css: ['css/styles.min.css']
    }
}