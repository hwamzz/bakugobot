const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'suggest',
    usage: '<suggestion>',
    description: 'Suggest something!',
    /** 
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const createChannel = message.guild.channels.cache.find(c => c.name == 'add-suggestions')
        if (message.channel.name !== createChannel.name) return message.reply(`You can only use this command in ${createChannel}`)

        const suggestionChannel = message.guild.channels.cache.find(ch => ch.name == 'pending')
        const suggestionQuery = args.join(" ")
        if (!suggestionQuery) return message.reply('Please specify a suggestion!');

        const embed = new MessageEmbed()
            .setAuthor(`Suggestion from ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${suggestionQuery}`)
            .setColor('#40E0D0')
            .addField("Status", 'Pending')
            .setTimestamp()

        message.channel.send('Submitted suggestion')
        const msg = await suggestionChannel.send(embed)
        await msg.react('✅')
        await msg.react('❌')
    }
}