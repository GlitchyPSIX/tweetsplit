require('dotenv').config();

module.exports = (client, message) => {

    tweetSplit(client, message);

    // Ignore all bots
    if (message.author.bot) return;
  
    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(process.env.PREFIX) !== 0) return;
  
    // Our standard argument/command name definition.
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);
  
    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    if (cmd.conf.ownerOnly && message.author.id != process.env.OWNERID) { console.log("Unauthorized user tried to run an owner-only command."); return};
  
    // Run the command
    cmd.run(client, message, args);
    
  };

async function tweetSplit(client, message) {

    let tweetID = message.content.match(/\/status\/(\d+)/);
    if (tweetID != null) {
        let params = {
            id: tweetID[1],
            include_entities: true,
            screen_name: "TS-GlitchyPSI",
            trim_user: true,
            tweet_mode: "extended"
        }
        client.twitter.get('statuses/show', params, async function(error, tweets, response) {
            if (!error) {
                let msgString = "";
                if (tweets.extended_entities.media != undefined) {
                    if (tweets.extended_entities.media.length > 1) {
                        for (let i = 1; i < tweets.extended_entities.media.length; i++){
                            msgString +=tweets.extended_entities.media[i].media_url_https + "\n";
                        }
                        /* tweets.extended_entities.media.forEach((ent) => {
                            msgString += ent.media_url_https + "\n";
                        }); */
                        await message.channel.send(msgString);
                    }
                    
                }
            }
          });
        //message.channel.send
    }
      
  }