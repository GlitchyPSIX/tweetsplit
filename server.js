const Discord = require("discord.js");
const Twitter = require('twitter');
require('dotenv').config()
const client = new Discord.Client();
const {
    promisify
} = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");


client.logger = require("./modules/Logger");

require("./modules/functions.js")(client);

client.commands = new Enmap();
client.aliases = new Enmap();

//Twitter credentials.
//You need a Bearer Token to use this.
//(Higher ratelimits! ...Albeit the ones used for tweet fetching are both the same.)
client.twitter = new Twitter({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITER_SECRET,
    bearer_token: process.env.TWITTER_BEARER
})

client.version = "Beta 2.1 [Codename Altair v0.2.1a]"

//Per-server settings based in enmap
client.settings = new Enmap({name: "settings"});

const initialize = async () => {
    // Load **commands** into memory.
    const cmdFiles = await readdir("./commands/");
    client.logger.log(`Loading ${cmdFiles.length} commands.`);
    cmdFiles.forEach(f => {
      if (!f.endsWith(".js")) return;
      const response = client.loadCommand(f);
      if (response) console.log(response);
    });

    // Load events into memory.
    const evtFiles = await readdir("./events/");
    client.logger.log(`Loading ${evtFiles.length} events.`);
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        client.logger.log(`Loading Event: ${eventName}`);
        const event = require(`./events/${file}`);
        client.on(eventName, event.bind(null, client));
    });

    //Login client
    client.login(process.env.TOKEN);

    //Express server: will be used for external API and for use with Uptime Robot (Glitch shutdown workaround)
    var express = require('express');
    var app = express();
    
    app.use(express.static('public'));
    app.get("/", function (request, response) {
        response.sendFile(__dirname + '/views/index.html');
    });
    
    app.get("/owner", function (request, response) {
        response.send("OWNERID :" + process.env.OWNERID);
    
    });
    
    var listener = app.listen(process.env.PORT, function () {
        console.log('Your app is listening on port ' + listener.address().port);
    });

}
//init
initialize();