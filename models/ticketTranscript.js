const mongo = require('mongoose')

const Schema = new mongo.Schema({
    Channel : String,
    Content : Array
})

module.exports = mongo.model('transcripts', Schema)