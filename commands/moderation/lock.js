const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "lock",
    category: "moderation",
    description:"Lockt alle Kanäle auf dem Server",
    usage:"(An/Aus)",
    run: async (client, message, args) => {
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        if (args[0] === 'An') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).then(() => {
                    channel.setName(channel.name += `🔒`)
                })
            })
            return message.channel.send('alle Kanäle gelocked');
        } else if (args[0] === 'Aus') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                }).then(() => {
                        channel.setName(channel.name.replace('🔒', ''))
                    }
                )
            })
            return message.channel.send('Alle Kanäle unlocken')
        }
    }
}