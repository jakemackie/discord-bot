module.exports = {
  name: "ping",
  description: "test command",
  // deleted: Boolean,
  // devOnly: Boolean,
  // testOnly: Boolean,
  // ? option: Object[] - see docs for more info

  callback: (client, interaction) => {
    interaction.reply("Pong!");
  },
};
