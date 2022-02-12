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
      .setColor('GREEN')
      .setDescription(`
        Bienvenue ${member} sur le Discord du club des Z'éléphants Volants !

        Ce discord est là pour nous permettre d'échanger des infos, de planifier des sorties et événements, de finaliser leurs organisations opérationnelles, et d'en faire le compte-rendu.

        Afin de facilité l'organisation et la lisibilité, **il est souhaité que les pseudo affichés sur discord soient vos vrais prénoms et la première lettre de votre nom (au moins)**. Cela peut être paramètre pour le serveur des z'éléphants volants dans votre profil serveur.

        Si vous n'êtes pas membre du club des Z'éléphants Volants, votre accès au serveur est limité à quelques salons. **Pour avoir un accès complet au serveur, vous devez faire valider votre licence FFVL à notre robot.** Il vous suffit d'écrire le message */licence* et de renseigner votre numéro de licence FFVL

        Vous êtes nouveau au club  ? Alors, n'hésitez pas à aller vous présenter dans le salon <#935798608396185641>
        Vous voulez organiser une montée à Verel ? Rendez-vous dans <#935238034918621264>.
        Vous voulez organiser une sortie un peu plus planifiée ? N'hésitez pas à créer un salon dans la catégorie Planification de sorties !

        Si vous avez besoin d'aide sur l'outil Discord, le salon <#935247724088021002> est fait pour vous.

        Enfin, retrouvez tous les événements du club dans la catégorie Evénements calendriers et plein d'autres salons dans Vie du club

        Bonnes discussions, et surtout bons vols !
      `)
      const welcomeChannel = member.guild.channels.cache.get('942124475334422609') // salon Bienvenue
      welcomeChannel.send({embeds: [WelcomeMessage], ephemeral: true})

      // client.users.fetch(message.author.id, false).then((user) => {
      //   message.reply({embeds: [Response], ephemeral: true})
      // });
  }
}
