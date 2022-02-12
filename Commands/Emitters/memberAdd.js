module.exports = {
  name: 'emitadd',
  permission: 'ADMINISTRATOR',
  description: 'Trigger l\'ajout d\'un nouveau membre.',
  execute( message, client) {
    client.emit("guildMemberAdd",message.member)

  }
}
