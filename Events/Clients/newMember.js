const { Client } = require("discord.js")
const { newMemberRoleId } = require('../../config.json')

module.exports = {
  name: 'guildMemberAdd',
  once: false,
  /**
   * @param {Client} client
   */
  execute(member, client) {
    const NewMemberRole = member.guild.roles.cache.get(newMemberRoleId)
    member.roles.add(NewMemberRole)
  }
}
