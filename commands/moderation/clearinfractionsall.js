const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../../models/warns')

module.exports = {
    name: 'wipe-infractions',
    description: 'Clear all infractions in the guild!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('You do not have permission to use this command!')
        // db.findOne({ Guild: message.guild.id }, async(err, data) => {
        //     message.guild.members.fetch().then(r => {

        //     r.array().forEach(r => {
        //         let userid = r.id
        // })
        message.guild.members.fetch().then(async(r) => {
            r.array().forEach(async(r) => {
                let userid = r.id
                await db.findOneAndDelete({ Guild: message.guild.id, User: r.id })
            })
        }).then(() => {
            message.channel.send(`Successfully cleared all warnings in this guild!`)
        })
    }
}