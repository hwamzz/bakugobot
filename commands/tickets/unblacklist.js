const { Client, Message, MessageEmbed } = require('discord.js');
const blacklist = require('../../models/ticketBlacklist')

module.exports = {
    name: 'unblacklist',
    usage: '<@user>',
    description: 'Unblacklist a user from using ticket commands!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('You do not have permission!')

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!target) return message.channel.send('Please include someone to unblacklist!')

        blacklist.findOne({ Guild: message.guild.id, User: target.id }, async(err, data) => {
            if (err) throw err;
            if (!data) {
                message.channel.send('User is not blacklisted!')
            } else {
                await blacklist.findOneAndDelete({ Guild: message.guild.id, User: target.id })
                message.channel.send(`${target.user.username} was unblacklisted!`)
            }
        })
    }
}