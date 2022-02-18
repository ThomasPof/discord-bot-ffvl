const { CommandInteraction, MessageEmbed } = require("discord.js")

const fetch = require('node-fetch');

module.exports = {
  name: "verel",
  description: "Les infos utiles pour aller voler à Verel",
  deferred: true,
  // cooldown in minutes
  cooldown: 10,

  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction) {
    const Response = new MessageEmbed()
    const current_time = Date.now();

    const pioupious = [
      'http://api.pioupiou.fr/v1/live/800',
      'http://api.pioupiou.fr/v1/live/641',
      'http://api.pioupiou.fr/v1/live/456'
    ]

    Response.setColor("GREEN")
    Response.setTitle("Infos utiles pour Verel")
    // Response.image.url = `https://www.solarcam.fr/verel/last_big.jpg?${current_time}`

    function degToCompass(deg) {
      let val = parseInt(deg / 22.5);
      let arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
      return arr[(val % 16)]
    }

    pioupious.forEach(function (item, index) {
      fetch(item)
        .then(response => response.json())
        .then((response) => {
          Response.addField('\u200B',response.data.meta.name, false)
          Response.addFields(
            { name: 'Direction', value: degToCompass(response.data.measurements.wind_heading), inline: true  },
            { name: 'Vent moyen', value: String(response.data.measurements.wind_speed_avg) +  'km/h', inline: true },
            { name: 'Rafales', value: String(response.data.measurements.wind_speed_max) + ' km/h', inline: true },
          )
          interaction.editReply({ embeds:[Response]});
          return index
        })
        .then((index) => {
          if(index === pioupious.length - 1) {
            Response.setImage(`https://www.solarcam.fr/verel/last_big.jpg?${current_time}`)
            interaction.editReply({ embeds:[Response]})
          }
        })
    });

  }
}
