module.exports = {
  name: 'emitadd',
  description: 'Trigger l\'ajout d\'un nouveau membre.',
  execute( message, client) {
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return;
    client.emit("guildMemberAdd",message.member)

  }
}
