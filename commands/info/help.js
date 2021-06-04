const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "help",
  aliases : ['h'],
  description: "Zeigt dir alle verfügbaren Bot commands",
  run: async (client, message, args) => {


    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "Kein command Name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In Arbeit" : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
      .setTitle("📬 Du Brauchst Hilfe? Hier sind alle meine verfügbaren commands:")
        .addFields(categories)
        .setDescription(
          `Benutze \`${prefix}help\`gefolgt von einem command-Name, um mehr Informationen über diesen command zu sehen. Zum Beispiel: \`${prefix}help ban\`.`
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Ungültiger Befehl! Nutze \`${prefix}help\` für meine ganzen Befehle!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "Kein Name für diesen command."
        )
        .addField(
          "Aliase:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "Kein Alias."
        )
        .addField(
          "Verwendung:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "Beschreibung:",
          command.description
            ? command.description
            : "Keine Beschreibung für diesen command."
        )
        .setFooter(
          `Angefordet von ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  },
};
