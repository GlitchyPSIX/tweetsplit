const Discord = require("discord.js");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
    const embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setColor('#1da1f2')
        .setTimestamp()
        .setFooter(`//network/Tweetsplit - by GlitchyPSI`);

    embed.setTitle('ℹ About')
        .setThumbnail(client.user.displayAvatarURL)
        .addField('Version', client.version, true)
        .addField('Credits', "Phoenix#0408 [Nintendo Hub] for telling me about Enmap and showing me [Battlebot](https://github.com/Phoenix1128/BattleBot)\nEvie & co. for the guides [@github/AnIdiotsGuide](http://anidiots.guide), which helped me build the new bot core for my creations.", true)
    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "about",
    category: "Information",
    description: "Shows information about the bot, and a few credits.",
    usage: "about"
};