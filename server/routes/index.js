var _ = require('underscore-node');

var routers = [	
	'./api',
	'./base',
	'./static'
];

var routes = [];

_.each(routers, function(route){
	routes = routes.concat(require(route));
});

module.exports = routes;