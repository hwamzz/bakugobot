const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'editembed',
    usage: '<channel> <messageID> <new description>',
    description: 'Edit an embed',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.reply('No permission to run this command!')
        const ID = args[1];
        const chan = message.mentions.channels.first()
        if (!ID) return message.reply('Please specify a message ID!');
        if (!chan) return message.reply('Please include the channel the message is in!')
        const mess = args.slice(2).join(" ")
        if (!mess) return message.reply('Please enter a new description for the embed!')
        try {
            const embed = await chan.messages.fetch(ID)
            const data = embed.embeds[0]

            const updatedEmbed = new MessageEmbed()
                .setTitle(data.title)
                .addField("\u200b", mess)
                .setColor(data.color)
                .setTimestamp()
                .setFooter(data.footer.text)

            embed.edit(updatedEmbed)
        } catch(err) {
            message.channel.send('Message not found!');
        }
    }
}