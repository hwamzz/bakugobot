const { Collection, Client, MessageEmbed } = require('discord.js')
const fs = require('fs')
const { GiveawaysManager } = require('discord-giveaways')
const Levels = require('discord-xp')
const client = new Client({
    ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_MESSAGE_REACTIONS'] },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER']
})
const mongo = require('mongoose')
mongo.connect("mongodb+srv://bakugo:bakugo79@bakugonetwork.nvarp.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(console.log('Connected to mongodb!'))

Levels.setURL("mongodb+srv://bakugo:bakugo79@bakugonetwork.nvarp.mongodb.net/test")

const config = require('./config.json');
const token = config.token
const prefix = config.prefix
const invites = require('./models/bonusInvites')
module.exports = client;
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    updateCountdownEvery: 10000,
    endedGiveawaysLifetime: 60000 * 60 * 24 * 7,
    hasGuildMembersIntent: true,
    default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        reaction: '🎉'
    }
})

client.invites = (id) => new Promise(async ful => {
    const data = await invites.findOne({ id });
    if(!data) return ful(0)
    ful(data.purse)
})
client.add = (id, purse) => {
    invites.findOne({ id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.purse += purse;
        } else {
            data = new invites({ id, purse })
        }
        data.save();
    })
}
client.rmv = (id, purse) => {
    invites.findOne({ id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.purse -= purse;
        } else {
            data = new invites({ id, purse: -purse  })
        }
        data.save();
    })
}

client.giveawaysManager = manager;
client.login(token)