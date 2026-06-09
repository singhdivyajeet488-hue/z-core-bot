const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows all commands'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📚 Z-Core Bot Commands')
      .addFields(
        { name: '🔧 Utility', value: '/ping, /serverinfo, /userinfo, /help' },
        { name: '🔨 Moderation', value: '/ban, /kick, /warn, /warnings, /timeout' },
        { name: '💰 Economy', value: '/balance, /daily' },
        { name: '🎵 Music', value: '/play, /skip, /stop, /queue, /pause, /resume' }
      )
      .setColor('#5865F2');
    interaction.reply({ embeds: [embed] });
  }
};
