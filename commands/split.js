const ts = require('../modules/tweetsplit.js');

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
    if (args.length == 0) {
        message.channel.send(":x: - No Tweet given.");
        return;
    }
    ts(client, message);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["plit", "cut"],
    permLevel: 0
};

exports.help = {
    name: "split",
    category: "Misc",
    shortdesc: "Splits the given tweet.",
    description: "Performs a manual split of the provided Tweet. First image not shown.",
    usage: "split [tweet link]"
};