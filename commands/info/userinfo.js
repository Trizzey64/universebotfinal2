const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "user-info",
    description:"Zeigt dir mehr Informationen über einen User",
    run: async (client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let status;
        switch (user.presence.status) {
            case "online":
                status = "<:online:729181184193462285> online";
                break;
            case "dnd":
                status = "<:dnd:729181212530442311> dnd";
                break;
            case "idle":
                status = "<:idle:729181121933475931> idle";
                break;
            case "offline":
                status = "<:offline:729181162182017051> offline";
                break;
        }

        const embed = new MessageEmbed()
            .setTitle(`${user.user.username} stats`)
            .setColor(`#f3f3f3`)
            .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
            .addFields(
                {
                    name: "Name: ",
                    value: user.user.username,
                    inline: true
                },
                {
                    name: "#️⃣ Discriminator: ",
                    value: `#${user.user.discriminator}`,
                    inline: true
                },
                {
                    name: "🆔: ",
                    value: user.user.id,
                },
                {
                    name: "Aktueller Status: ",
                    value: status,
                    inline: true
                },
                {
                    name: "Activity: ",
                    value: user.presence.activities[0] ? user.presence.activities[0].name : `Dieser User spielt gerade kein Spiel!`,
                    inline: true
                },
                {
                    name: 'Avatar link: ',
                    value: `[Klick hier](${user.user.displayAvatarURL()})`
                },
                {
                    name: 'Erstellungsdatum: ',
                    value: user.user.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: 'Beitrittsdatum: ',
                    value: user.joinedAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: 'Rollen: ',
                    value: user.roles.cache.map(role => role.toString()).join(" ,"),
                    inline: true
                }
            )

        await message.channel.send(embed)
    }
}