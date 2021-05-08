const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/vouchModel')

module.exports = {
    name: 'vouch',
    usage: '<@user> <reason>',
    description: 'Vouch someone for a reason!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.members.first()
        const reason = args.slice(1).join(" ")
        const role = message.guild.roles.cache.find(r => r.name === "Service-Badge [Used Middleman]")
        const role2 = message.guild.roles.cache.find(r => r.name === "Service-Badge [Military]")
        const role3 = message.guild.roles.cache.find(r => r.name === "Middleman")
        const role4 = message.guild.roles.cache.find(r => r.name === "Product-Seller")

        if (!message.member.roles.cache.has(role.id)) return message.channel.send('You do not have permission!')
        if (!user) return message.channel.send('Please mention a user to vouch!')
        if (!reason) return message.channel.send('Please include a reason for your vouch!')
        if (!user.roles.cache.has(role3.id)) return message.channel.send('You cannot vouch a non Middleman!') 


        Schema.findOne({ Guild: message.guild.id, User: user.id }, async(err, data) => {
            if (err) throw err;
            if (!data) {
                data = new Schema({
                    Guild: message.guild.id,
                    User: user.id,
                    Vouches: 1
                }).save()
                const embed = new MessageEmbed()
                    .setTitle('Vouch Successful')
                    .setColor('ORANGE')
                    .addField("User: ", user.user.username)
                    .addField("Reason: ", reason)
                    .addField("Vouches: ", '1')
                    .setTimestamp()

                message.channel.send(embed)
            } else {
                let vouchnum = data.Vouches
                await Schema.findOneAndDelete({ Guild: message.guild.id, User: user.id })
                data = new Schema({
                    Guild: message.guild.id,
                    User: user.id,
                    Vouches: vouchnum + 1
                }).save()
                const embed = new MessageEmbed()
                    .setTitle('Vouch Successful')
                    .setColor('ORANGE')
                    .addField("User: ", user.user.username)
                    .addField("Reason: ", reason)
                    .addField("Vouches: ", vouchnum + 1)
                    .setTimestamp()

                message.channel.send(embed)
            }
        })
    }
}