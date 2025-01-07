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

    let isValid = false;

    // const pastYearlyRole = guild.roles.cache.find(role => role.name == 'Licencié '+(year - 1))

    const mainRole = guild.roles.cache.find(role => role.id == mainRoleId)
    const member = guild.members.cache.find(member => member.id == interaction.user.id)

    // console.log('on check la licence : ', licences.includes(Licence));

    // si le membre a déjà sa licence valide pour l'année,

    fetch(`https://data.ffvl.fr/php/verif_lic_adh.php?num=${Licence}`)
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
          console.log(`${member.user.username } : ${Licence} féminine trouvée à la FFVL`);
        }
      })
      .then((response) => {
        if(isValid) {
          member.roles.add(mainRole)
          Response.setColor("GREEN")
          console.log(`${member.user.username } : nouvelle licence ${Licence} validée`);
          Response.setDescription(TRANSLATION_LICENCE.successNewMessage())
        } else {
          Response.setColor("RED")
          Response.setDescription(TRANSLATION_LICENCE.failureClub())
          console.log('echec licence', member.user.username, Licence)
        }
        interaction.editReply({embeds: [Response]})
      })

  }
}
