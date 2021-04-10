const { Client, Message, MessageEmbed, MessageFlags } = require('discord.js');

module.exports = {
    name: 'purge',
    usage: '<all/user id (bot or member)> <number to clear (1-100)>',
    description: 'Clear messages from anyone (all) or a user, for up to 99 messages!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!args[0]) return message.channel.send('Please include all or a user/bot ID as the argument to clear!')
        if (!args[1] || isNaN(args[1]) || parseInt(args[1]) > 99 || parseInt(args[1] < 1)) return message.channel.send('Please include a number of messages to clear, above 1 and up to 99!')

        if (!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.channel.send('No permission to use this command!')
        if (!message.guild.me.hasPermission(['MANAGE_MESSAGES'])) return message.channel.send('I don\'t have permission to use this command!')

        if (args[0] == 'all') {
            await message.channel.bulkDelete(parseInt(args[1]))
                .catch(err => console.log(err))
            message.channel.send(`Deleted ${args[1]} messages!`).then(m => m.delete({ timeout: 5000 }))
        } else {
            message.channel.messages.fetch({
                limit: 100
            }).then((messages) => {
                let target = message.guild.members.cache.get(args[0]);
                let userMessages = [];
                messages.filter(m => m.author.id == target).forEach(msg => userMessages.push(msg))
                message.channel.bulkDelete(parseInt(args[1]), (userMessages))
                    .catch(err => console.log(err))
                message.channel.send(`Deleted ${args[1]} messages!`).then(m => m.delete({ timeout: 5000 }))
            })
        }
    }
}