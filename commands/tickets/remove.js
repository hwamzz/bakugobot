const { Client, Message, MessageEmbed } = require('discord.js')
const Schema = require('../../models/ticketRole')

module.exports = {
    name: 'remove',
    usage: '<@user>',
    description: 'Remove a user from a ticket!',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const category = message.guild.channels.cache.find(c => c.type === 'category' && c.name.toLowerCase() === 'tickets')
        || message.guild.channels.cache.find(c => c.type === 'category' && c.name.toLowerCase() === 'ticket')
        || message.guild.channels.cache.find(c => c.type === 'category' && c.name.toLowerCase() === 'appeals')

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if (!data) return message.channel.send('No support role set, please tell an administrator to run .setrole!')
            if (data) {
                const r = data.Role;
                const role = message.guild.roles.cache.get(r)
                if (!message.member.roles.cache.has(role.id)) return message.channel.send('No permission!');
                if (message.channel.parentID !== category.id) return message.channel.send('You can only use this command in a ticket!');
                const mentioned = message.mentions.members.first()
                if (!mentioned) return message.channel.send('No user mentioned!');

                message.channel.updateOverwrite(mentioned, 
                    {
                        VIEW_CHANNEL: false, 
                        SEND_MESSAGES: false, 
                        ADD_REACTIONS: false, 
                        ATTACH_FILES: false
                    })

                message.channel.send(`Successfully removed ${mentioned.displayName} from the ticket!`)
            }
        })
    }
}