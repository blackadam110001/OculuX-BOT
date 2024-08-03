const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField } = require('discord.js');

// Initialize the Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Your bot token
const BOT_TOKEN = "ENTER_YOUR_TOKEN";

// Utility function to check if user has admin role
const isAdmin = (member) => {
  // Check if the member has the 'ADMINISTRATOR' permission
  return member.permissions.has(PermissionsBitField.Flags.Administrator);
};

// Log when the bot starts and connects to Discord
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options, member } = interaction;

  // Check if the user has admin permissions
  if (!isAdmin(member)) {
    await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    return;
  }

  // Handle admin commands
  if (commandName === 'welcome') {
    const user = options.getUser('user');
    if (user) {
      try {
        const welcomeEmbed = new EmbedBuilder()
          .setColor('#0099ff')
          .setTitle('Welcome!')
          .setDescription(`Hello ${user.tag}, welcome to the server! We're glad to have you here.`)
          .setThumbnail(user.displayAvatarURL())
          .setFooter({ text: 'Enjoy your stay!' });

        await interaction.reply({ embeds: [welcomeEmbed] });
      } catch (error) {
        console.error('Error sending welcome message:', error);
        await interaction.reply('There was an error trying to send the welcome message.');
      }
    } else {
      await interaction.reply('Could not find the specified user.');
    }
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // Clear messages logic for specific user
  const CLEAR_USER_ID = '881410149716201513';
  if (message.author.id === CLEAR_USER_ID && message.content.toLowerCase() === 'clear') {
    try {
      const fetchedMessages = await message.channel.messages.fetch({ limit: 100 });
      await message.channel.bulkDelete(fetchedMessages);
    } catch (err) {
      console.error('Failed to clear messages:', err);
    }
    return;
  }

  if (message.content.toLowerCase().includes('bharat')) {
    message.channel.send({
      content: 'Jai Hind!',
    });
  }
});

client.login(BOT_TOKEN);
