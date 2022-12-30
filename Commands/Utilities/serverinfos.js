const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports= {
  name: 'serverinfo',
  description: "Serverinfos",
  permission: "ADMINISTRATOR",
  /**
   *
   * @param {CommandeInteraction} interaction
   */
  execute(interaction) {
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return;
    const { guild } = interaction;

    const { name, createdTimestamp, ownerId, description, members } = guild

    const Embed = new MessageEmbed()
    .setColor("ORANGE")
    // .setAuthor(guild.name, guild.iconURL({dynamic: true}))
    .setThumbnail(guild.iconURL({dynamic: true}))
    .addFields(
      {
        name: "GENERAL",
        value:
        `
        Name: ${name}
        Created: <t:${parseInt(createdTimestamp / 1000)}:R>
        Owner: <@${ownerId}>

        Description: ${guild}

        `
      }, {
        name: "USERS",
        value:
        `
        Members: ${members.cache.filter((m) => !m.user.bot).size}
        `
      }
    )

    interaction.reply({embeds: [Embed]})
  }
}
