const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/pollChannel')

module.exports = {
    name: 'start',
    usage: '<reaction1> <reaction2> <message>',
    description: 'Start a poll in the poll channel!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        Schema.findOne({ Guild: message.guild.id }, async(e, data) => {
            if (!data) return message.channel.send('Please set a poll channel using .setpoll <#channel>');
            const pollQuery = args.slice(2).join(" ")
            const reaction1 = args[0]
            const reaction2 = args[1]
            if (!reaction1) return message.channel.send('Please include your first reaction!');
            if (!reaction2) return message.channel.send('Please include your second reaction!');
            if (!pollQuery) return message.channel.send('Please include a message!');

            const pollEmbed = new MessageEmbed()
                .setTitle('New Poll')
                .setColor('#0000FF')
                .setDescription(`${pollQuery}`)
                .setTimestamp()
                .setFooter(`Created by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))

            const channel = message.guild.channels.cache.get(data.Channel)
            const msg = await channel.send(pollEmbed)
            await msg.react(reaction1)
            await msg.react(reaction2)
            message.channel.send(`Successfully created your poll in ${channel}`)
        })
    }
}