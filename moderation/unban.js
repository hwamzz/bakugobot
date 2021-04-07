const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unban',
    usage: '<id>',
    description: 'Unban a user by ID!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!args[0]) return message.channel.send('Please add the id of a user to unban!')
        if (!message.member.hasPermission(['BAN_MEMBERS'])) return message.channel.send('You do not have permission to ban users!')
        if (!message.guild.me.hasPermission(['BAN_MEMBERS'])) return message.channel.send('I do not have permission to ban users!')
        const target = args[0]
        
        const embed = new MessageEmbed()
            .setColor('#FFF000')
            .setTitle('User unbanned')
            .setDescription(`<@${target}> successfully unbanned by ${message.author}!`)

        try {
            await message.guild.members.unban(target)
            message.channel.send(embed)
        } catch(e) {
            message.channel.send('This user is not banned!')
        }
    }
}