const { CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
  name: "licences_validate_all",
  description: 'Ajout du rôle de cette année pour tous les membres',
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

    if(!guild.roles.cache.find(role => role.name == 'Licencié '+ year)) {
      guild.roles.create({
        name: 'Licencié '+ year,
        color: 'BLUE',
        reason: 'Licenciés '+year,
      }).then(() => {
        ValidateRole()
      })
    } else {
      ValidateRole()
    }

    function ValidateRole() {
      const yearlyRole = guild.roles.cache.find(role => role.name == 'Licencié '+year)

      Response.setColor("GREEN")
      Response.setDescription(`
        Toutes les licences vont être validées pour cette année
        `)

      guild.members.cache.forEach((member) => {
        member.roles.add(yearlyRole)
      })
      interaction.reply({embeds: [Response], ephemeral: true})
    }

  }
}
