const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "server-info",
    description:"Zeigt dir mehr Informationen über den Discord Server",
    run: async (client, message, args) => {
        let region;
        switch (message.guild.region) {
            case "europe":
                region = '🇪🇺 Europe';
                break;
            case "us-east":
                region = '🇺🇸 us-east'
                break;
            case "us-west":
                region = '🇺🇸 us-west';
                break;
            case "us-south":
                region = '🇺🇸 us-south'
                break;
            case "us-central":
                region = '🇺🇸 us-central'
                break;
        }

        const embed = new MessageEmbed()
            .setThumbnail(message.guild.iconURL({dynamic : true}))
            .setColor('#f3f3f3')
            .setTitle(`${message.guild.name} server stats`)
            .addFields(
                {
                    name: "Owner: ",
                    value: message.guild.owner.user.tag,
                    inline: true
                },
                {
                    name: "Mitglieder: ",
                    value: `Hier sind ${message.guild.memberCount} Mitglieder!`,
                    inline: true
                },
                {
                    name: "Mitglieder Online: ",
                    value: `Hier sind ${message.guild.members.cache.filter(m => m.user.presence.status == "online").size} Mitglieder online!`,
                    inline: true
                },
                {
                    
                    name: "Erstelldatum: ",
                    value: message.guild.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: "Rollenanzahl: ",
                    value: `Hier gibt es ${message.guild.roles.cache.size} Rollen auf diesem Server.`,
                    inline: true,
                },
                {
                    name: `🗺 Region: `,
                    value: region,
                    inline: true
                },
                {
                    name: `Verifiziert: `,
                    value: message.guild.verified ? 'Dieser Server ist Verifiziert' : `Dieser Server ist nicht Verifiziert`,
                    inline: true
                },
                {
                    name: 'Booster: ',
                    value: message.guild.premiumSubscriptionCount >= 1 ? `Hier gibt es ${message.guild.premiumSubscriptionCount} Booster` : `Hier gibt es noch keine Booster`,
                    inline: true
                },
                {
                    name: "Emojis: ",
                    value: message.guild.emojis.cache.size >= 1 ? `Hier gibt es${message.guild.emojis.cache.size} emojis!` : 'Hier gibt es noch keine Emojis' ,
                    inline: true
                }
            )
        await message.channel.send(embed)
    }
}