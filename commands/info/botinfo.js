const { MessageEmbed } = require('discord.js')
const os = require('os')
module.exports = {
    name: "bot-info",
    description: "Zeigt dir informationen über den Bot an",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('Bot Stats')
            .setColor('#000000')
            .addFields(
                {
                    name: '🌐 Server',
                    value: `wird in ${client.guilds.cache.size} Servern benutzt.`,
                    inline: true
                },
                {
                    name: '📺 Kanäle',
                    value: `wird in ${client.channels.cache.size} Kanälen benutzt.`,
                    inline: true
                },
                {
                    name: '👥 User Nutzung',
                    value: ` ${client.users.cache.size} User haben ihn schon benutzt`,
                    inline: true
                },
                {
                    name: '⏳ Ping',
                    value: `${Math.round(client.ws.ping)}ms`,
                    inline: true
                },
                {
                    name: 'Join Datum',
                    value: client.user.createdAt,
                    inline: true
               
                }
            )
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())

        await message.channel.send(embed)
    }
}