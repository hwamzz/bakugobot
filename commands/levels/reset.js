const { Client, Message, MessageEmbed } = require('discord.js');
const Levels = require('discord-xp')

module.exports = {
    name: 'reset',
    usage: '<@user>',
    description: 'Reset the level of a user!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('No permission to use this command!')
        const target = message.mentions.members.first()
        if (!target) return message.channel.send('Please mention a user!')

        await Levels.deleteUser(target.id, message.guild.id)
        message.channel.send(`Successfully reset ${target}!`)
    }
}