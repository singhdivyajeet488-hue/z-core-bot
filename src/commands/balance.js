const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Check your balance'),
  async execute(interaction) {
    const row = interaction.client.db.prepare('SELECT coins FROM users WHERE id = ?').get(interaction.user.id)
      || { coins: 0 };
    const embed = new EmbedBuilder()
      .setTitle(`💰 ${interaction.user.username}'s Balance`)
      .setDescription(`**${row.coins}** coins`)
      .setColor('#FFD700');
    interaction.reply({ embeds: [embed] });
  }
};
