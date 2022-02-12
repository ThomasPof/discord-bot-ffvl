const { Client } = require("discord.js")

module.exports = {
  name: 'messageCreate',
  once: false,
  /**
   * @param {Client} client
   */
  execute(message, client) {
    if (message.channel.type === 'DM') {
      console.log('DM')
      if(message.content.indexOf('!licence') != -1) {
        let licence = message.content.split(" ")[1]
        client.users.fetch(message.author.id, false).then((user) => {
          user.send(licence);
        });
      }
    }
    // client.user.setActivity("Hello", {type: "WATCHING"})
  }
}
