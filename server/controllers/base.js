// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
module.exports = {
    index: {
        handler: function(request, reply){
            // Render the view with the custom greeting
            reply.view('index', {
                title: 'Stimpy, you eediot!'
            });
        }
    },
    missing: {
        handler: function(request, reply){
            reply.view('404', {
                title: '404 error!'
            }).code(404);
        }
    }
}