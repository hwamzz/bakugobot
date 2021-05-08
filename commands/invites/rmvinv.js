const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'removeinv',
    usage: '<@user> <invites>',
    description: `Remove invites from a user.`,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if (!args[0]) return message.channel.send('Please mention the user you want to remove invites from!')
        if (!args[1]) return message.channel.send('Please include an amount of invites to remove!')

        const member = message.mentions.members.first();
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('No permission to remove invites!')
        const invites = await client.invites(member.id)
        if ((invites - args[1]) < 0) return message.channel.send("You cannot remove invites from this user or they would go below 0!")
        client.rmv(member.id, parseInt(args[1]));

        message.channel.send('Removed invites.')
    }
}