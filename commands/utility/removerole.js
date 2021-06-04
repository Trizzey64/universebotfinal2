const { Message } = require('discord.js')

module.exports = {
    name : 'removerole',
    description:"Mit diesem command kann jeder, der die Berechtigung Rollen verwalten hat, einem Mitglied eine Rolle entfernen",
    usage:"@User (Rolle)",
    run : async(client, message, args) => {
        //lets use parameters (optional)
        /**
         * @param {Message} message
         */
        //so firstly we will check whether the author of the message has permissions
        //this line means if the author doesn't have manage roles permission it will stop the process and send the following text
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('Du hast keine Berechtigung dafür')
        //next we define some variables
        const target = message.mentions.members.first() //member = mentions
        if(!target) return message.channel.send('Kein Mitglied ausgewählt') //when no member is pinged
        const role = message.mentions.roles.first() // roles = mentions
        if(!role) return message.channel.send('Keine Rolle ausgewählt') //when no role is specified or pinged
        //now the code!
        await target.roles.remove(role) // removeing the role to the user
        message.channel.send(`${target.user.username}'s Rolle wurde entfernt`) //this is optional and editable
    }
}