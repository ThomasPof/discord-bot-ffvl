const { CommandInteraction, MessageEmbed } = require("discord.js")

const fetch = require('node-fetch');

module.exports = {
  name: "verel",
  description: "Les infos utiles pour aller voler à Verel",
  deferred: true,

  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction) {
    const Response = new MessageEmbed()
    Response.setColor("GREEN")
    Response.setTitle("Infos utiles pour Verel")

    function degToCompass(deg) {
      let val = parseInt(deg / 22.5);
      console.log('val', (val % 16))
      let arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
      return arr[(val % 16)]
    }

    fetch('http://api.pioupiou.fr/v1/live/800').then(response => response.json()).then((response) => {
      console.log(response.data.meta.name)
      Response.addField('\u200B',response.data.meta.name, false)
      Response.addFields(
        { name: 'Direction', value: degToCompass(response.data.measurements.wind_heading), inline: true  },
        { name: 'Vent mini', value: String(response.data.measurements.wind_speed_min) + ' km/h', inline: true },
        { name: 'Vent moyen', value: String(response.data.measurements.wind_speed_avg) +  'km/h', inline: true },
        { name: 'Rafales', value: String(response.data.measurements.wind_speed_max) + ' km/h', inline: true },
      )
      interaction.editReply({ embeds:[Response], ephemeral: true });
    })
    fetch('http://api.pioupiou.fr/v1/live/641').then(response => response.json()).then((response) => {
      console.log(response.data.meta.name)
      Response.addField('\u200B',response.data.meta.name, false)
      Response.addFields(
        { name: 'Direction', value: degToCompass(response.data.measurements.wind_heading), inline: true  },
        { name: 'Vent mini', value: String(response.data.measurements.wind_speed_min) + ' km/h', inline: true },
        { name: 'Vent moyen', value: String(response.data.measurements.wind_speed_avg) + ' km/h', inline: true },
        { name: 'Rafales', value: String(response.data.measurements.wind_speed_max) + ' km/h', inline: true },
      )
      interaction.editReply({ embeds:[Response], ephemeral: true });
    })
    fetch('http://api.pioupiou.fr/v1/live/456').then(response => response.json()).then((response) => {
      console.log(response.data.meta.name)
      Response.addField('\u200B',response.data.meta.name, false)
      Response.addFields(
        { name: 'Direction', value: degToCompass(response.data.measurements.wind_heading), inline: true  },
        { name: 'Vent mini', value: String(response.data.measurements.wind_speed_min) + ' km/h', inline: true },
        { name: 'Vent moyen', value: String(response.data.measurements.wind_speed_avg) + ' km/h', inline: true },
        { name: 'Rafales', value: String(response.data.measurements.wind_speed_max) + ' km/h', inline: true },
      )
      interaction.editReply({ embeds:[Response], ephemeral: true });
    })

    Response.setImage('https://www.solarcam.fr/verel/last_big.jpg')
    interaction.editReply({ embeds:[Response], ephemeral: true })
  }
}
