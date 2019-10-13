exports.run = (client, message, args) => {
    var botPrefix = process.env.PREFIX || "ts." 
    // If no specific command is called, show all filtered commands.
    if (!args[0]) {
      // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
      const myCommands = message.guild ? client.commands.filter(cmd => cmd.conf.permLevel <= client.permlevel(message)) : client.commands.filter(cmd => cmd.conf.permLevel <= client.permlevel(message));
  
      // Here we have to get the command names only, and we use that array to get the longest name.
      // This make the help commands "aligned" in the output.
      const commandNames = myCommands.keyArray();
      const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
  
      let currentCategory = "";
      let output = `= Command List =\n\n[Use ${botPrefix}help <commandname> for details]\n`;
      const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
      sorted.forEach( c => {
        const cat = c.help.category.toProperCase();
        if (currentCategory !== cat) {
          output += `\u200b\n== ${cat} ==\n`;
          currentCategory = cat;
          }
          if (c.conf.permLevel < 5) {
            output += `${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.shortdesc || c.help.description}\n`;
          }
      });
      message.channel.send(output, {code: "asciidoc", split: { char: "\u200b" }});
    } else {
      // Show individual command's help.
        let command = args[0];
        if (client.commands.has(command)) {
        command = client.commands.get(command);
        if (client.permlevel(message) < command.conf.permLevel) return;
        message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${botPrefix}${command.help.usage}\naliases:: ${command.conf.aliases.join(", ")}\n= ${command.help.name} =`, {code:"asciidoc"});
      }
    }
  };
  

exports.conf = {
    enabled: true,
    aliases: ['h', 'commands'],
    permLevel: 0,
};

exports.help = {
    name: 'help',
    category: 'info',
    description: 'Displays all commands',
    usage: 'help [command]',
};