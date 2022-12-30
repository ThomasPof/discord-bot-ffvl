const { CommandInteraction, MessageEmbed } = require("discord.js")
const { mainRoleId } = require('../../config.json')
const { TRANSLATION_LICENCE_CLEAN } = require('../../translation/messages.js')

module.exports = {
  name: "licences_clean_all",
  description: TRANSLATION_LICENCE_CLEAN.description(),
  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction, client) {
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return;
    const { guild } = interaction;
    const Response = new MessageEmbed()

    // On vérifie que le rôle pour l'année en cours existe
    const d = new Date();
    const year = d.getFullYear();

    const mainRole = guild.roles.cache.find(role => role.id == mainRoleId)

    Response.setColor("RED")
    Response.setDescription(TRANSLATION_LICENCE_CLEAN.successMessage())
    guild.members.cache.forEach((member) => {
      if(!member.roles.cache.some(role => role.name == 'Licencié '+year &&
         !member.roles.cache.some(role => role.name == 'Licencié '+(year - 1))) {
        // member.roles.remove(mainRole)
        console.log('on retire le rôle');
      }
    })

    interaction.reply({embeds: [Response], ephemeral: true})
  }
}
