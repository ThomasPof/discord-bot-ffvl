const {categoryRules} = require("../../../config.json");
const {MessageEmbed} = require("discord.js");

const WRONG_CHANNEL_NAME_PREFIX = '❗';
const WRONG_CHANNEL_ERROR_MESSAGE_DURATION = 10000; //in ms

const service = {
  /**
   * Validate the channel name against the regex provided in the configuration.
   * If the channel name start with an emoji, it will not lead to a new error message : it may define a specific channel.
   * @param {GuildChannel} channel
   * @param {CategoryRule} rules
   */
  validateChannelName(channel, rules) {
    const regex = new RegExp(rules.pattern);

    if (regex.test(channel.name)) {
      console.log(`Channel ${channel.name} (${channel.id}) is valid `)
      return
    }

    console.log(`Channel ${channel.id} does not match the creation pattern ${rules.pattern}`)

    if (startWithEmoji(channel.name)) {
      console.log(`...but it starts with an emoji, and should not be validate `)
      return
    }

    console.log(`...and it does not start with an emoji`)

    service.addErrorPrefixToChannelName(channel)
    service.sendChannelNameErrorMessage(channel)
  },

  /**
   * //@todo : does not work as expected...
   *
   * @param {CategoryChannel} category
   * @param {CategoryRule} rules
   */
  sortChannel(category, rules) {
    const channels = category.children
    console.log(`Sorting ${channels.size} channels in ${category.name} (${category.id})`)

    let channelsSorted = Array.from(channels.values())
      .sort((a,b) => a.name.localeCompare(b.name))
      .map((channel, index) => ({ channel: channel.id, position: index }))

    category.guild.channels.setPositions(channelsSorted)
      .then(guild => console.log(`Channels sorted in Category ${category.name} (${category.id})`))
      .catch(console.error);
  },

  /**
   * @param {CategoryChannel} category
   * @return CategoryRule
   */
  getCategoryRules(category) {
    const rule = categoryRules.find((categoryConf) => categoryConf.categoryId === category.id.toString())
    return (rule !== undefined) ? new CategoryRule(rule.pattern, rule.order) : false
  },

  /**
   * Send a message into the channel, explainning what happen. Then, delete it after WRONG_CHANNEL_ERROR_MESSAGE_DURATION.
   * @param {GuildChannel} channel
   */
  sendChannelNameErrorMessage(channel) {
    const errorMessage = new MessageEmbed()
      .setColor('RED')
      .setDescription(`
        Le nom que tu as choisi pour ton salon n'est pas autorisé dans cette categorie. Verifie dans les règles si tu n'as pas oublié quelque chose ;)
      `)
    channel.send({embeds: [errorMessage], ephemeral: true})
      .then(msg => {
        setTimeout(() => msg.delete(), WRONG_CHANNEL_ERROR_MESSAGE_DURATION)
      })
      .catch(console.error)
  },

  /**
   * @param {GuildChannel} channel
   */
  addErrorPrefixToChannelName(channel) {
    if (!channel.name.startsWith(WRONG_CHANNEL_NAME_PREFIX)) {
      const newName = WRONG_CHANNEL_NAME_PREFIX + channel.name
      channel.edit({
        'name': newName
      })
      .catch(console.error)
    }
  }
}

const startWithEmoji = function (string) {
  const regex = /(?=\p{Emoji})(?!\p{Number})/u
  return regex.test(string)
}

class CategoryRule {
  constructor(pattern, order) {
    this.pattern = pattern
    this.order = order
  }
}

module.exports = service