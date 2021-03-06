const axios = require('axios');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "meme",
    description:"Mit diesem command kannst du dir ein random meme anschauen",
    run: async (client, message, args) => {
        const url = 'https://rapidapi.com/collection/meme';

        let data, response;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error has occured, try again!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Random Meme: `)
            .setDescription(data.caption)
            .setColor('#f3f3f3')
            .setImage(data.image)

        await message.channel.send(embed)
    }
}
