require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (client) => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "test") {
    interaction.reply("Test command works!");
  }
});

client.login(process.env.TOKEN);
