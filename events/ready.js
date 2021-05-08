const client = require('../index')
const config = require('../config.json')
const prefix = config.prefix;
const ms = require('ms')
const Schema = require('../models/memberCount')
const { promisify } = require('util')
const wait = promisify(setTimeout)

let invites;
let id = '582318888407269404';

client.on('ready', async() => {
    client.user.setActivity(`${prefix}help`)
    console.log(`${client.user.username} ✅`)

    setInterval(() => {
        Schema.find().then((data) => {
            if (!data && !data.length) return;

            data.forEach((value) => {
                const guild = client.guilds.cache.get(value.Guild)
                const memberCount = guild.memberCount

                if (value.Member != memberCount) {
                    const channel = guild.channels.cache.get(value.Channel)
                    channel.setName(`Members: ${memberCount}`)

                    value.Member = memberCount
                    value.save()
                }
            })
        })
    }, ms('5 minutes'))

        await wait(2000)
        client.guilds.cache.get(id).fetchInvites().then(inv => {
        invites = inv;
    })
})