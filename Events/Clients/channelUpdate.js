const channelService = require('../../Services/Events/Clients/channelService.js')

module.exports = {
  name: 'channelUpdate',
  once: false,
  /**
   * @param {GuildChannel} oldChannel
   * @param {GuildChannel} newChannel
   */
  execute(oldChannel, newChannel) {
    console.log(`channelUpdate Emitted for channel ${oldChannel.id}`)
    const rules = channelService.getCategoryRules(newChannel.parent);
    if(!rules) {
      console.log(`No rules found for this channel.`)
      return;
    }

    if (!!rules.pattern) {
      channelService.validateChannelName(newChannel, rules)
    }

    if (!!rules.order) {
      channelService.sortChannel(newChannel.parent, rules)
    }
  }
}
