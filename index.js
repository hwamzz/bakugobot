const { Collection, Client, MessageEmbed } = require('discord.js')
const fs = require('fs')
const Levels = require('discord-xp')
const client = new Client({
    ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_BANS'] },
    disableMentions: 'everyone',
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER']
})
const mongo = require('mongoose')
mongo.connect("mongodb+srv://bakugo:bakugo79@bakugonetwork.nvarp.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('Connected to mongodb!'))

Levels.setURL("mongodb+srv://bakugo:bakugo79@bakugonetwork.nvarp.mongodb.net/test")

const config = require('./config.json');
const token = config.token
const prefix = config.prefix
module.exports = client;
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.login(token)