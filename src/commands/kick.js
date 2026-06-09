const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member')
    .addUserOption(o => o.setName('user').setDescription('User to kick').setRequired(true))
    .addStringOption(o => o.setName('reason').setDescription('Reason'))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    const member = interaction.guild.members.cache.get(interaction.options.getUser('user').id);
    const reason = interaction.options.getString('reason') || 'No reason provided';
    await member.kick(reason);
    interaction.reply(`✅ Kicked **${member.user.tag}** | Reason: ${reason}`);
  }
};
