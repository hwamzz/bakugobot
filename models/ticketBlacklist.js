const mongo = require('mongoose')

const blacklistSchema = mongo.Schema({
    Guild: String,
    User: String
})

module.exports = mongo.model('ticket-blacklist', blacklistSchema)