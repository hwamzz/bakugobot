const client = require('../index')
const muteSchema = require('../models/mute')

client.on('guildMemberAdd', async(member) => {
    const data = await muteSchema.findOne({ Guild: member.guild.id })
    if (!data) return;
    const user = data.Users.findIndex((prop) => prop === member.id);
    if (user === -1) return;
    const role = member.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
    member.roles.add(role.id)
})