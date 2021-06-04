const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'emojify',
    description: "Wandelt deinen Text in emojis um",
    usage: "(text)",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!args.length) return message.reply('Bitte gib einen zu emoji übersetzenden Text an.')
        const specialCodes = {
            '0': ':zero:',
            '1': ':one:',
            '2': ':two:',
            '3': ':three:',
            '4': ':four:',
            '5': ':five:',
            '6': ':six:',
            '7': ':seven:',
            '8': ':eight:',
            '9': ':nine:',
            '#': ':hash:',
            '*': ':asterisk:',
            '?': ':grey_question:',
            '!': ':grey_exclamation:',
            ' ': '   '
          }
        const text = args.join(" ").toLowerCase().split('').map(letter => {
            if(/[a-z]/g.test(letter)) {
                return `:regional_indicator_${letter}:`
            } else if (specialCodes[letter]) {
                return `${specialCodes[letter]}`
            }
            return letter;
        }).join('');

        message.channel.send(text)
    }
}