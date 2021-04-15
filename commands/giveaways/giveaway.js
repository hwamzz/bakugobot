const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms')
const {  } = require('../../index')

module.exports = {
    name: 'giveaway',
    usage: '<duration> <winners> <prize>',
    description: 'Start a giveaway!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('No permission!')
        const duration = args[0]
        if (!duration) return message.channel.send('Please include a duration!')
        const winners = parseInt(args[1])
        if (!winners || isNaN(winners)) return message.channel.send('Amount of winners must be a number!')
        const prize = args.slice(2).join(" ")
        if (!prize) return message.channel.send('Please include a prize!')

        client.giveawaysManager.start(message.channel, {
            time: ms(duration),
            prize: prize,
            winnerCount: winners,
            hostedBy: message.author.username
        })
    }
}