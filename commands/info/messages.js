const { MessageEmbed } = require('discord.js')



module.exports ={
    name : 'Server',
    aliases : ['srv'],
    run : async(client, message) => {
        const embed = new MessageEmbed()
        .setTitle(`Tristans discord server`)
        .setDescription('Joine gerne dem Server')
        .setColor('#c203fc')
        .setThumbnail('https://imgur.com/eaXOHet')



        message.reply(embed)

            
    }
}