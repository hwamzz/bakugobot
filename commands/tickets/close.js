const { Message, Client, MessageAttachment, MessageEmbed } = require('discord.js')
const fs = require('fs')
const ticketSchema = require('../../models/ticketTranscript')

module.exports = {
    name: 'close',
    description: 'Close a ticket!',
    /**
     * @param {Client} client
     * @param {Message} message
     */
    run : async(client, message) => {
        const category = message.guild.channels.cache.find(c => c.type === 'category' && c.name.toLowerCase() === 'tickets')

        if (message.channel.parentID !== category.id) return message.channel.send('You can only use this command in a ticket!');

        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('No permission!');

        const transcriptChannel = message.guild.channels.cache.find(ch => ch.name == 'sk-transcripts') || message.guild.channels.cache.find(ch => ch.name == 'transcripts')
        const embed = new MessageEmbed()
            .setTitle('Ticket closed!')
            .setColor('BLUE')
            .setDescription(`Ticket has been closed by ${message.author.username}, you can find the transcript below!`)
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
}