module.exports = (client, message) => {

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