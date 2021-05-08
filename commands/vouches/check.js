const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/vouchModel')

module.exports = {
    name: 'rep',
    usage: '<@user>',
    description: 'Shows the reputation of a player!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.members.first()
        if (!user) return message.channel.send('Please mention a user to view the reputation of!')

        Schema.findOne({ Guild: message.guild.id, User: user.id }, async(err, data) => {
            if (err) throw err;
            if (!data) {
                const embed = new MessageEmbed()
                    .setTitle(`${user.user.username}'s reputation!`)
                    .setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true }))
                    .setColor('ORANGE')
                    .setDescription(`Vouches: 0`)
                    .setTimestamp()

                message.channel.send(embed)
            } else {
                vouchnum = data.Vouches
                const embed = new MessageEmbed()
                    .setTitle(`${user.user.username}'s reputation!`)
                    .setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true }))
                    .setColor('ORANGE')
                    .setDescription(`Vouches: ${vouchnum}`)
                    .setTimestamp()

                message.channel.send(embed)
            }
        })
    }
}