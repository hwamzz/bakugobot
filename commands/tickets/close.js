const { Message, Client, MessageAttachment, MessageEmbed } = require('discord.js')
const fs = require('fs')
const roleSchema = require('../../models/ticketRole')
const ticketSchema = require('../../models/ticketTranscript')

module.exports = {
    name: 'close',
    description: 'Close a ticket!',
    /**
     * @param {Client} client
     * @param {Message} message
     */
    run : async(client, message) => {
        const category1 = message.guild.channels.cache.find(ch => ch.type === 'category' && ch.name.toLowerCase() === 'appeals')
        const category2 = message.guild.channels.cache.find(c => c.type === 'category' && c.name.toLowerCase() === 'tickets')

        if (message.channel.parentID !== category1.id && message.channel.parentID !== category2.id) return message.channel.send('You can only use this command in a ticket!');

        roleSchema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if (!data) return message.channel.send('No support role set, please tell an administrator to run .setrole!')
            if (data) {
                const r = data.Role;
                const role = message.guild.roles.cache.get(r)
                if (!message.member.roles.cache.has(role.id)) return message.channel.send('No permission!');

                const transcriptChannel = message.guild.channels.cache.find(ch => ch.name == 't-logs') || message.guild.channels.cache.find(ch => ch.name == 'transcripts')
                if (!transcriptChannel) {
                    message.guild.channels.create({
                        name: 'transcript',
                        permissionOverwrites: [
                            {
                                id: role.id,
                                allow : [
                                    'VIEW_CHANNEL',
                                    'SEND_MESSAGES',
                                    'ADD_REACTIONS',
                                    'ATTACH_FILES'
                                ]
                            }
                        ]
                    })
                }

                const embed = new MessageEmbed()
                    .setTitle('Ticket closed!')
                    .setColor('BLUE')
                    .setDescription(`Ticket has been closed by ${message.author.username}, you can find the transcript below!`)
                    .setFooter(`Ticket closed`)
                    .setTimestamp()

                message.channel.send('Deleting ticket in 5 seconds.....')
                setTimeout(() => {
                    message.channel.delete().then(async(ch) => {
                        ticketSchema.findOne({ Channel : ch.id }, async(err, data) => {
                            if(err) throw err;
                            if(data) {
                                fs.writeFileSync(`../${ch.id}.txt`, data.Content.join("\n\n"))
                                transcriptChannel.send(embed)
                                await transcriptChannel.send(new MessageAttachment(fs.createReadStream(`../${ch.id}.txt`)));
                                ticketSchema.findOneAndDelete({ Channel : ch.id })
                            }
                        })
                    })
                }, 5000)
            }
        })
    }
}