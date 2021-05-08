const client = require('../index')
const ticketTranscript = require('../models/ticketTranscript')

client.on('message', async(message) => {
    try {
        const category = message.guild.channels.cache.find(c => c.type === 'category' && c.name.toLowerCase() === 'tickets')

        if (message.channel.parentID !== category.id) return;
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
    } catch (err) {
        
    }
})