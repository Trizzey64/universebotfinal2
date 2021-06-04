const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'slowmode',
    description:"Aktiviert den Slowmode für den jeweiligen Kanal",
    usage:"(zeit)",
    run: async (client, message, args) => {

        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Du hast keine **MANAGE_CHANNELS** Berechtigung!').then(m => m.delete({ timeout: 5000 }));

        if (!args[0]) return message.channel.send('Du hast keine Zeit angegeben!').then(m => m.delete({ timeout: 5000}));

        const currentCooldown = message.channel.rateLimitPerUser;

        const reason = args[1] ? args.slice(1).join(' ') : 'kein Grund';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === 'Aus') {

            if (currentCooldown === 0) return message.channel.send('Kanal cooldown ist aktuell aus').then(m => m.delete({ timeout: 5000 }));

            embed.setTitle('Slowmode deaktiviert')
                .setColor('#00ff00')
            return message.channel.setRateLimitPerUser(0, reason)

        }

        const time = ms(args[0]) / 1000;

        if (isNaN(time)) return message.channel.send('Keine bestimmte Zeit, bitte versuche es erneut!').then(m => m.delete({ timeout: 5000 }));

        if (time >= 21600) return message.channel.send('Diese slowmode Grenze ist zu hoch, Bitte gib etwas unter 6 stunden an.').then(m => m.delete({ timeout: 5000 }));

        if (currentCooldown === time) return message.channel.send(`Slowmode ist bereits so eingestellt ${args[0]}`);

        embed.setTitle('Slowmode aktiviert')
            .addField('Slowmode: ', args[0])
            .addField('Grund: ', reason)
            .setColor('#ff0000');

        message.channel.setRateLimitPerUser(time, reason).then(m => m.send(embed));

    }
}