const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'accept',
    usage: '<messageid>',
    description: 'Accept a suggestion',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.reply('No permission to run this command!')
        const ID = args[0];

        if (!ID) return message.reply('Please specify a message ID!');
        
        try {
            const suggestionChannel = message.guild.channels.cache.find(ch => ch.name == 'pending')
            const acceptedChannel = message.guild.channels.cache.find(ch => ch.name == 'accepted')
            const suggestedEmbed = await suggestionChannel.messages.fetch(ID)

            const data = suggestedEmbed.embeds[0];
            const acceptEmbed = new MessageEmbed()
                .setAuthor(data.author.name, data.author.iconURL)
                .setDescription(data.description)
                .setColor('GREEN')
                .setTimestamp()
                .addField("Status", 'ACCEPTED')

            await suggestedEmbed.delete()
            acceptedChannel.send(acceptEmbed)

            const user = await client.users.cache.find((u) => u.tag === data.author.name)
            user.send('Your suggestion was accepted by a staff!');
        } catch(err) {
            message.channel.send('Suggestion not found!');
        }
    }
}