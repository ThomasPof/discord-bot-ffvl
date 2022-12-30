const { Perms } = require("../Validation/Permissions");
const { Client } = require("discord.js")
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const { serverId } = require('../config.json')

/**
 * @param {Client} client
 */
module.exports = async (client) => {
  const Table = new Ascii("Command Loaded");

  const CommandsArray = [];

  (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
    const command = require(file);

    if(!command.name)
    return Table.addRow(file.split("/")[7], "FAILED", "Missing a name.")

    if(!command.description)
    return Table.addRow(file.split("/")[7], "FAILED", "Missing a description.")

    if(command.permission) {
      if(Perms.includes(command.permission))
      command.defaultPermission = false
      else
      return Table.addRow(command.name, "Failed", "Permission is invalid")
    }

    client.commands.set(command.name, command)
    CommandsArray.push(command)

    await Table.addRow(command.name, "SUCCESSFUL")

  });

  console.log(Table.toString())
}
