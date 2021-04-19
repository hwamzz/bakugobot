const mongo = require('mongoose')

const Schema = new mongo.Schema({
    Guild: String,
    User: String,
    Bonus: String,
})

module.exports = mongo.model('bonus-invites', Schema)