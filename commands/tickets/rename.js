const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'rename',
    usage: '<name>',
    description: 'Rename a ticket!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const query = args.slice(0).join(" ")
        if (!query) return message.channel.send('You must include a name to rename the ticket to!')

        const category = message.guild.channels.cache.find(c => c.type === 'category' && c.name.toLowerCase() === 'tickets')

        if (message.channel.parentID !== category.id) {
            message.channel.send('You can only use this command in a ticket!');   
        }

        const channel = message.channel;
        await channel.setName(query)
        message.channel.send('Successfully renamed the ticket!')
    }
}