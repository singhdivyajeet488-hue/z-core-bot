const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a member')
    .addUserOption(o => o.setName('user').setDescription('User to warn').setRequired(true))
    .addStringOption(o => o.setName('reason').setDescription('Reason').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');
    interaction.client.db.prepare('INSERT INTO warnings (guild_id, user_id, reason, moderator_id) VALUES (?, ?, ?, ?)')
      .run(interaction.guild.id, user.id, reason, interaction.user.id);
    interaction.reply(`⚠️ Warned **${user.tag}** | Reason: ${reason}`);
  }
};
