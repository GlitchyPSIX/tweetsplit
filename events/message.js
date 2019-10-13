require('dotenv').config();
const ts = require('../modules/tweetsplit.js');
module.exports = (client, message) => {

    var botPrefix = process.env.PREFIX || "ts." 

    if (message.content.indexOf(botPrefix) !== 0 && client.getSettings(message.guild).daemonMode == true && message.guild) {
        ts(client, message);
    }

    // Ignore all bots
    if (message.author.bot) return;
  
    // Ignore messages not starting with the prefix
    if (message.content.indexOf(botPrefix) !== 0) return;
  
    // Our standard argument/command name definition.
    const args = message.content.slice(botPrefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  
    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    if (!(client.permlevel(message) >= cmd.conf.permLevel)) { console.log(`${client.permlevel(message)} tried to run command with permission lv ${cmd.conf.permlevel}`); return };
    
    // Run the command
    cmd.run(client, message, args);

  };