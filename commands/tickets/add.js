const { Client, Message, MessageEmbed } = require('discord.js')
const Schema = require('../../models/ticketRole')

module.exports = {
    name: 'add',
    usage: '<@user>',
    description: 'Add a user to a ticket!',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const category1 = message.guild.channels.cache.find(ch => ch.type === 'category' && ch.name.toLowerCase() === 'appeals')
        const category2 = message.guild.channels.cache.find(c => c.type === 'category' && c.name.toLowerCase() === 'tickets')

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if (!data) return message.channel.send('No support role set, please tell an administrator to run .setrole!')
            if (data) {
                const r = data.Role;
                const role = message.guild.roles.cache.get(r)
                if (!message.member.roles.cache.has(role.id)) return message.channel.send('No permission!');
                if (message.channel.parentID !== category1.id && message.channel.parentID !== category2.id) return message.channel.send('You can only use this command in a ticket!');
                const mentioned = message.mentions.members.first()
                if (!mentioned) return message.channel.send('No user mentioned!');

                message.channel.updateOverwrite(mentioned, 
                    {
                        VIEW_CHANNEL: true, 
                        SEND_MESSAGES: true, 
                        ADD_REACTIONS: true, 
                        ATTACH_FILES: true
                    })

                message.channel.send(`Successfully added ${mentioned.displayName} to the ticket!`)
            }
        })
    }
}