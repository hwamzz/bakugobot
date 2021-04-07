const { Client, Message, MessageAttachment, MessageEmbed } = require('discord.js');
const canvas = require('canvas')
const Levels = require('discord-xp')
const bar = require('string-progressbar')

module.exports = {
    name: 'level',
    usage: '<@user>',
    aliases: '',
    description: 'Display rankcard of a user!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const target = message.mentions.members.first();
        if (!target) return message.channel.send('Please mention the person you would like to view the rankcard of!')
        const data = await Levels.fetch(target.id, message.guild.id)
        if (!data) return message.channel.send('This user has not gained any xp yet!')
        const xpToNext = await Levels.xpFor(data.level++)
        const currentXp = data.xp;

        const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d')
            let fontSize = 70;

            do {
                ctx.font = `${fontSize -=10}px sans-serif`
            } while (ctx.measureText(text).width > canvas.width - 300)
            return ctx.font
        }


        const rankcard = canvas.createCanvas(700, 250)
        const ctx = rankcard.getContext('2d')

        const background = await canvas.loadImage('https://img.freepik.com/free-photo/hand-painted-watercolor-background-with-sky-clouds-shape_24972-1095.jpg?size=626&ext=jpg&ga=GA1.2.1356500412.1617235200')
        ctx.drawImage(background, 0, 0, rankcard.width, rankcard.height)

        ctx.strokeStyle = '#0A7B89';
        ctx.font = applyText(rankcard, target.displayName);
        
        ctx.fillStyle = '#0B8C6E';
        ctx.strokeRect(0, 0, rankcard.width, rankcard.height)
        ctx.fillText(target.displayName, rankcard.width / 2.5, rankcard.height / 3)

        ctx.beginPath();
	    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	    ctx.closePath();
	    ctx.clip();

        const percentage = Math.floor((currentXp / xpToNext) * 100)
        const roundedPercent = Math.round(percentage)

        // let i;
        // for(i = 0; i < roundedPercent; i++)  {
        //     ctx.beginPath()
        //     ctx.lineWidth = 14
        //     ctx.strokeStyle = '#0000FF'
        //     ctx.fillStyle = '#00FF00'
        //     ctx.arc(203 + (i * 4.32), 190, 8, 0, Math.PI * 2, true)
        //     ctx.stroke()
        //     ctx.fill()
        // }

        // const progressbar = bar(xpToNext, currentXp)
        // ctx.drawImage(progressbar, 60, 60, 300, 300)

        const avatar = await canvas.loadImage(target.user.displayAvatarURL({ format: 'jpg' }))
        ctx.drawImage(avatar, 25, 25, 200, 200)

        const attachement = new MessageAttachment(rankcard.toBuffer(), 'rank-card.png')

        message.channel.send(attachement)
    }
}