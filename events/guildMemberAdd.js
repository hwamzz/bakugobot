const client = require('../index')
const muteSchema = require('../models/mute')
const welcomeSchema = require('../models/welcomeChannel')
const Canvas = require("discord-canvas")
const { MessageAttachment } = require('discord.js')

client.on('guildMemberAdd', async(member) => {
    const data = await muteSchema.findOne({ Guild: member.guild.id })
    if (!data) return;
    const user = data.Users.findIndex((prop) => prop === member.id);
    if (user === -1) return;
    const role = member.guild.roles.cache.find(r => r.name === 'muted')
    member.roles.add(role.id)

    const role2 = member.guild.roles.cache.find(r => r.name === 'Member')
    member.roles.add(role2.id)  

    welcomeSchema.findOne({ Guild: member.guild.id }, async(e, data) => {
        if (!data) return;
            const user2 = member.user;
            const image = await new Canvas.Welcome()
                .setUsername(user2.username)
                .setDiscriminator(user2.discriminator)
                .setMemberCount(member.guild.memberCount)
                .setGuildName(member.guild.name)
                .setAvatar(user2.displayAvatarURL({ format: 'png' }))
                .setColor("border", "#8015EA")
                .setColor("username-box", "#8015EA")
                .setColor("discriminator-box", "#8015EA")
                .setColor("message-box", "#8015EA")
                .setColor("title", "#8015EA")
                .setColor("avatar", "#8015EA")
                .setBackground("https://img.freepik.com/free-photo/hand-painted-watercolor-background-with-sky-clouds-shape_24972-1095.jpg?size=626&ext=jpg&ga=GA1.2.1356500412.1617235200")
                .toAttachment();
        
            const attachment = new MessageAttachment((await image).toBuffer(), "goodbye-image.png");
            const channel = member.guild.channels.cache.find(ch => ch.name == 'welcome');
            channel.send(attachment);
    })
})