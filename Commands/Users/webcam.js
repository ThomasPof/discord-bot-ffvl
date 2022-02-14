const { CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
  name: "webcam",
  description: "Affichage d'une webcam",
  options: [
    {
      name: "verel",
      description: "Webcam du déco de Verel",
      type: "SUB_COMMAND",
    }, {
      name: "revard",
      description: "Webcam du déco du Revard",
      type: "SUB_COMMAND",
    }
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction) {
    const Response = new MessageEmbed()
    Response.setColor("GREEN")
    try {
      switch (interaction.options.getSubcommand()) {
        case 'verel':
          Response.setTitle(`Dernière image de la webcam de Verel`)
          Response.setImage('https://www.solarcam.fr/verel/last_big.jpg')
        break;
        case 'revard':
          Response.setTitle(`Webcam du Revard`)
          Response.setImage('https://www.solarcam.fr/verel/last_big.jpg')
        break;
      }
    } catch (e) {
      const errorEmbed = new MessageEmbed()
      errorEmbed.setColor("RED")
      errorEmbed.setDescription(`
        Alert : ${e}
        `)
      return interaction.reply({embeds:[errorEmbed], ephemeral: true})
    }
    interaction.reply({embeds:[Response]})
  }
}
