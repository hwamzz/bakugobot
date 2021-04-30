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

        // IF user id exists in array, add number of users they have invited to current number

        message.guild.fetchInvites().then((invites) => {
            const inv = invites.find(invite => invite.inviter.id == user.id)

            const c = inv.uses

            const embed = new MessageEmbed()
                .setDescription(`${user.username} has \`${c}\` invites`)
                .setColor('ORANGE')
            
            message.channel.send(embed)
        })
    }
}