const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../../models/warns')

module.exports = {
    name: 'warn',
    usage: '<@user> <reason>',
    description: 'Warn a user!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['KICK_MEMBERS'])) return message.channel.send('You don\'t have permission to use this command!')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send('User not found, please mention a user or put their id in!')
        const reason = args.slice(1).join(" ")
        if (!reason) return message.channel.send('Please include a reason!')
        db.findOne({ Guild: message.guild.id, User: user.user.id }, async(err, data) => {
            if (err) throw err;
            if (!data) {
                data = new db({
                    Guild: message.guild.id,
                    User: user.user.id,
                    Content: [
                        {
                            moderator: message.author.id,
                            reason: reason
                        }
                    ]
                })
                user.send(embed1)
                message.channel.send(embed2)
            } else if (data.Content.length >= 2) {
                const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
                user.roles.add(role)
                await db.findOneAndDelete({ Guild: message.guild.id, User: user.user.id })
                user.send(embed3)
                message.channel.send(embed4)
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason: reason
                }
                data.Content.push(obj)
                user.send(embed1)
                message.channel.send(embed2)
            }
            data.save()
        });
        const embed1 = new MessageEmbed()
            .setDescription(`You have been warned for ${reason}!`)
            .setColor('RED')
        const embed2 = new MessageEmbed()
            .setDescription(`Warned ${user} for ${reason}`)
            .setColor('BLUE')
        const embed3 = new MessageEmbed()
            .setDescription(`You have been muted automatically for reaching 3 infractions!`)
            .setColor('RED')
        const embed4 = new MessageEmbed()
            .setDescription(`Muted ${user} for reaching 3 infractions!`)
            .setColor('BLUE')
    }
}