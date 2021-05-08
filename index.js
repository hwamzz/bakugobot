const {Collection, Client, Discord} = require('discord.js')
const fs = require('fs')
const mongo = require('mongoose')
const client = new Client({
    disableEveryone: true,
    partials: ['CHANNEL', 'GUILD_MEMBER', 'REACTION', 'USER', 'MESSAGE'],
    ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_MESSAGE_REACTIONS'] }
})

mongo.connect("mongodb+srv://hwamzz:Hooded77@cluster0.r9xgl.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const config = require('./config.json')
module.exports = client;
const prefix = config.prefix
const token = config.token
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

client.login(token)