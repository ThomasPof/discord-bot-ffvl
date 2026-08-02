const { mainRoleId, newMemberRoleId, structureId, licences } = require('../../config.json')
const { TRANSLATION_LICENCE } = require('../../translation/messages.js')
const usedLicences = require('../../data/usedLicences')

const fetch = require('node-fetch');

const { CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
  name: "licence",
  description: TRANSLATION_LICENCE.description(),
  deferred: true,
  ephemeral: true,
  cooldown: 5,          // minutes
  cooldownScope: 'user',
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
    const username = interaction.member.displayName;

    const Licence = options.getString('licence').toUpperCase();

    const Response = new MessageEmbed()

    const d = new Date();
    let currentYear = d.getFullYear();
    if(d.getMonth() >= 9) { // 9 = octobre
      currentYear = currentYear + 1;
    }
    let isValid = false;

    // On s'assure que le rôle pour chaque année connue existe
    let years = Object.keys(licences)
    if(!years.includes(currentYear.toString())) {
      years.push(currentYear.toString())
    }

    years.forEach(year => {
      if(!guild.roles.cache.find(role => role.name == 'Licencié '+year)) {
        guild.roles.create({
          name: 'Licencié '+year,
          color: 'BLUE',
          reason: 'Licenciés '+year,
        })
      }
    })

    const mainRole = guild.roles.cache.find(role => role.id == mainRoleId)
    const newMemberRole = guild.roles.cache.find(role => role.id == newMemberRoleId)
    const member = guild.members.cache.find(member => member.id == interaction.user.id)

    // Vérification dans la liste pré-chargée (config.json)
    for(const [year, licencesList] of Object.entries(licences)) {
      if(licencesList.includes(Licence)) {
        const owner = usedLicences.getOwner(year, Licence)
        if(owner) {
          Response.setColor("RED")
          Response.setDescription(TRANSLATION_LICENCE.failureAlreadyClaimed(owner))
          console.log(`Tentative de réutilisation de la licence ${Licence} (année ${year}) par ${username}, déjà utilisée par ${owner}`)
          return interaction.editReply({embeds: [Response]})
        }
        usedLicences.claim(year, Licence, username)
        member.roles.add(guild.roles.cache.find(role => role.name == 'Licencié '+year))
        isValid = true;
        console.log(`${username} : ${Licence} trouvée dans la liste ${year}`)
      }
    }

    // Vérification avant l'appel API
    const currentOwner = usedLicences.getOwner(currentYear, Licence)
    if(currentOwner) {
      Response.setColor("RED")
      Response.setDescription(TRANSLATION_LICENCE.failureAlreadyClaimed(currentOwner))
      console.log(`Tentative de réutilisation de la licence ${Licence} (année ${currentYear}) par ${username}, déjà utilisée par ${currentOwner}`)
      return interaction.editReply({embeds: [Response]})
    }

    fetch(`https://data.ffvl.fr/php/verif_lic_adh.php?num=${Licence}&stru=${structureId}`)
      .then(response => response.json())
      .then((response) => {
        console.log('réponse FFVL', response);
        if(response == 1 || response == 2) {
          isValid = true;
          usedLicences.claim(currentYear, Licence, username)
          member.roles.add(guild.roles.cache.find(role => role.name == 'Licencié '+currentYear))
          console.log(`${username} : ${Licence} trouvée à la FFVL pour ${currentYear}`)
        }
      })
      .then(() => {
        if(isValid) {
          member.roles.add(mainRole)
          member.roles.remove(newMemberRole)
          Response.setColor("GREEN")
          Response.setDescription(TRANSLATION_LICENCE.successNewMessage())
          console.log(`${username} : nouvelle licence ${Licence} validée`)
        } else {
          Response.setColor("RED")
          Response.setDescription(TRANSLATION_LICENCE.failureClub())
          console.log(d, 'echec licence', username, Licence)
        }
        interaction.editReply({embeds: [Response]})
      })
  }
}
