Path = require('path');

module.exports = {
    
    models: Path.normalize(__dirname + '/../models'),

    connections: {
	diskDb: {
	    adapter: 'disk'
	}
    },
    
    adapters: {
	disk: require('sails-disk')
    }
    
}
