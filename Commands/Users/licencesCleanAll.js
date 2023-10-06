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
    let currentYear = d.getFullYear();
    if(d.getMonth() >= 9) { // 9 = octobre
      currentYear = currentYear + 1;
    }

    const mainRole = guild.roles.cache.find(role => role.id == mainRoleId)

    Response.setColor("RED")
    Response.setDescription(TRANSLATION_LICENCE_CLEAN.successMessage())
    let i = 0;
    guild.members.cache.forEach((member) => {
      if(!member.roles.cache.some(role => role.name == 'Licencié '+currentYear) &&
         !member.roles.cache.some(role => role.name == 'Licencié '+(currentYear - 1)) &&
         member.roles.cache.some(role => role.id == mainRoleId)
        ) {
        i++
        // member.roles.remove(mainRole)
      }
    })
    console.log(currentYear - 1)
    console.log('On retire le rôle à',i,'membres.');

    interaction.reply({embeds: [Response], ephemeral: true})
  }
}
