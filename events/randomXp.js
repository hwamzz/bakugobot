const client = require('../index')
const Levels = require('discord-xp')

client.on("message", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  const chan = message.guild.channels.cache.find(ch => ch.name === 'level-up')

  const user = await Levels.fetch(message.author.id, message.guild.id)
  const data = user.level;
  const randomAmountOfXp = Math.floor(Math.random() * 29) + 1;
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);

  const level5 = message.guild.roles.cache.find(r => r.name === "Level 5")
  const level10 = message.guild.roles.cache.find(r => r.name === "Level 10")
  const level15 = message.guild.roles.cache.find(r => r.name === "Level 15")
  const level20 = message.guild.roles.cache.find(r => r.name === "Level 20")
  const level25 = message.guild.roles.cache.find(r => r.name === "Level 25")
  const level30 = message.guild.roles.cache.find(r => r.name === "Level 30")
  const level35 = message.guild.roles.cache.find(r => r.name === "Level 35")
  const level40 = message.guild.roles.cache.find(r => r.name === "Level 40")
  const level45 = message.guild.roles.cache.find(r => r.name === "Level 45")
  const level50 = message.guild.roles.cache.find(r => r.name === "Level 50")

  if (hasLeveledUp) {

    if (data == 5) {
      message.member.roles.add(level5)
    } else if (data == 10) {
      message.member.roles.add(level10)
    } else if (data == 15) {
      message.member.roles.add(level15)
    } else if (data == 20) {
      message.member.roles.add(level20)
    } else if (data == 25) {
      message.member.roles.add(level25)
    } else if (data == 30) {
      message.member.roles.add(level30)
    } else if (data == 35) {
      message.member.roles.add(level35)
    } else if (data == 40) {
      message.member.roles.add(level40)
    } else if (data == 45) {
      message.member.roles.add(level45)
    } else if (data == 50) {
      message.member.roles.add(level50)
    }
    chan.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
  }
});