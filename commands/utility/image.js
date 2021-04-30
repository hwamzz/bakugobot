const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'image',
    usage: '<#channel> <@role> <image link>',
    description: 'Create a new embed and sends it to a specified channel!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('You do not have permission to use this command!')
        const chan = message.mentions.channels.first()
        const role = message.mentions.roles.first() || '@everyone'
        const mess = args.slice(2).join(" ");
        if (!chan) return message.channel.send('Please include the channel you want to send your message in!')
        if (!role) return message.channel.send('Please include a role to ping!')
        if (!mess) return message.channel.send('Please include an image for the embed!')


        const embed = new MessageEmbed()
            .setTitle(`Bakugo Announcement:`)
            .setColor('#0000FF')
            .setImage(mess)
            .setFooter(`Sent by ${message.author.username}`)
            .setTimestamp()
        
        
        chan.send(`[||${role}||]`, embed)
    }
}