const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'slowmode',
    usage: '<#channel> <slowmode time>',
    description: 'Set slowmode on a specific channel!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!args[0]) return message.channel.send('Please mention a channel to slow down!')
        if (!args[1]) return message.channel.send('Please specify a time to slow the channel by!')
        if (!message.member.hasPermission(['MANAGE_CHANNELS'])) return message.channel.send('You do not have permission to manage channels!')
        if (!message.guild.me.hasPermission(['MANAGE_CHANNELS'])) return message.channel.send('I do not have permission to manage channels!')

        const chanID = args[0].replace(/\D/g,'')
        const chan = message.guild.channels.cache.get(chanID)
        const time = args[1]
        if (isNaN(time)) return message.channel.send('Slowmode time must be a number!')
        if (time > 21600) return message.channel.send('Slowmode time cannot be bigger than 21,600 seconds!')

        if (!chan.type === 'text') return message.channel.send('Invalid channel type!')
        chan.setRateLimitPerUser(time, `slowmode by ${message.author.username}`)
        message.channel.send(`Successfully added a slowmode of ${time} seconds to ${chan}`)
    }
}