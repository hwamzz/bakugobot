const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invites',
    description: 'Show your invites!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;
        let inviteCounter = {};

        message.guild.fetchInvites().then((invites) => {
            invites.forEach((invite) => {
            inviteCounter[invite.inviter.id] =
                (inviteCounter[invite.inviter.id] || 0) + invite.uses;
            });

            const c = inviteCounter[user.id] || 0;

            const embed = new MessageEmbed()
                .setDescription(`${user.username} has \`${c}\` invites`)
                .setColor('ORANGE')
            
            message.channel.send(embed)
        })
    }
}