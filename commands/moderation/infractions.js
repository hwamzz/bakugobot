const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../../models/warns')

module.exports = {
    name: 'infractions',
    usage: '<@user>',
    description: 'Check warnings of a user!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['KICK_MEMBERS'])) return message.channel.send('You don\'t have permission to use this command!')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send('User not found, please mention a user or put their id in!')
        db.findOne({ Guild: message.guild.id, User: user.user.id }, async(err, data) => {
            if (err) throw err;
            if (!data) return message.channel.send(`No warnings for ${user}`)
            if (data.Content.length) {
                message.channel.send(new MessageEmbed()
                    .setTitle(`${user.user.tag}'s warnings:`)
                    .setDescription(
                        data.Content.map(
                            (w, i) =>
                            `\`${i + 1}\` | Moderator: ${message.guild.members.cache.get(w.moderator).user.tag}\n **->** Reason: ${w.reason}`
                        )
                    )
                    .setColor('BLUE')
                )
            } else {
                message.channel.send(`No warnings for ${user}`)
            }
        });
    }
}