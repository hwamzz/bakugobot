const { Client, Message, MessageEmbed } = require('discord.js');
const {  } = require('../../index')

module.exports = {
    name: 'reroll',
    usage: '<giveaway id> [winners to reroll]',
    description: 'Reroll a giveaway, with an optional amount of winners to reroll!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('No permission to reroll giveaways!')
        let messageID = args[0]
        let winners = parseInt(args[1]) || null
        if (!messageID) return message.channel.send('Please include the id of a giveaway!')
        client.giveawaysManager.reroll(messageID, {
            winnerCount: winners
        }).catch((err) => {
            message.channel.send(`No giveaway found for ${messageID}!`)
        })
    }
}