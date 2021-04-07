const { Client, Message, MessageEmbed } = require('discord.js');
const Levels = require('discord-xp')

module.exports = {
    name: 'removexp',
    usage: '<@user> <xp/level> <amount>',
    description: 'Remove xp/level from a user!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('No permission to use this command!')
        const target = message.mentions.members.first()
        if (!target) return message.channel.send('Please mention a user!')
        if (!args[1]) return message.channel.send('Please specify either xp or level!')
        const xpToRemove = args[2]
        if (!xpToRemove) return message.channel.send('Please include an amount to remove!')
        if (isNaN(xpToRemove)) return message.channel.send('Amount to remove must be a number!')

        if (args[1] === 'xp') {
            await Levels.subtractXp(target.id, message.guild.id, parseInt(xpToRemove))
            message.channel.send(`Successfully removed ${xpToRemove} xp to ${target.displayName}!`)
        } else if (args[1] === 'level') {
            await Levels.subtractLevel(target.id, message.guild.id, parseInt(xpToRemove))
            message.channel.send(`Successfully removed ${xpToRemove} levels to ${target.displayName}!`)
        } else {
            message.channel.send('Please specify either xp or level!')
        }
    }
}