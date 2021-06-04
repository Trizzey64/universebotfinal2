const img = require('images-scraper')

const google = new img({
    puppeteer : {
        headless : true,
    }
})

module.exports = {
    name : 'image',
    description:"Mit diesem Befehl kann jeder nach Bildern im Internet suchen und diese werden dann in den entsprechenden Kanal reingeschickt",
    usage:"(Suchbegriff)",
    run : async(client, message, args) => {
        const query = args.join(" ")
        if(!query) return message.channel.send('Bitte gib eine Suchanfrage ein!')

        const results = await google.scrape(query, 1)
        message.channel.send(results[0].url);
    }
}
