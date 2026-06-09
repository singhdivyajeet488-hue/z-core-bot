const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Shows user information')
    .addUserOption(o => o.setName('user').setDescription('User to check')),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);
    const embed = new EmbedBuilder()
      .setTitle(user.tag)
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: 'ID', value: user.id, inline: true },
        { name: 'Joined Server', value: `<t:${Math.floor(member.joinedTimestamp/1000)}:D>`, inline: true },
        { name: 'Account Created', value: `<t:${Math.floor(user.createdTimestamp/1000)}:D>`, inline: true },
        { name: 'Roles', value: member.roles.cache.map(r => r.name).join(', ') || 'None' }
      )
      .setColor('#5865F2');
    interaction.reply({ embeds: [embed] });
  }
};
