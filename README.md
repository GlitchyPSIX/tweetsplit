# //network/Tweetsplit

<img align="right" width="256px" height="256px" src="images/TS.png">

A simple Discord bot that automatically (configurable) posts the pictures from a Twitter post, if it has more than one image.

## Why?

Discord as of today currently uses a single image embed to display Tweets. This only shows the first image and there's no way to know if it has more than one image unless the poster specifies so, and even then it may be a hassle to have to enter Twitter to see all images.
(2020 update: Discord now does this but only on Desktop. It is possible that Mobile will get so too, but it's currently unknown. The bot is now down because of this.)

## Invite

~~[Here, bud]

I'm keeping tabs on the Twitter API usage. If the bots suddenly goes down, don't hesitate to contact me via any way.~~

Invite taken off because of the 2020 update above

## Usage

* **ts.help**
Shows all commands and their aliases.
The kinds of commands shown will depend on who you are, permissions wise.

* **ts.plit [tweet URL]**
Splits a Tweet in its pictures given its URL.

* **ts.ar <on/off>**
Turns *Daemon Mode* (Automatic split mode) on or off. (Requires **Owner** or **Administrator permission**)
 * If Daemon is off, users will have to split Tweets manually by using `ts.plit`.

* **ts.ignorechannel <channel/this>**
Whether the provided channel will be observed by Daemon or not. Using it without any arguments will show the list of ignored channels. (using `this` instead of a channel mention or ID refers to the channel the command was called in). (Requires **Owner** or **Administrator permission**)
 * If Daemon is off, this is practically useless.

## Selfhosting

### Requirements
   * nodejs v10 *exclusively*
   * A [Twitter API Bearer Token](https://developer.twitter.com/en/docs/basics/authentication/guides/bearer-tokens)
      * You will need to get a Twitter Application first.
   * [Enmap](http://enmap.evie.dev/) and its dependencies
   * The rest of the packages in *[package.json](package.json)*

   * //network/Tweetsplit uses environment variables to set information in a .env file (dotenv npm package). Create a file called``.env`` in your project root. Your environment variables are:

     * ``PREFIX`` - Custom prefix for the bot (If not present, ``ts.`` is the default prefix)

     * ``OWNERID`` - Your Discord user ID. This will allow you to use commands such as ``eval``.

     * ``TOKEN`` - Discord Application token. (Keep it secret!)

     * ``PORT`` - Port for your Express webserver. (Can be omitted if running from Glitch)

     * ``TWITTER_KEY`` - Your Twitter Application Consumer Key

     * ``TWITTER_SECRET`` - Your Twitter Application Secret Key

     * ``TWITTER_BEARER`` - Your Twitter Application [Bearer Token](https://developer.twitter.com/en/docs/basics/authentication/guides/bearer-tokens)

## Credits
Phoenix#0408 [Nintendo Hub] for telling me about Enmap and showing me [Battlebot](https://github.com/Phoenix1128/BattleBot)

Evie & co. for [AnIdiotsGuide](http://anidiots.guide), which helped me build the new bot core for my creations.