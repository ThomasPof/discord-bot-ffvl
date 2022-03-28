const channelService = require('../../Services/Events/Clients/channelService.js')

module.exports = {
  name: 'channelCreate',
  once: false,
  /**
   * @param {GuildChannel} channel
   */
  execute(channel) {
    console.log(`channelCreate Emitted for channel ${channel.id}`)
    const rules = channelService.getCategoryRules(channel.parent);
    if(!rules) {
      console.log(`No rules found for this channel.`)
      return;
    }

    if (!!rules.pattern) {
      channelService.validateChannelName(channel, rules)
    }

    if (!!rules.order) {
      channelService.sortChannel(channel.parent, rules)
    }
  }
}