const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    usage: '<@user> [reason]',
    description: 'Kick a user from your server!',
    /** 
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!args[0]) return message.channel.send('Please mention a user to kick!')
        if (!message.member.hasPermission(['KICK_MEMBERS'])) return message.channel.send('You do not have permission to kick users!')
        if (!message.guild.me.hasPermission(['KICK_MEMBERS'])) return message.channel.send('I do not have permission to kick users!')
        const target = message.mentions.members.first();
        const reason = args.slice(1).join(" ")
        if (!target.kickable) return message.channel.send('I cannot kick this user!')
        if (!reason) reason = 'Unspecified';

        const embed = new MessageEmbed()
            .setColor('#FFF000')
            .setTitle('User kicked')
            .setDescription(`${target.user.tag} successfully kicked by ${message.author} for ${reason}!`)
        
        await target.kick({ reason: reason })
        message.channel.send(embed)
    }
}