const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'tempmute',
    usage: '<@user> <duration> <reason>',
    description: 'Permanently mutes a user!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let reason = args.slice(2).join(" ")
        if (!reason) reason = 'Unspecified';
        if (!message.member.hasPermission(['MUTE_MEMBERS'])) return message.channel.send('No permission to use this command!')
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]
        if (!member) return message.channel.send('Member not found, please mention the member or put their ID!')
        if (!time) return message.channel.send('Please specify a duration to mute the user for!')

        const role = message.guild.roles.cache.find(r => r.name === 'muted')
        if (!role) {
            try {
                message.channel.send('Muted role not found, creating muted role!')

                let muterole = await message.guild.roles.create({
                    data : {
                        name: 'muted',
                        permissions: []
                    }
                })
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                })
                message.channel.send('Mute role successfully setup!')
            } catch (err) {
                console.log(err);
            }
        }
        let role2 = message.guild.roles.cache.find(r => r.name === 'muted')
        if (member.roles.cache.has(role2.id)) return message.channel.send('User is already muted!')
        await member.roles.add(role2)
        
        const embed = new MessageEmbed()
        .setColor('#FFF000')
        .setTitle('User muted')
        .setDescription(`${member.user.tag} successfully muted by ${message.author} for ${reason}!`)
        
        message.channel.send(embed)
        setTimeout(async() => {
            await member.roles.remove(role2)
            message.channel.send(`${member.displayName} is now unmuted!`)
        }, ms(time))
    }
}