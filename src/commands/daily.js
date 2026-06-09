const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Claim your daily coins'),
  async execute(interaction) {
    const db = interaction.client.db;
    db.prepare('INSERT OR IGNORE INTO users (id) VALUES (?)').run(interaction.user.id);
    db.prepare('UPDATE users SET coins = coins + 100 WHERE id = ?').run(interaction.user.id);
    interaction.reply(`✅ You claimed your daily **100 coins**!`);
  }
};
