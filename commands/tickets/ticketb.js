const { Client, Message, MessageEmbed, GuildChannel } = require('discord.js')
const Schema = require('../../models/ticketChannel')

module.exports = {
    name : 'ticketb',
    usage: '',
    description: 'Create ban appeal ticket!!',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run : async(client, message, args) => {
        const category = message.guild.channels.cache.find(c => c.type === 'category' && c.name.toLowerCase() === 'appeals')

        const ch = message.guild.channels.cache.find(ch => ch.name === message.author.username && ch.parent === category)
        if(ch) return message.channel.send('You already have a ticket open.')

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
                console.log(ifWrongChannel)
                if (!ifWrongChannel) {
                    const msg = await message.channel.send('You cannot use commands here!')
                    message.delete({ timeout: 5000 })
                    msg.delete({ timeout: 5000 })
                    return;
                } else {
                    // Create ticket category if does not exist
                    if (!category) {
                        const msg1 = message.channel.send('No ticket category found, creating one!')
                        message.guild.channels.create("Appeals", {
                            type: 'category'
                        })
                    }

                    createTicketChannel(message, category)    
                
                }
            }
        )
    }
}

// Create a channel in ticket category
/**
 * @param {Message} message
 * @param {GuildChannel} category
 */
const createTicketChannel = (message, category) => {
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
        message.reply(`Your ticket has been created at <#${channel.id}>`)
        channel.send(`${message.author}, welcome to your ban appeal!`)
    })
}