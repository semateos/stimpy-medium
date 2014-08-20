
module.exports = [
    {
        plugin: require("good"),
        options: {
            subscribers: {
                console: ['ops', 'request', 'log', 'error'],
                'tmp/logs/': ['ops', 'request', 'log', 'error']
            }
        }
    },
    {
        plugin: require("hapi-assets"),
        options: require('./assets')
    },
    {
        plugin: require("hapi-named-routes")
    },
    {
        plugin: require("hapi-cache-buster")
    }
];