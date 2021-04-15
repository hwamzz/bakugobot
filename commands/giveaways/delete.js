const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'delete',
    usage: '<giveaway id>',
    description: 'Delete a giveaway!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('No permission to delete giveaways!')
        let messageID = args[0]
        if (!messageID) return message.channel.send('Please include the id of a giveaway!')
        client.giveawaysManager.delete(messageID, { doNotDeleteMessage: false }).catch((err) => {
            message.channel.send(`No giveaway found for ${messageID}!`)
        })
    }
}