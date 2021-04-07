const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'roles',
    usage: '<@user',
    description: 'Displays the roles of mentioned user!',
    run: async(client, message, args) => {

        try {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

            const memberRoles = member.roles.cache
            .filter((roles) => roles.id !== message.guild.id)
            .map((role) => role.toString());
            
            message.channel.send(
                new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`Roles For ${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`- ${memberRoles.join('\n- ')}`)
                .setTimestamp()
            )   
        } catch (err) {
            return message.channel.send(`Internal error - ${err.message} | try again later!`)
        }

    }
}