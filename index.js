const { Client, Intents } = require('discord.js')
const { Token } = require('./config.json')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

require("./Handlers/Event")(client);

client.login(Token)
