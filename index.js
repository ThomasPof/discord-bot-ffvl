const { Client, Collection } = require('discord.js')
const { Token } = require('./config.json')
const client = new Client({
  intents: 32767,
  partials: ['CHANNEL']
})
// const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] })

client.commands = new Collection()

require("./Handlers/Event")(client);
require("./Handlers/Commands")(client);

client.login(Token)
