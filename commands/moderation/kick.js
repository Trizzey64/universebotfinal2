module.exports = {
    name :  'kick',
    description: "Mit diesem command kann jeder mit Kick Rechten einen anderen User vom Server kicken",
    usage:"@User (Begründung)",
    run : async(client, message, args) => {
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('Ich habe keine Berechtigung dafür :(')
        const Member = message.mentions.members.first()
        if(!Member) return message.channel.send('Bitte gib ein Mitglied an, dass kekickt werden soll')
        await Member.kick({ reason : args.slice(1).join(" ")})
        message.channel.send(` ${Member.user.tag} wurde vom Server gekickt!`);
        
    }
        
}