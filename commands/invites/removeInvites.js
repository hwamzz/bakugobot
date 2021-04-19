const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'removeinvites',
    usage: '<@user> <amount>',
    description: 'Remove invites from a user!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('You do not have permission to remove invites!')
        const user = message.mentions.users.first()
        if (!user) return message.channel.send('Please include a member to remove invites from!')
        const numToRemove = parseInt(args[1])
        if (!numToRemove || isNaN(numToRemove)) return message.channel.send('Amount of invites to remove must be a number!')
        let inviteCounter = {};

        message.guild.fetchInvites().then((invites) => {
            invites.forEach((invite) => {
            inviteCounter[invite.inviter.id] =
                (inviteCounter[invite.inviter.id] || 0) + invite.uses;
            });

            const c = inviteCounter[user.id] - numToRemove || 0 - numToRemove;

            const embed = new MessageEmbed()
                .setDescription(`${user.username} now has \`${c}\` invites`)
                .setColor('ORANGE')
            
            message.channel.send(embed)
        })
    }
}