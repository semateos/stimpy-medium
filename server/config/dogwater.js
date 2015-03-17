var Path = require('path');

module.exports = {
    
    models: Path.normalize(__dirname + '/../models'),
    
    data: {
		fixtures: [
		    {
				model: 'cats',
				items: [
				    {
						id: 1,
						name: 'Stimpy',
						clicks: 0
				    }
				]
		    }
		]
    },
    
    connections: {
		diskDb: {
		    adapter: 'disk'
		}
    },
    
    adapters: {
		disk: require('sails-disk')
    }
    
}
