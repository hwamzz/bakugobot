const mongo = require('mongoose')

const Schema = new mongo.Schema({
    Guild: String,
    Channel: Array,
})

module.exports = mongo.model('ticket-channel', Schema)