const { Client, Message, MessageEmbed, MessageAttachment, MessageCollector } = require('discord.js');
const Captcha = require('@haileybot/captcha-generator')

module.exports = {
    name: 'verify',
    description: 'Verify in the server',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let captcha = new Captcha()
        let role2 = message.guild.roles.cache.find(r => r.name === 'Verified Member')
        if (!role2) return;
        if (message.member.roles.cache.has(role2.id)) return;
        let channel = message.member.guild.channels.cache.find(ch => ch.name === "verify")
        if (!channel) return;
        const filter = m => m.author.id === message.author.id
        const collector = new MessageCollector(channel, filter, { time: 600000, max: 3, errors: ["time", "max"] })
        const attachment = new MessageAttachment(captcha.PNGStream, "captcha.png")
        const verifycode = await channel.send('**Please type the given verification code!**', attachment)
        collector.on("collect", async(m) => {
            if (m.content.toUpperCase() === captcha.value) {
                m.delete()
                verifycode.delete()
                message.member.roles.add(role2)
                message.member.send("Successfully completed the verification!")
            } else {
                member.send('Incorrect, please try again!')
            }
        })
    }
}