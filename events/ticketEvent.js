const client = require('../index')
const ticketTranscript = require('../models/ticketTranscript')

client.on('message', async(message) => {
    const category1 = message.guild.channels.cache.find(ch => ch.type === 'category' && ch.name.toLowerCase() === 'appeals')
    const category2 = message.guild.channels.cache.find(c => c.type === 'category' && c.name.toLowerCase() === 'tickets')

    if (message.channel.parentID !== category1.id && message.channel.parentID !== category2.id) return;
    ticketTranscript.findOne({ Channel : message.channel.id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.Content.push(`${message.author.tag} : ${message.content}`) 
        } else {
            data = new ticketTranscript({ Channel : message.channel.id, Content: `${message.author.tag} : ${message.content}`})
        }
        data.save()
            .catch(err =>  console.log(err))
    })
})