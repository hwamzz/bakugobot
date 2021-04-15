const { Client, Message, MessageEmbed } = require('discord.js');
const {  } = require('../../index')

module.exports = {
    name: 'end',
    usage: '<giveaway id>',
    description: 'End a giveaway!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('No permission to end giveaways!')
        let messageID = args[0]
        if (!messageID) return message.channel.send('Please include the id of a giveaway!')
        client.giveawaysManager.end(messageID).catch((err) => {
            message.channel.send(`No giveaway found for ${messageID}!`)
        })
    }
}