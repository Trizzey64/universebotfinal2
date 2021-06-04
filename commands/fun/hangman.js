const { hangman } = require('reconlx')

module.exports = {
    name : 'hangman',
    aliases : ['hang'],
    description: "Mit diesem Befehl kannst du Galgenmänchen spielen",
    usage: "[Kanal] (Wort zum erraten)",
    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Du brauchst die Berechtigung Nachrichten zu verwalten')
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.channel.send('Bitte gib einen Kanal an')
        const word = args.slice(1).join(" ")
        if(!word) return  message.channel.send('Bitte gib ein wort an, dass erraten werden soll')

        const hang = new hangman({
            message: message,
            word: word,
            client: client,
            channelID: channel.id,
        })

        hang.start();
    }
}
