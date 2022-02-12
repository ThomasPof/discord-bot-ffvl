const { Client, MessageEmbed } = require("discord.js")

module.exports = {
  name: 'guildMemberAdd',
  once: false,
  /**
   * @param {Client} client
   */
  execute(member, client) {
    const NewMemberRole = member.guild.roles.cache.get('942124799361171476')
    member.roles.add(NewMemberRole)

    const WelcomeMessage = new MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`
        Bienvenue ${member} sur le Discord du club des Z'éléphants Volants !

        Ce discord est là pour nous permettre d'échanger des infos, de planifier des sorties et événements, de finaliser leurs organisations opérationnelles, et d'en faire le compte-rendu.

        Afin de facilité l'organisation et la lisibilité, **il est souhaité que les pseudo affichés sur discord soient les vrais prénoms et la première lettre du nom (au moins)**. Cela peut être paramètre pour le serveur des z'éléphants volants dans votre profil serveur.

        Si tu n'êtes pas membre du club des Z'éléphants Volants, ton accès au serveur est limité à quelques salons. **Pour avoir un accès complet au serveur, tu dois faire valider ta licence FFVL à notre robot.** Il suffit de taper le message **/licence** dans un salon et de renseigner ton numéro de licence FFVL.

        Tu es nouveau au club  ? Alors n'hésite pas à aller te présenter dans le salon <#935798608396185641>.
        Tu veux organiser une montée à Vérel ? Rendez-vous dans <#935238034918621264>.
        Tu veux organiser une sortie un peu plus planifiée ? N'hésite pas à créer un salon dans la catégorie Planification de sorties !

        Si tu as besoin d'aide sur l'outil Discord, le salon <#935247724088021002> est fait pour toi.

        Enfin, retrouve tous les événements du club dans la catégorie Evénements calendriers et plein d'autres salons dans Vie du club.

        Bonnes discussions, et surtout bons vols !
      `)
      const welcomeChannel = member.guild.channels.cache.get('942124475334422609') // salon Bienvenue
      welcomeChannel.send({embeds: [WelcomeMessage], ephemeral: true})

      // client.users.fetch(message.author.id, false).then((user) => {
      //   message.reply({embeds: [Response], ephemeral: true})
      // });
  }
}
