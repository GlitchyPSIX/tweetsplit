exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars

    let settings = client.getSettings(message.guild);
    var channelID = message.guild.channels.get(args[0]) || message.mentions.channels.first();
    if (args.length == 0) {
        let channelList = "\n";
        settings.daemonIgnoreChannels.forEach(channel => {
            channelList += "\n" + message.guild.channels.get(channel);
        })
        if (channelList == "\n") {
            channelList = "\nNone!";
        }
        message.channel.send(`ℹ - List of ignored channels: **${channelList}**`);
    } else {
        if (args[0].toLowerCase() == "this") {
            channelID = message.channel;
        }
        if (channelID != undefined) {
            if (settings.daemonIgnoreChannels.find(x => { return x == channelID.id }) == undefined) {
                client.settings.push(message.guild.id, channelID.id, "daemonIgnoreChannels");
                message.channel.send(`ℹ - Now ignoring channel **${channelID}**.`);
            }
            else {
                client.settings.set(message.guild.id, settings.daemonIgnoreChannels.filter(x => {return x != channelID.id }), "daemonIgnoreChannels");
                    message.channel.send(`ℹ - Listening to **${channelID}** again.`);
            }
                
        }
        else {
            message.channel.send(`:x: - Bad channel. Use a channel mention or channel ID.`);
        }

    }


};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ignore", "i"],
    permLevel: 3
};

exports.help = {
    name: "ignorechannel",
    category: "Management",
    shortdesc: "Ignores / lifts Daemon ignore on a channel.",
    description: "Toggle if a channel is observed by Daemon.\nNeeds Owner or Administrator permission.\nNot specifying which channel will show the ignored channels.\nUsing \"this\" instead of a channel mention or ID will act on the channel the command was sent.",
    usage: "ignorechannel <channelID|this>"
};