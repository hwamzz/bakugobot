const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'slowmodeoff',
    usage: '<#channel>',
    description: 'Remove slowmode on a specific channel!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!args[0]) return message.channel.send('Please mention a channel to slow down!')
        if (!message.member.hasPermission(['MANAGE_CHANNELS'])) return message.channel.send('You do not have permission to manage channels!')
        if (!message.guild.me.hasPermission(['MANAGE_CHANNELS'])) return message.channel.send('I do not have permission to manage channels!')

        const chanID = args[0].replace(/\D/g,'')
        const chan = message.guild.channels.cache.get(chanID)

        if (!chan.type === 'text') return message.channel.send('Invalid channel type!')
        chan.setRateLimitPerUser(0, `removed slowmode by ${message.author.username}`)
        message.channel.send(`Successfully removed slowmode in ${chan}`)
    }
}