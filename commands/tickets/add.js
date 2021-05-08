const { Client, Message, MessageEmbed } = require('discord.js')

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
        const category = message.guild.channels.cache.find(c => c.type === 'category' && c.name.toLowerCase() === 'tickets')
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('No permission!');
        if (message.channel.parentID !== category.id) return message.channel.send('You can only use this command in a ticket!');
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
}