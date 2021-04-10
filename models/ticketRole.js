const mongo = require('mongoose')

const Schema = new mongo.Schema({
    Guild: String,
    Role: String,
})

module.exports = mongo.model('ticket-role', Schema)