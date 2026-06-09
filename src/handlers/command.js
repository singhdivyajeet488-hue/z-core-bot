const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = (client) => {
  const commands = [];
  const commandsPath = path.join(__dirname, '../commands');
  
  if (!fs.existsSync(commandsPath)) {
    fs.mkdirSync(commandsPath, { recursive: true });
    return;
  }

  const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));
  
  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
      commands.push(command.data.toJSON());
    }
  }

  client.once('ready', async () => {
    const rest = new REST().setToken(process.env.TOKEN);
    try {
      await rest.put(
        Routes.applicationCommands(client.user.id),
        { body: commands }
      );
      console.log('Slash commands registered!');
    } catch (error) {
      console.error(error);
    }
  });
};
