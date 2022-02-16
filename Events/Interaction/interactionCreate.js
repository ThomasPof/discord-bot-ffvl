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
      if(!command) return interaction.reply({embeds: [
        new MessageEmbed()
          .setColor("RED")
          .setDescription("An error occured while running this command.")
      ],ephemeral: true}) && client.commands.delete(interaction.commandName)

      // console.log(interaction)
      // console.log('INTERACTION : ' + interaction.channelId);
      // 941229178714488842

      if(!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection())
      }

      const current_time = Date.now();
      const time_stamps = cooldowns.get(command.name)
      const cooldown_amount = (command.cooldown) * 1000 * 60;

      if(time_stamps.has(interaction.channelId)) {
        const expiration_time = time_stamps.get(interaction.channelId) + cooldown_amount;
        if(current_time < expiration_time) {
          const time_left = (expiration_time - current_time) / 1000 / 60
          const Response = new MessageEmbed()
          Response.setColor("RED")
          Response.setTitle("Doucement avec la webcam !")
          Response.setDescription(`L'affichage de la webcam s'est fait il y a moins de ${command.cooldown} minutes. Merci de patienter encore ${Math.round(time_left)} minutes avant la réutiliser.`)
          return interaction.reply({ embeds:[Response], ephemeral: true })
        }
      }

      time_stamps.set(interaction.channelId, current_time)

      setTimeout(() => time_stamps.delete(interaction.channelId), cooldown_amount)
      if(command.deferred) {
        await interaction.deferReply();
      }
      command.execute(interaction, client)
    }
  }
}
