const { Client, Message, MessageEmbed } = require('discord.js');
const Levels = require('discord-xp')

module.exports = {
    name: 'leaderboard',
    description: 'Displays the level leaderboard!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);
        if (rawLeaderboard.length < 1) return message.channel.send('No one has gained any xp yet!')

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true)
        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);

        const embed = new MessageEmbed()
            .setTitle('Leaderboard:')
            .setColor('#0000FF')
            .addField(
                "\u200b",
                `${lb.join("\n\n")}`
            )

        message.channel.send(embed);
    }
}