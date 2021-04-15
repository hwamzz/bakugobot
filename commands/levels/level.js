const { Client, Message, MessageAttachment, MessageEmbed } = require('discord.js');
const Levels = require('discord-xp');
const canvacord = require("canvacord")

module.exports = {
    name: 'level',
    usage: '<@user>',
    description: 'Display rankcard of a user!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const target = message.mentions.members.first() || message.author
        let name;
        let discrim;
        let av;
        if (!target) {
           name = message.mentions.members.first().user.username || message.author.username
           discrim = message.mentions.members.first().user.discriminator || message.author.discriminator
           av = message.mentions.members.first().user.displayAvatarURL({ format: 'png' }) || message.author.displayAvatarURL({ format: 'png' })
        }
        const data = await Levels.fetch(target.id, message.guild.id, true)
        if (!data) return message.channel.send('This user has not gained any xp yet!')
        const xpToNext = await Levels.xpFor(data.level + 1)
        const currentXp = data.xp;
        const level = data.level;
        const position = data.position;

        const rank = new canvacord.Rank()
            .setAvatar(av || message.author.displayAvatarURL({ format: 'png' }))
            .setLevel(level)
            .setCurrentXP(currentXp)
            .setRequiredXP(xpToNext)
            .setRank(position)
            .setStatus("dnd")
            .setProgressBar("#FFFFFF", "COLOR")
            .setUsername(name || message.author.username)
            .setDiscriminator(discrim || message.author.discriminator)

        rank.build()
            .then(data => {
                const attachment = new MessageAttachment(data, "rankcard.png")
                message.channel.send(attachment)
            })
    }
}