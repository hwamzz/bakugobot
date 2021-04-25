const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'embed',
    usage: '<#channel> <@role> <message>',
    description: 'Create a new embed and sends it to a specified channel!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const chan = message.mentions.channels.first()
        const role = message.mentions.roles.first()
        const mess = args.slice(2).join(" ");
        if (!chan) return message.channel.send('Please include the channel you want to send your message in!')
        if (!role) return message.channel.send('Please include a role to ping!')
        if (!mess) return message.channel.send('Please include a message for the embed!')

        
        const embed = new MessageEmbed()
            .setTitle(`Bakugo Announcement:`)
            .setColor('#0000FF')
            .addField("\u200b", mess)
            .setFooter(`Sent by ${message.author.username}`)
            .setTimestamp()
        
        
        chan.send(`[||${role}||]`, embed)
    }
}