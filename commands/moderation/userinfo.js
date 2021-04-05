const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'userinfo',
  usage: '<@user>',
  description: 'Display information about a user!',
  run: async(client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return message.reply('Please specify a member!');

    message.channel.send(
        new MessageEmbed()
          .setTitle(`Info about ${member.user.username}`)
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
          .addField('Name: ', `${member.user.username}#${member.user.discriminator}`)
          .addField('ID: ', `${member.user.id}`)
          .addField(`Created at: `, `${member.user.createdAt}`)
          .setColor('RANDOM')
          .setFooter(`Requested by ${message.author.username}`)
          .setTimestamp()
    )
  }
}