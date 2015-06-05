
module.exports = {

    identity: 'cats',

    connection: 'diskDb',

    migrate: 'safe',

    attributes: {
        name: 'string',
        clicks: 'int'
    }

}
