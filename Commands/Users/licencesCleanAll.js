const { CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
  name: "licences_clean_all",
  description: 'Suppression du rôle "Membre Zéléph" pour tous les membres n\'ayant pas renouvelé leur licence',
  permission: "ADMINISTRATOR",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction, client) {
    const { guild } = interaction;
    const Response = new MessageEmbed()
    Response.setColor("RED")
    Response.setDescription(`
      Toutes les licences ont été validées pour cette année
      `)
  }
}
