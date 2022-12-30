const { CommandInteraction } = require("discord.js")

module.exports = {
  name: "ping",
  description: "Ping",
  /**
   * @param {CommandInteraction} interaction
   */
  execute(interaction) {
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return;
    interaction.reply({content: "PING BACK"})
  }
}
