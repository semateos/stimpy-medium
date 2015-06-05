module.exports = [
    {
        register: require("dogwater"),
        options: require("./dogwater")
    },
    {
        register: require("hapi-assets"),
        options: require('./assets')
    },
    {
        register: require("hapi-named-routes")
    },
    {
        register: require("hapi-cache-buster")
    }
];
