const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Initialize the Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Function to format the current timestamp
const getTimestamp = () => {
  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`; // Simple time format
  const date = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear().toString().slice(-2)}`; // DD/MM/YY
  return `${time} ${date}`;
};

// Function to log messages to a file
const logToFile = (user, action) => {
  const timestamp = getTimestamp();
  const logMessage = `[${user}] - [${action}] - [${timestamp}]`;

  fs.appendFile(path.join(__dirname, 'logs.txt'), logMessage + '\n', (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
};

// Log when the bot starts and connects to Discord
client.once('ready', () => {
  logToFile('Bot', 'Connected to Discord');
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  let actionMessage = `Command ${interaction.commandName} used by ${interaction.user.tag}`;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
    actionMessage += ' - Replied with Pong!';
  }

  if (interaction.commandName === 'hint') {
    const level = interaction.options.get('level').value;
    actionMessage += ` - Hint requested with level: ${level}`;

    if (level == 1) {
      await interaction.reply('This is the hint for level 1');
    } else if (level == 2) {
      await interaction.reply('This is the hint for level 2');
    } else if (level == 3) {
      await interaction.reply('This is the hint for level 3');
    } else if (level == 4) {
      await interaction.reply('This is the hint for level 4');
    } else if (level == 5) {
      await interaction.reply('This is the hint for level 5');
    }
  }

  logToFile(interaction.user.tag, actionMessage);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  let actionMessage = `Message from ${message.author.tag}: ${message.content}`;

  if (message.author.username === 'cvesu1' && message.content.toLowerCase() === 'clear') {
    message.channel.bulkDelete(100).catch(err => {
      console.error(err);
      logToFile(message.author.tag, `Failed to clear messages: ${err}`);
    });
    actionMessage += ' - Attempted to clear messages';
  }

  if (message.content.toLowerCase().includes('bharat')) {
    message.channel.send({
      content: 'Jai Hind!',
    });
    actionMessage += ' - Sent Jai Hind!';
  }

  logToFile(message.author.tag, actionMessage);
});

// Replace 'YOUR_BOT_TOKEN_HERE' with your actual bot token
client.login("TOKEN");
