const { Client, Message, MessageEmbed } = require('discord.js');
const client = require('../../index')

module.exports = {
    name: 'panel',
    description: 'Send the role reaction panel!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let reaction1 = '📝';
        let reaction2 = '👓';
        let role1 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'changelog')
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'sneakpeeks')

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle(`Reaction Role Panel`)
            .setDescription(`React with a ${reaction1} to gain the **Changelog** role!\nReact with a ${reaction2} to gain the **Sneakpeeks** role!`)
            .setTimestamp()
            .setFooter(`Sent by ${message.author.username}`)

        const msg = await message.channel.send(embed)
        await msg.react(reaction1)
        await msg.react(reaction2)
        message.delete()

        client.on('messageReactionAdd', (reaction, user) => {
            let member = message.guild.members.cache.get(user.id)
            if (member.bot) return;
            if (!msg.id) return;
            if (reaction.emoji.name == '📝') {
                if (member.roles.cache.has(role1)) {
                    member.send('You already have this role!')
                } else {
                    member.roles.add(role1)
                    member.send(`You have been given **${role1.name}** in **${message.guild}**!`)
                }
            } else if (reaction.emoji.name == '👓') {
                if (member.roles.cache.has(role2)) {
                    member.send('You already have this role!')                  
                } else {
                    member.roles.add(role2)
                    member.send(`You have been given **${role2.name}** in **${message.guild}**!`)
                }
            } else return;
        })

        client.on('messageReactionRemove', (reaction, user) => {
            let member = message.guild.members.cache.get(user.id)
            if (member.bot) return;
            if (!msg.id) return;
            if (reaction.emoji.name == '📝') {
                member.roles.remove(role1)
                member.send(`You have lost **${role1.name}** in **${message.guild}**!`)
            } else if (reaction.emoji.name == '👓') {
                member.roles.remove(role2)
                member.send(`You have lost **${role2.name}** in **${message.guild}**!`)
            } else return;
        })
    }
}