const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/pollChannel')

module.exports = {
    name: 'remove',
    usage: '<pollID>',
    description: 'Delete a poll!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.reply('No permission to run this command!')

        Schema.findOne({ Guild: message.guild.id }, async(e, data) => {
            if (!data) return message.channel.send('Please set a poll channel using .setpoll <#channel>');
            const chann = message.guild.channels.cache.get(data.Channel)
            try {
                const pollToDelete = args[0];
                if (!pollToDelete) return message.reply('Please specify a message ID!');
                chann.messages.fetch(pollToDelete).then(async(mess) => {
                    mess.delete()
                    message.channel.send(`Deleted the specified poll!`).then(m => m.delete({ timeout: 5000 }))
                })
            } catch (err) {
                message.channel.send('Could not retrieve the message, please check you have the right poll ID!')
            }
        })
    }
}