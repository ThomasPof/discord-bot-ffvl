const { Client, Collection } = require('discord.js')
const { Token } = require('./config.json')
const client = new Client({ intents: 32767 })

client.commands = new Collection()

require("./Handlers/Event")(client);
require("./Handlers/Commands")(client);

client.login(Token)
