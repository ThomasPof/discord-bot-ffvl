const { mainRoleId, newMemberRoleId, structureId, licences } = require('../../config.json')

const fetch = require('node-fetch');

const { CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
  name: "licence",
  description: "Vérification du numéro de licence FFVL",
  deferred: true,
  ephemeral: true,
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

    const mainRole = guild.roles.cache.find(role => role.id == mainRoleId)
    const newMemberRole = guild.roles.cache.find(role => role.id == newMemberRoleId)
    const member = guild.members.cache.find(member => member.id == interaction.user.id)

    console.log('on check la licence : ', licences.includes(Licence));

    //si le membre a déjà sa licence valide pour l'année
    if(member.roles.cache.some(role => role.name == 'Licencié '+year)) {
      Response.setColor("GREEN")
      Response.setDescription(`
        🐘 Ta licence ${year} est déjà validée, tout est bon pour cette année.

        Bon vols !
        `
        )
      console.log(`${member.user.username } : licence déjà valide`);
      interaction.editReply({embeds: [Response]})
    } else {
      fetch(`https://data.ffvl.fr/php/verif_lic_adh.php?num=${Licence}&stru=${structureId}`)
        .then(response => response.json())
        .then((response) => {
          console.log('réponse FFVL', response);
          //si on trouve la licence dans la liste
          if(response == 1 || licences.includes(Licence)) {
            https://data.ffvl.fr/php/verif_lic2.php?num=1205453Z&stru=03359
            // On ajoute les rôles de cette année
            member.roles.add(mainRole)
            member.roles.add(yearlyRole)
            member.roles.remove(newMemberRole)
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
                console.log(`${member.user.username } : licence ${Licence} re-validée pour ${year}`);
            } else {
              // Si nouveau membre, message de bienvenue
              Response.setDescription(`
                🐘 Bienvenue aux Z\'éléph !

                Ta licence ${year} a été validée, tu as maintenant accès aux salons réservés aux membres du club.
                `
                )
              console.log(`${member.user.username } : nouvelle licence ${Licence} validée pour ${year}`);
            }
          } else {
            Response.setColor("RED")
            if(member.roles.cache.some(role => role.name == 'Licencié '+year - 1)) {
              Response.setDescription(
                `😱 On dirait que ta licence n'est pas dans la liste de ${year}.

                  Pas de panique, tu conserves tes accès Discord pour le moment.

                  Rapproche toi rapidement d'un des membres du comité pour régler ça et ne pas perdre tes accès aux salons Discord.
                `)
              console.log(`${member.user.username } : licence ${Licence} invalide pour ${year}`);
            } else {
              Response.setDescription(
                `😱 Cette licence n\'est pas connue des Z\'éléph!

                Mais pas de panique, rapproche toi d'un membre du comité pour que ton inscription soit prise en compte.

                En attendant, tu as quand même accès aux salons de base.
                `)
              console.log(`${member.user.username } : nouvelle licence ${Licence} non reconnue`);
            }
          }
          interaction.editReply({embeds: [Response]})
        })
    }
  }
}
