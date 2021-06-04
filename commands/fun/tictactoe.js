const { tictactoe } = require('reconlx')

module.exports = {
    name : 'tictactoe',
    aliases : ['ttt'],
    description: "Mit diesem Befehl kannst du TicTacToe spielen",
    usage:"@User",
    run : async(client, message, args) => {
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Bitte gib  ein Mitglied an')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}