//controller
var controller = require('../controllers/static');

module.exports = [
    {
        method: 'GET',
        path: '/partials/{path*}',
        config: controller.partials
    },
    {
        method: 'GET',
        path: '/images/{path*}',
        config: controller.images
    },
    {
        method: 'GET',
        path: '/css/{path*}',
        config: controller.css
    },
    {
        method: 'GET',
        path: '/js/{path*}',
        config: controller.js
    },
    {
        method: 'GET',
        path: '/bower_components/{path*}',
        config: controller.bower
    }
]
