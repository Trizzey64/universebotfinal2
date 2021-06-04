const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'ping',
    category : 'info',
    description : 'Zeigt die Latenz und den API ping an',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        const msg = await message.channel.send(`🏓 Pinging...`)
        const embed = new MessageEmbed()
            .setTitle('Pong!')
            .setDescription(`Der WebSocket ping ist ${client.ws.ping}MS\nDer Nachrichten bearbeitungs ping ist ${Math.floor(msg.createdAt - message.createdAt)}MS!`)
            await message.channel.send(embed)
            msg.delete()

    }
}
