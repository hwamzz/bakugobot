const mongo = require('mongoose')

let Schema = new mongo.Schema({
    Guild: String,
    User: String,
    Content: Array
})

module.exports = mongo.model('warns', Schema)