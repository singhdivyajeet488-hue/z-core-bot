const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check bot latency'),
  async execute(interaction) {
    const msg = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    interaction.editReply(`🏓 Pong! Latency: ${msg.createdTimestamp - interaction.createdTimestamp}ms`);
  }
};
