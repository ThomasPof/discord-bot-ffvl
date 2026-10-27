const { Client, CommandInteraction, MessageEmbed, Collection } = require("discord.js");

const cooldowns = new Map();

module.exports= {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if(interaction.isCommand()) {

      const command = client.commands.get(interaction.commandName)
      if(!command) {
        client.commands.delete(interaction.commandName)
        return interaction.reply({embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setDescription("An error occured while running this command.")
        ],ephemeral: true}).catch(console.error)
      }

      // console.log(interaction)
      // console.log('INTERACTION : ' + interaction.channelId);
      // 941229178714488842

      if(!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection())
      }

      const current_time = Date.now();
      const time_stamps = cooldowns.get(command.name)
      const cooldown_amount = (command.cooldown) * 1000 * 60;

      // 'user' pour bloquer par membre, 'channel' (défaut) pour bloquer par salon
      const cooldownKey = command.cooldownScope === 'user'
        ? interaction.user.id
        : interaction.channelId;

      if(time_stamps.has(cooldownKey)) {
        const expiration_time = time_stamps.get(cooldownKey) + cooldown_amount;
        if(current_time < expiration_time) {
          const time_left = (expiration_time - current_time) / 1000 / 60
          const Response = new MessageEmbed()
          Response.setColor("RED")
          if(command.cooldownScope === 'user') {
            Response.setTitle("Doucement !")
            Response.setDescription(`Tu as déjà utilisé cette commande récemment. Merci de patienter encore ${Math.ceil(time_left)} minute(s).`)
          } else {
            Response.setTitle("Doucement avec la webcam !")
            Response.setDescription(`L'affichage de la webcam s'est fait il y a moins de ${command.cooldown} minutes. Merci de patienter encore ${Math.round(time_left)} minutes avant la réutiliser.`)
          }
          return interaction.reply({ embeds:[Response], ephemeral: true }).catch(error => {
            console.error(`reply cooldown impossible pour /${command.name} (${interaction.user.tag})`, error.code || error)
          })
        }
      }

      time_stamps.set(cooldownKey, current_time)

      // ne supprime que si l'entrée n'a pas été renouvelée entre-temps
      setTimeout(() => {
        if(time_stamps.get(cooldownKey) === current_time) time_stamps.delete(cooldownKey)
      }, cooldown_amount)
      if(command.deferred) {
        try {
          await interaction.deferReply({ephemeral: command.ephemeral});
        } catch(error) {
          // 10062 : l'interaction a expiré (>3s) avant l'accusé de réception, rien à répondre
          console.error(`deferReply impossible pour /${command.name} (${interaction.user.tag})`, error.code || error)
          time_stamps.delete(cooldownKey)
          return
        }
      }
      Promise.resolve(command.execute(interaction, client)).catch(error => {
        console.error(`Erreur dans la commande /${command.name}`, error)
      })
    }
  }
}
