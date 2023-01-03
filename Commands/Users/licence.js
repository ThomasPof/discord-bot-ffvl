const { mainRoleId, newMemberRoleId, structureId, licences } = require('../../config.json')
const { TRANSLATION_LICENCE } = require('../../translation/messages.js')

const fetch = require('node-fetch');

const { CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
  name: "licence",
  description: TRANSLATION_LICENCE.description(),
  deferred: true,
  ephemeral: true,
  options: [
    {
      name: "licence",
      description: TRANSLATION_LICENCE.commandDescription(),
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
    for(const [year] of Object.entries(licences)) {
      if(!guild.roles.cache.find(role => role.name == 'Licencié '+year)) {
        guild.roles.create({
          name: 'Licencié '+year,
          color: 'BLUE',
          reason: 'Licenciés '+year,
        })
      }
    }


    // const pastYearlyRole = guild.roles.cache.find(role => role.name == 'Licencié '+(year - 1))

    const mainRole = guild.roles.cache.find(role => role.id == mainRoleId)
    const newMemberRole = guild.roles.cache.find(role => role.id == newMemberRoleId)
    const member = guild.members.cache.find(member => member.id == interaction.user.id)

    // console.log('on check la licence : ', licences.includes(Licence));

    // si le membre a déjà sa licence valide pour l'année,
    const d = new Date();
    const currentYear = d.getFullYear();
    let isValid = false;

    // On check dans la liste si on le trouve
    for(const [year, licencesList] of Object.entries(licences)) {
      if(licencesList.includes(Licence)) {
        member.roles.add(guild.roles.cache.find(role => role.name == 'Licencié '+year))
        isValid = true;
      }
    }

    fetch(`https://data.ffvl.fr/php/verif_lic_adh.php?num=${Licence}&stru=${structureId}`)
      .then(response => response.json())
      .then((response) => {
        console.log('réponse FFVL', response);
        //si on trouve la licence dans la liste
        if(response == 1) {
          // https://data.ffvl.fr/php/verif_lic2.php?num=1205453Z&stru=03359
          isValid = true;
          // On ajoute le rôle de cette année
          member.roles.add(guild.roles.cache.find(role => role.name == 'Licencié '+currentYear))
          // on envoi le message
          // Si nouveau membre, message de bienvenue
          console.log(`${member.user.username } : nouvelle licence ${Licence} validée pour ${currentYear}`);
        }
      })
      .then((response) => {
        if(isValid) {
          member.roles.add(mainRole)
          member.roles.remove(newMemberRole)
          Response.setColor("GREEN")
          Response.setDescription(TRANSLATION_LICENCE.successNewMessage())
        } else {
          Response.setColor("RED")
          Response.setDescription(TRANSLATION_LICENCE.failureClub())
          console.log(d, 'echec licence', member.user.username, Licence)
        }
        interaction.editReply({embeds: [Response]})
      })

  }
}
