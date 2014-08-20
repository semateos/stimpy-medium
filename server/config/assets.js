// assets to be used by the 'hapi-assets' module based on process.env.NODE_ENV
module.exports = {
    development: {
        js: ['js/script.js'],
        css: ['css/styles.css']
    },
    production: {
        js: ['js/script.min.js'],
        css: ['css/styles.min.css']
    }
}