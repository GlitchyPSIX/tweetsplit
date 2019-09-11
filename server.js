const Discord = require("discord.js");
const Twitter = require('twitter');
require('dotenv').config()
const client = new Discord.Client();
const {
    promisify
} = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");

// Require our logger
client.logger = require("./modules/Logger");

// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require("./modules/functions.js")(client);

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap();
client.aliases = new Enmap();

//Twitter credentials.
client.twitter = new Twitter({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITER_SECRET,
    bearer_token: process.env.TWITTER_BEARER
})

// Now we integrate the use of Evie's awesome EnMap module, which
// essentially saves a collection to disk. This is great for per-server configs,
// and makes things extremely easy for this purpose.
client.settings = new Enmap({name: "settings"});

const initialize = async () => {
    // Load **commands** into memory. Brought from GuideBot
    const cmdFiles = await readdir("./commands/");
    client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
    cmdFiles.forEach(f => {
      if (!f.endsWith(".js")) return;
      const response = client.loadCommand(f);
      if (response) console.log(response);
    });

    // Load events. Brought from GuideBot
    const evtFiles = await readdir("./events/");
    client.logger.log(`Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        client.logger.log(`Loading Event: ${eventName}`);
        const event = require(`./events/${file}`);
        // Bind the client to any event, before the existing arguments
        // provided by the discord.js event. 
        client.on(eventName, event.bind(null, client));
    });

    client.login(process.env.TOKEN);
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

initialize();