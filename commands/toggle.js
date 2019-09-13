exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars

    let settings = client.getSettings(message.guild);
    let onoff = settings.daemonMode == true ? "ON" : "OFF"
    if (args.length == 0) {
        message.channel.send(`ℹ - Daemon mode for this server is **${onoff}**`);
    } else {
        switch (args[0].toLowerCase()) {
            case "on":
                client.settings.set(message.guild.id, true, "daemonMode");
                message.channel.send(`ℹ - Daemon mode is **ON**.`);
                break;
            case "off":
                client.settings.set(message.guild.id, false, "daemonMode");
                message.channel.send(`ℹ - Daemon mode is **OFF**.`);
                break;
            default:
                message.channel.send(":x: - Invalid response. Only ON/OFF allowed.");
                break;
        }

    }


};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ar", "auto"],
    permLevel: 3
};

exports.help = {
    name: "daemon",
    category: "Management",
    shortdesc: "Changes the Daemon mode for this server.",
    description: "Toggle the Daemon (Automatic tweet splitting) status for this server\nNeeds Owner or Administrator permission.\nNot specifying whether to turn it on or off will show the daemon status.",
    usage: "daemon <on|off>"
};