const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../../models/warns')

module.exports = {
    name: 'clearinfractions',
    usage: '<@user> <amount to remove>',
    description: 'Clear infraction of a user!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('You do not have permission to use this command!')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send('User not found, please mention them or use their id!')
        
        db.findOne({ Guild: message.guild.id, User: user.user.id }, async(err, data) => {
            if (err) throw err;
            if (data) {
                let num = parseInt(args[1]) - 1
                data.Content.splice(num, 1)
                message.channel.send(`Successfully removed warnings from ${user}!`)
                data.save()
            } else {
                message.channel.send('This user has no warns in this guild!')
            }
        })
    }
}