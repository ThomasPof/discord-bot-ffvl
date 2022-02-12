const { Licences } = require("../../Validation/Licences.js")

const { CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
  name: "licence",
  description: "Vérification du numéro de licence FFVL",
  options: [
    {
      name: "licence",
      description: "Renseignez votre numéro de licence FFVL pour rejoindre le discord des Z'éléph",
      type: "STRING",
      required: true,
    }
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction, client) {
    const { guild, options } = interaction;

    const Licence = options.getString('licence').toUpperCase();

    const Response = new MessageEmbed()

    // On vérifie que le rôle pour l'année en cours existe
    const d = new Date();
    const year = d.getFullYear();

    if(!guild.roles.cache.find(role => role.name == 'Licencié '+year)) {
      guild.roles.create({
        name: 'Licencié '+year,
        color: 'BLUE',
        reason: 'Licenciés '+year,
      })
    }

    const yearlyRole = guild.roles.cache.find(role => role.name == 'Licencié '+year)
    const pastYearlyRole = guild.roles.cache.find(role => role.name == 'Licencié '+(year - 1))

    const zelephRole = guild.roles.cache.find(role => role.id == '934836576712814613')
    const member = guild.members.cache.find(member => member.id == interaction.user.id)

    //si on trouve la licence dans la liste
    if(Licences.includes(Licence)) {
      // On ajoute les rôles de cette année
      member.roles.add(zelephRole)
      member.roles.add(yearlyRole)
      // on envoi le message
      Response.setColor("GREEN")
      // on supprime le rôle de l'an dernier
      if(member.roles.cache.some(role => role.name == 'Licencié '+(year - 1))) {
        member.roles.remove(pastYearlyRole)
        Response.setDescription(`
          🐘 Ta licence ${year} a été validée !

          Content de te retrouver aux Z\'éléph encore cette année !
          `
          )
      } else {
        // Si nouveau membre, message de bienvenue
        Response.setDescription(`
          🐘 Bienvenue aux Z\'éléph !

          Ta licence ${year} a été validée, tu as maintenant accès aux salons réservés aux membres du club.
          `
          )
      }
    } else {
      Response.setColor("RED")
      if(member.roles.cache.some(role => role.name == 'Licencié '+year - 1)) {
        Response.setDescription(
          `😱 On dirait que ta licence n'est pas dans la liste de ${year}.

            Pas de panique, tu conserves tes accès Discord pour le moment.

            Rapproche toi rapidement d'un des membres du comité pour régler ça et ne pas perdre tes accès aux salons Discord.
          `)
      } else {
        Response.setDescription(
          `😱 Cette licence n\'est pas connue des Z\'éléph!

          Mais pas de panique, rapproche toi d'un membre du comité pour que ton inscription soit prise en compte.

          En attendant, tu as quand même accès aux salons de base.
          `)
      }
    }
    interaction.reply({embeds: [Response], ephemeral: true})
  }
}
