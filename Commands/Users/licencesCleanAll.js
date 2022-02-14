const { CommandInteraction, MessageEmbed } = require("discord.js")
const { mainRoleId } = require('../../config.json')

module.exports = {
  name: "licences_clean_all",
  description: '⚠️ Suppression du rôle "Membre Zéléph" pour TOUS les membres n\'ayant pas renouvelé leur licence',
  permission: "ADMINISTRATOR",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction, client) {
    const { guild } = interaction;
    const Response = new MessageEmbed()

    // On vérifie que le rôle pour l'année en cours existe
    const d = new Date();
    const year = d.getFullYear();

    const mainRole = guild.roles.cache.find(role => role.id == mainRoleId)

    Response.setColor("RED")
    Response.setDescription(`
      Les membres n'ayant pas renouvelés leur licences vont voir leur rôle "Membre Z'éléph" retiré.
      `)
    guild.members.cache.forEach((member) => {
      if(!member.roles.cache.some(role => role.name == 'Licencié '+year)) {
        // member.roles.remove(mainRole)
        console.log('on retire le rôle');
      }
    })

    interaction.reply({embeds: [Response], ephemeral: true})
  }
}
