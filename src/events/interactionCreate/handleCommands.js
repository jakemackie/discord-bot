const { devs, testServer } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();

  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;

    if (
      (commandObject.devOnly && !devs.includes(interaction.member.id)) ||
      (commandObject.testOnly && interaction.guild.id !== testServer)
    ) {
      interaction.reply({
        content: commandObject.devOnly
          ? "Only developers are allowed to run this command."
          : "This command cannot be ran here.",
        ephemeral: true,
      });
      return;
    }

    if (
      commandObject.permissionsRequired?.some(
        (permission) => !interaction.member.permissions.has(permission)
      )
    ) {
      interaction.reply({
        content: "Not enough permissions.",
        ephemeral: true,
      });
      return;
    }

    if (
      commandObject.botPermissions?.some(
        (permission) =>
          !interaction.guild.members.me.permissions.has(permission)
      )
    ) {
      interaction.reply({
        content: "I don't have enough permissions.",
        ephemeral: true,
      });
      return;
    }

    await commandObject.callback(client, interaction);
  } catch (error) {
    console.log(`There was an error running this command: ${error}`);
  }
};
