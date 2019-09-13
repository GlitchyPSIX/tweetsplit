exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
    message.channel.send("Your permission level is " + client.permlevel(message) + ".");
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
      permLevel: 5
  };
  
  exports.help = {
    name: "permcheck",
    category: "Misc",
    description: "Calculates your permission level.",
    usage: "permcheck"
  };
  