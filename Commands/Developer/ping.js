const { CommandInteraction, MessageEmbed } = require("discord.js")


module.exports = {
  name: "ping",
  description: "Ping",
  deferred: true,
  ephemeral: true,
  /**
   * @param {CommandInteraction} interaction
   */
  execute(interaction, client) {
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return;
    const Response = new MessageEmbed()
    Response.setColor("RED")
    Response.setDescription("PING BACK")
    interaction.editReply({embeds: [Response]})
  }
}
