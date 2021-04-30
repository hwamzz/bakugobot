const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/bonusInvites')

module.exports = {
    name: 'addinvites',
    usage: '<@user> <amount>',
    description: 'Add invites to a user!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('You do not have permission to add invites!')
        const user = message.mentions.users.first()
        if (!user) return message.channel.send('Please include a member to add invites to!')
        const numToAdd = parseInt(args[1])
        if (!numToAdd || isNaN(numToAdd)) return message.channel.send('Amount of invites to add must be a number!')
        let inviteCounter = {};

        message.guild.fetchInvites().then((invites) => {
            invites.forEach((invite) => {
            inviteCounter[invite.inviter.id] =
                (inviteCounter[invite.inviter.id] || 0) + invite.uses;
            });
        })

        const c = inviteCounter[user.id] + numToAdd || 0 + numToAdd;

        Schema.findOne({ Guild: message.guild.id, User: user.id }, async(err, data) => {
            if (err) throw err;
            if (!data) {                
                data = new Schema({
                    Guild: message.guild.id,
                    User: user.id,
                    Bonus: +c,
                }).save()
                const embed1 = new MessageEmbed()
                    .setDescription(`${user.username} now has \`${data.Bonus}\` invites`)
                    .setColor('ORANGE')
            
                message.channel.send(embed1)
            } else {
                Schema.findOneAndUpdate({ Guild: message.guild.id, User: user.id }, { $set:{Bonus: +c} }, { returnNewDocument: true }, async(err, data) => {
                    if (err) throw err;
                    const embed2 = new MessageEmbed()
                        .setDescription(`${user.username} now has \`${data.Bonus}\` invites`)
                        .setColor('ORANGE')
            
                    message.channel.send(embed2)
                })
            }
        })
    }
}