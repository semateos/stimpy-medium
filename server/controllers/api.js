// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
module.exports = {
    
    add: {
        handler: function(request, reply){
            
            // Grab the DB from dogwater
            var db = request.server.plugins['dogwater'];
            
            // Look for Stimpy in the cats model, placed there as a fixture
            // add a click to Stimpy
            db.cats.findOne(1).then(function(cat) {

                cat.clicks++;
                
                cat.save();

                reply({clicks: cat.clicks});
            });
            
        }
    },
    
    count: {
        handler: function(request, reply){

            // Grab the DB from dogwater
            var db = request.server.plugins['dogwater'];
            
            // Look for Stimpy in the cats model, placed there as a fixture
            db.cats.findOne(1)
            .then(function(cat) {
            
                // Reply with the number of clicks on Stimpy
                reply({clicks: cat.clicks});
                
            });
        }
    }
}