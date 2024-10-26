module.exports = {
  name: "ping",
  description: "test cmd",
  // deleted: Boolean,
  devOnly: true,
  // testOnly: Boolean,
  // ? option: Object[] - see docs for more info

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(
      `Pong! Client ${ping}ms | Websocket: ${client.ws.ping}ms`
    );
  },
};
