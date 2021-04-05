const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'tempban',
    usage: '<@user> <duration> [reason]',
    description: 'Tempban a user from your server!',
    /** 
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!args[0]) return message.channel.send('Please mention a user to ban!')
        if (!args[1]) return message.channel.send('Please include a duration to ban the user for!')
        if (!message.member.hasPermission(['BAN_MEMBERS'])) return message.channel.send('You do not have permission to ban users!')
        if (!message.guild.me.hasPermission(['BAN_MEMBERS'])) return message.channel.send('I do not have permission to ban users!')
        const target = message.mentions.members.first();
        const reason = args.slice(2).join(" ")
        const duration = args[1]
        if (isNaN(duration)) return message.channel.send('Duration must be a number!')
        if (!target.bannable) return message.channel.send('I cannot ban this user!')
        if (!reason) reason = 'Unspecified';

        const embed = new MessageEmbed()
            .setColor('#FFF000')
            .setTitle('User banned')
            .setDescription(`${target.user.tag} successfully banned by ${message.author} for ${reason} with a duration of ${duration} days!`)
        
        await target.ban({ days: duration, reason: reason })
        message.channel.send(embed)
    }
}