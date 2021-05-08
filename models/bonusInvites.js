const mongo = require('mongoose')

module.exports = mongo.model(
    'invites',
    new mongo.Schema({
        id: String,
        purse: { 
            type: Number, 
            default: 0,
            required: true 
        }
    })
);