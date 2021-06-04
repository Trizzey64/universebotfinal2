const api = require('../../config.json');
const api_key = api.api_key;
const { MessageEmbed } = require('discord.js');
const axios = require('axios')

module.exports = {
    name: "weather",
    deschription: "Zeigt dir das Wetter in einer Statd an",
    usage: "(Stadt)",
    run: async (client, message, args) => {
        if(!args[0]) {
            return message.channel.send(`Bitte gib eine Stadt an`)
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=${api_key}`;

        let response, city;

        try {
            response = await axios.get(url);
            city = response.data
            console.log(city)
        } catch (e) {
            return message.channel.send(`Stadt konnte nicht gefunden werden`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Wetter in: ${city.name}`)
            .setThumbnail(`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`)
            .setDescription(city.weather[0].description)
            .addFields(
                {
                    name: "Aktuelle Temperatur: ",
                    value: `${city.main.temp} °C`,
                    inline: true
                },
                {
                    name: "Wetter: ",
                    value: city.weather[0].main
                },
                {
                    name: "Gefühlt: ",
                    value: `${city.main.feels_like} °C`,
                    inline: true
                },
                {
                    name: "Höchste: ",
                    value: `${city.main.temp_max} °C`,
                    inline: true
                },
                {
                    name: "Niedrigste: ",
                    value: `${city.main.temp_min} °C`,
                    inline: true
                },
                {
                    name: "Luftfeuchtigkeit: ",
                    value: `${city.main.humidity} %`,
                    inline: true
                
                }
            )

        await message.channel.send(embed)
    }
}