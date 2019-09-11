exports.run = async (client, message, args, level) => {
    client.twitter.post("/oauth2/token", {grant_type: "client_credentials"}, (err, resp) => {
        if (!err) {
            console.log(resp);
        }
        else {
            console.log(err);
        }
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
      permLevel: "Bot Owner",
      ownerOnly: true
  };
  
  exports.help = {
    name: "oauth",
    category: "System",
    description: "Gets Oauth2 Bearer Token",
    usage: "oauth"
  };