const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'deny',
    usage: '<messageid>',
    description: 'Deny a suggestion',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.reply('No permission to run this command!')
        const messageID = args[0];

        if (!messageID) return message.reply('Please specify a message ID!');
        
        try {
            const suggestionChannel = message.guild.channels.cache.find(ch => ch.name == 'suggestions')
            const deniedChannel = message.guild.channels.cache.find(ch => ch.name == 'denied')
            const suggestedEmbed = await suggestionChannel.messages.fetch(messageID)

            const data = suggestedEmbed.embeds[0];
            const denyEmbed = new MessageEmbed()
                .setAuthor(data.author.name, data.author.iconURL)
                .setDescription(data.description)
                .setColor('RED')
                .setTimestamp()
                .addField("Status", 'DENIED')

            suggestedEmbed.delete()
            deniedChannel.send(denyEmbed)

            const user = await client.users.cache.find((u) => u.tag === data.author.name)
            user.send('Your suggestion was denied by a staff!');
        } catch(err) {
            message.channel.send('Suggestion not found!');
        }
    }
}