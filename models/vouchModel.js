const mongo = require('mongoose')

const Schema = new mongo.Schema({
    Guild : String,
    User : String,
    Vouches : Number
})

module.exports = mongo.model('vouchschema', Schema)