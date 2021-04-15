const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/ticketRole')

module.exports = {
    name: 'setrole',
    usage: '<@role>',
    description: 'Set support role for tickets!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('You do not have permission to use this command!')
        const role = message.mentions.roles.first()
        if (!role) return message.channel.send('Please mention a role to set!')

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if (data) {
                Schema.findOneAndDelete({ Guild: message.guild.id })
                data.save()
                data = new Schema({
                    Guild: message.guild.id,
                    Role: role.id
                }).save()
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Role: role.id
                }).save();
            }
            message.reply(`${role} set as ticket support role!`)
        })
    }
}