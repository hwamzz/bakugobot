const { Client, Message, MessageEmbed } = require('discord.js');
const blacklist = require('../../models/ticketBlacklist')

module.exports = {
    name: 'blacklist',
    usage: '<@user>',
    description: 'Blacklist a user from using ticket commands!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('You do not have permission!')

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!target) return message.channel.send('Please include someone to blacklist!')

        blacklist.findOne({ Guild: message.guild.id, User: target.id }, async(err, data) => {
            if (err) throw err;
            if (!data) {
                data = new blacklist({
                    Guild: message.guild.id,
                    User: target.id
                }).save()
                const embed = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`${target.user.username} successfully blacklisted from tickets!`)
                message.channel.send(embed)
            } else {
                message.channel.send('User is already blacklisted!')
            }
        })
    }
}