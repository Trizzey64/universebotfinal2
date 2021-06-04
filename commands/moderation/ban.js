module.exports = {
    name :  'ban',
    description: "Mit diesem command kann jeder mit Bann Rechten einen anderen User bannen",
    usage:" @User (Begründung)",
    run : async(client, message, args) => {
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('Ich habe keine Berechtigung dafür :(')
        const Member = message.mentions.members.first()
        if(!Member) return message.channel.send('Bitte gib ein Mitglied an, dass gebannt werden soll')
        await Member.ban({ reason : args.slice(1).join(" ")})
        message.channel.send(` ${Member.user.tag} wurde vom Server gebannt!`);
        
    }
        
}