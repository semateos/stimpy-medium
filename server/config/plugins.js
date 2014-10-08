module.exports = [
    {
        plugin: require("dogwater"),
        options: require("./dogwater")
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