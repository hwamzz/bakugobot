const client = require('../index')
const Levels = require('discord-xp')

client.on("message", async (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;
    const chan = message.guild.channels.cache.find(ch => ch.name === 'level-up')
    
    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      chan.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
    }
  });