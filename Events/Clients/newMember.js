const { Client, MessageEmbed } = require("discord.js")
const { newMemberRoleId, welcomeChannelId } = require('../../config.json')
const { TRANSLATION_NEW_MEMBER } = require('../../translation/messages.js')

module.exports = {
  name: 'guildMemberAdd',
  once: false,
  ephemeral: true,
  /**
   * @param {Client} client
   */
  execute(member, client) {
    const NewMemberRole = member.guild.roles.cache.get(newMemberRoleId)
    member.roles.add(NewMemberRole)

    const WelcomeMessage = new MessageEmbed()
      .setColor('ORANGE')
      .setDescription(TRANSLATION_NEW_MEMBER.welcome(member))
      const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId) // salon Bienvenue
      welcomeChannel.send({embeds: [WelcomeMessage]})

      // client.users.fetch(message.author.id, false).then((user) => {
      //   message.reply({embeds: [Response], ephemeral: true})
      // });
  }
}
