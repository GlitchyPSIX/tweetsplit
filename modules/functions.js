module.exports = (client) => {
    client.permlevel = message => {

        /*
        Lv 0: Cannot use
        Lv 1: User
        Lv 2: Mod
        Lv 3: Admin
        Lv 4: Owner
        Lv 5: Bot owner
        */

        let permlvl = 1;

        if (message.guild) {
            let settings = client.getSettings(message.guild);
            let modRoles = settings.modRoles != undefined ? settings.modRoles : client.settings.get("default").modRoles;
            let adminRoles = settings.adminRoles != undefined ? settings.adminRoles : client.settings.get("default").adminRoles;
            let timeout = settings.timeoutRole != undefined ? settings.timeoutRole : client.settings.get("default").timeoutRole;
            //Test for Mod
            if (message.member.roles.some(r => {
                    return modRoles.find(a => {
                        return a = r.id
                    })
                })) {
                permlvl = 2;
            }
            //Test for Admin
            if (message.member.roles.some(r => {
                    return adminRoles.find(a => {
                        return a = r.id
                    })
                }) || message.member.permissions.has("ADMINISTRATOR")) {
                permlvl = 3;
            }
            //Test for Timeout role
            if (message.member.roles.find(r => { return r == timeout })) {
                permlvl = 0;
            }
            //Test for Owner
            if (message.author.id == message.guild.ownerID) {
                permlvl = 4;
            }
            //Test for Bot Owner
            if (message.author.id == process.env.OWNERID) {
                permlvl = 5;
            }
        }

        return permlvl;
    };

    /*
    GUILD SETTINGS FUNCTION

    This function merges the default settings (from config.defaultSettings) with any
    guild override you might have for particular guild. If no overrides are present,
    the default settings are used.

    */

    // THIS IS HERE BECAUSE SOME PEOPLE DELETE ALL THE GUILD SETTINGS
    // And then they're stuck because the default settings are also gone.
    // So if you do that, you're resetting your defaults. Congrats.
    const defaultSettings = {
        "modRoles": [],
        "adminRoles": [],
        "timeoutRole": "",
        "daemonMode": true
    };

    // getSettings merges the client defaults with the guild settings. guild settings in
    // enmap should only have *unique* overrides that are different from defaults.
    client.getSettings = (guild) => {
        client.settings.ensure("default", defaultSettings);
        if (!guild) return client.settings.get("default");
        const guildConf = client.settings.get(guild.id) || {};
        // This "..." thing is the "Spread Operator". It's awesome!
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        return ({
            ...client.settings.get("default"),
            ...guildConf
        });
    };

    /*
    SINGLE-LINE AWAITMESSAGE

    A simple way to grab a single reply, from the user that initiated
    the command. Useful to get "precisions" on certain things...

    USAGE

    const response = await client.awaitReply(msg, "Favourite Color?");
    msg.reply(`Oh, I really love ${response} too!`);

    */
    client.awaitReply = async (msg, question, limit = 60000) => {
        const filter = m => m.author.id === msg.author.id;
        await msg.channel.send(question);
        try {
            const collected = await msg.channel.awaitMessages(filter, {
                max: 1,
                time: limit,
                errors: ["time"]
            });
            return collected.first().content;
        } catch (e) {
            return false;
        }
    };


    /*
    MESSAGE CLEAN FUNCTION

    "Clean" removes @everyone pings, as well as tokens, and makes code blocks
    escaped so they're shown more easily. As a bonus it resolves promises
    and stringifies objects!
    This is mostly only used by the Eval and Exec commands.
    */
    client.clean = async (client, text) => {
        if (text && text.constructor.name == "Promise")
            text = await text;
        if (typeof evaled !== "string")
            text = require("util").inspect(text, {
                depth: 1
            });

        text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

        return text;
    };

    client.loadCommand = (commandName) => {
        try {
            client.logger.log(`Loading Command: ${commandName}`);
            const props = require(`../commands/${commandName}`);
            if (props.init) {
                props.init(client);
            }
            client.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                client.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
        }
    };

    client.unloadCommand = async (commandName) => {
        let command;
        if (client.commands.has(commandName)) {
            command = client.commands.get(commandName);
        } else if (client.aliases.has(commandName)) {
            command = client.commands.get(client.aliases.get(commandName));
        }
        if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

        if (command.shutdown) {
            await command.shutdown(client);
        }
        const mod = require.cache[require.resolve(`../commands/${command.help.name}`)];
        delete require.cache[require.resolve(`../commands/${command.help.name}.js`)];
        for (let i = 0; i < mod.parent.children.length; i++) {
            if (mod.parent.children[i] === mod) {
                mod.parent.children.splice(i, 1);
                break;
            }
        }
        return false;
    };

    /* MISCELANEOUS NON-CRITICAL FUNCTIONS */

    // EXTENDING NATIVE TYPES IS BAD PRACTICE. Why? Because if JavaScript adds this
    // later, this conflicts with native code. Also, if some other lib you use does
    // this, a conflict also occurs. KNOWING THIS however, the following 2 methods
    // are, we feel, very useful in code. 

    // <String>.toPropercase() returns a proper-cased string such as: 
    // "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
    Object.defineProperty(String.prototype, "toProperCase", {
        value: function () {
            return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        }
    });

    // <Array>.random() returns a single random element from an array
    // [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5.
    Object.defineProperty(Array.prototype, "random", {
        value: function () {
            return this[Math.floor(Math.random() * this.length)];
        }
    });

    // `await client.wait(1000);` to "pause" for 1 second.
    client.wait = require("util").promisify(setTimeout);

    // These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
    process.on("uncaughtException", (err) => {
        const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
        client.logger.error(`Uncaught Exception: ${errorMsg}`);
        console.error(err);
        // Always best practice to let the code crash on uncaught exceptions. 
        // Because you should be catching them anyway.
        process.exit(1);
    });

    process.on("unhandledRejection", err => {
        client.logger.error(`Unhandled rejection: ${err}`);
        console.error(err);
    });
};