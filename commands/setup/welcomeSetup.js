const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/welcomeChannel')

module.exports = {
    name: 'setwelcome',
    usage: '<#channel>',
    description: 'Set the channel that welcome messages are sent to!',
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
                data.Channel = channel.id;
                data.save();
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Channel: channel.id
                }).save();
            }
            message.reply(`${channel} set as welcome channel!`)
        })
    }
}