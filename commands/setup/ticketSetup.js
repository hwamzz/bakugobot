const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/ticketChannel')

module.exports = {
    name: 'setticket',
    usage: '<#channel>',
    description: 'Set the channel that ticket messages are sent in!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['MANAGE_CHANNELS'])) return message.channel.send('No permission!');
        const channel = message.mentions.channels.first();
        if (!channel) return message.channel.send('Please mention a channel!')

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if (data) {
                data.Channel.push(channel.id);
                data.save();
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Channel: channel.id
                }).save();
            }
            message.reply(`${channel} added as ticket channel!`)
        })
    }
}