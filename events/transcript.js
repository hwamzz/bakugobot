const Schema = require('../models/ticketTranscript')
const client = require('../index')

client.on('message', async(message) => {
    if(message.channel.parentID !== '821123967779471390') return;
    Schema.findOne({ Channel : message.channel.id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.Content.push(`${message.author.tag} : ${message.content}`) 
        } else {
            data = new Schema({ Channel : message.channel.id, Content: `${message.author.tag} : ${message.content}`})
        }
        data.save()
            .catch(err =>  console.log(err))
    })
})