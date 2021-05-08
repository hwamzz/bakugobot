const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'addinv',
    usage: '<@user> <invites>',
    description: `Add invites to a user.`,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if (!args[0]) return message.channel.send('Please mention the user you want to add invites to!')
        if (!args[1]) return message.channel.send('Please include an amount of invites to add!')

        const member = message.mentions.members.first();
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('No permission to add invites!')
        client.add(member.id, parseInt(args[1]));

        message.channel.send('Added invites.')
    }
}