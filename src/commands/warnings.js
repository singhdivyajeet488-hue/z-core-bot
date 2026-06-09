const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription('Check warnings of a user')
    .addUserOption(o => o.setName('user').setDescription('User').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const warns = interaction.client.db.prepare('SELECT * FROM warnings WHERE guild_id = ? AND user_id = ?')
      .all(interaction.guild.id, user.id);
    const embed = new EmbedBuilder()
      .setTitle(`Warnings for ${user.tag}`)
      .setDescription(warns.length ? warns.map((w,i) => `**${i+1}.** ${w.reason} - <@${w.moderator_id}>`).join('\n') : 'No warnings')
      .setColor('#FFA500');
    interaction.reply({ embeds: [embed] });
  }
};
