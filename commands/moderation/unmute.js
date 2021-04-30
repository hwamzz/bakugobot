const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/mute')

module.exports = {
    name: 'unmute',
    usage: '<@user>',
    description: 'Unmute a user!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['MUTE_MEMBERS'])) return message.channel.send('You do not have permission to use this command!')
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) return message.channel.send('Please include a user to unmute!')

        const role = message.guild.roles.cache.find(r => r.name === 'muted');
        Schema.findOne({
            Guild: message.guild.id
        }, async(err, data) => {
            if (!data) return message.reply('Member was not muted!')
            const user = data.Users.findIndex((prop) => prop === member.id)
            if (user === -1) return message.reply('Member is not muted!')
            data.Users.splice(user, 1)
            await member.roles.remove(role)
            message.channel.send(`${member.displayName} was unmuted by ${message.author}`)
        })
    }
}