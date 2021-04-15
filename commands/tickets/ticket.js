const { Client, Message, MessageEmbed, GuildChannel } = require('discord.js')
const Schema = require('../../models/ticketChannel')
const blacklist = require('../../models/ticketBlacklist')
const roleSchema = require('../../models/ticketRole')

module.exports = {
    name : 'ticket',
    usage: '',
    description: 'Create ticket!',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run : async(client, message, args) => {
        let r = message.guild.roles.cache.find(ro => ro.name.toLowerCase() === 'ticket');

        if (message.member.roles.cache.has(r)) return message.channel.send('You already have a ticket open!')


        roleSchema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if (err) throw err;
            if (!data) return message.channel.send('No support role setup, please contact staff!');
            if (data) {
                const role = message.guild.roles.cache.get(data.Role)

                blacklist.findOne({ Guild: message.guild.id, User: message.author.id }, async(err, data) => {
                    if (err) throw err;
                    if (!data) {
                        const category = message.guild.channels.cache.find(c => c.type === 'category' && c.name.toLowerCase() === 'tickets')
                        || message.guild.channels.cache.find(c => c.type === 'category' && c.name.toLowerCase() === 'ticket')
                        
                        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                            if (!data) return message.channel.send('No channels found, please ask the staff to set one up using .setticket <#channel>!')
                            if (err) throw err;
                            }).then(async(data) => {
                                let ifWrongChannel = false
                                if (data) {
                                    data.Channel.some((ch) => {
                                        const channelArray = message.guild.channels.cache.get(ch)
                                        if (message.channel.id == channelArray.id) {
                                            ifWrongChannel = true
                                            return true;
                                        }
                                    })
                                }
                                if (!ifWrongChannel) {
                                    const msg = await message.channel.send('You cannot use commands here!')
                                    message.delete({ timeout: 5000 })
                                    msg.delete({ timeout: 5000 })
                                    return;
                                } else {
                                    // Create ticket category if does not exist
                                    if (!category) {
                                        const msg1 = message.channel.send('No ticket category found, creating one!')
                                        message.guild.channels.create("Tickets", {
                                            type: 'category',
                                            permissionOverwrites: [
                                                {
                                                    id: role.id,
                                                    allow : [
                                                        'VIEW_CHANNEL',
                                                        'SEND_MESSAGES',
                                                        'ADD_REACTIONS',
                                                        'ATTACH_FILES'
                                                    ]
                                                }
                                            ]
                                        })
                                    }
                                    message.guild.channels.create(`${message.author.username}`, {
                                        type : 'text',
                                        parent : category.id,
                                        permissionOverwrites : [
                                            {
                                                id : message.guild.id,
                                                deny : [
                                                    'VIEW_CHANNEL'
                                                ]
                                            },
                                            {
                                                id : message.author.id,
                                                allow : [
                                                    'VIEW_CHANNEL',
                                                    'SEND_MESSAGES',
                                                    'ADD_REACTIONS',
                                                    'ATTACH_FILES'
                                                ]
                                            },
                                            {
                                                id : role.id,
                                                allow : [
                                                    'VIEW_CHANNEL',
                                                    'SEND_MESSAGES',
                                                    'ADD_REACTIONS',
                                                    'ATTACH_FILES'
                                                ] 
                                            }
                                        ]
                                    }).then(async (channel) => {
                                        message.member.roles.add(r)
                                        message.reply(`Your ticket has been created at <#${channel.id}>`)
                                        channel.send(`${message.author}, welcome to your ticket!`)
                                    })
                                }
                            }
                        )
                    } else {
                        const msg = await message.channel.send('You are blacklisted from using commands')
                        setTimeout(() => {
                            msg.delete()
                        }, 5000)
                    }
                })
            }
        })
    }
}
