const { Client, Message, MessageEmbed } = require('discord.js');
const Levels = require('discord-xp')

module.exports = {
    name: 'addxp',
    usage: '<@user> <xp/level> <amount>',
    description: 'Add xp/level to a user!',
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
        const xpToAdd = args.slice(2).join(" ")
        if (!xpToAdd) return message.channel.send('Please include an amount to add!')
        if (isNaN(xpToAdd)) return message.channel.send('Amount to add must be a number!')

        if (args[1] === 'xp') {
            await Levels.appendXp(target.id, message.guild.id, parseInt(xpToAdd))
            message.channel.send(`Successfully added ${xpToAdd} xp to ${target.displayName}!`)
        } else if (args[1] === 'level') {
            await Levels.appendLevel(target.id, message.guild.id, parseInt(xpToAdd))
            message.channel.send(`Successfully added ${xpToAdd} levels to ${target.displayName}!`)
        } else {
            message.channel.send('Please specify either xp or level!')
        }
    }
}