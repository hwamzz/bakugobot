const { Client, Message, MessageEmbed } = require('discord.js');
const client = require('../../index')
const blacklist = require('../../models/ticketBlacklist')

module.exports = {
    name : 'ticket',
    usage: '',
    description: 'Sends the ticket panel!',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run : async(client, message, args) => {
        // let reaction1 = '🎫';
        // if (!message.member.hasPermission(['MANAGE_CHANNELS'])) return message.channel.send('You do not have permission to send the ticket panel!')
        // const embed = new MessageEmbed()
        //     .setTitle('Ticket Panel')
        //     .setColor('ORANGE')
        //     .setDescription(`React with ${reaction1} to create a ticket!`)
        //     .setFooter(`Sent by ${message.author.username}`)
        //     .setTimestamp()

        // const msg = await message.channel.send(embed)
        // await msg.react(reaction1)

        blacklist.findOne({ Guild: message.guild.id, User: message.author.id }, async(err, data) => {
            if (err) throw err;
            if (!data) {
                let r = message.guild.roles.cache.find(ro => ro.name.toLowerCase() === 'ticket');
                if (message.member.roles.cache.has(r)) return message.channel.send('You already have a ticket open!')
                const category = message.guild.channels.cache.find(c => c.type === 'category' && c.name.toLowerCase() === 'tickets')

                const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'middleman') 
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
                        }
                    ]
                }).then(async (channel) => {
                    message.member.roles.add(r)
                    message.reply(`Your ticket has been created at <#${channel.id}>`)
                    channel.send(`${message.author}, welcome to your ticket!`)
                })
            } else {
                const msg = await message.channel.send('You are blacklisted from using commands')
                setTimeout(() => {
                    msg.delete()
                }, 5000)
            }
        })


        client.on('guildReactionAdd', (reaction, user, message) => {
            if (reaction.name === reaction1 && message.id === msg.id) {
                const member = message.guild.members.cache.get(user.id)
                let r = message.guild.roles.cache.find(ro => ro.name.toLowerCase() === 'ticket');
                if (message.member.roles.cache.has(r)) return message.channel.send('You already have a ticket open!')

                const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'middleman') 
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
    }
}