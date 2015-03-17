//controller for default routes
var controller = require('../controllers/api');

module.exports = [
    {
        method: 'GET',
        path: '/api/button/add',
        config: controller.add
    },
    {
        method: 'GET',
        path: '/api/button/count',
        config: controller.count
    },
]