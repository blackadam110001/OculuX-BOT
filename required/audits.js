const { Client, GatewayIntentBits, EmbedBuilder, AuditLogEvent } = require('discord.js');

// Initialize the Discord client with required intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// Replace with your actual channel ID
const LOG_CHANNEL_ID = 'CHANNEL_ID';
// Replace with your actual bot token
const BOT_TOKEN = 'ENTER_YOUR_TOKEN';

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildAuditLogEntryCreate', async (auditLogEntry) => {
  const channel = client.channels.cache.get(LOG_CHANNEL_ID);

  if (!channel) {
    console.error('Log channel not found.');
    return;
  }

  const { action, target, user, reason } = auditLogEntry;
  let actionType;

  switch (action) {
    case AuditLogEvent.MemberKick:
      actionType = `Kicked by ${user.tag}`;
      break;
    case AuditLogEvent.MemberBan:
      actionType = `Banned by ${user.tag}`;
      break;
    case AuditLogEvent.MessageDelete:
      actionType = `Message deleted by ${user.tag}`;
      break;
    case AuditLogEvent.MessageUpdate:
      actionType = `Message updated by ${user.tag}`;
      break;
    case AuditLogEvent.ChannelCreate:
      actionType = `Channel created by ${user.tag}`;
      break;
    case AuditLogEvent.ChannelDelete:
      actionType = `Channel deleted by ${user.tag}`;
      break;
    case AuditLogEvent.RoleCreate:
      actionType = `Role created by ${user.tag}`;
      break;
    case AuditLogEvent.RoleDelete:
      actionType = `Role deleted by ${user.tag}`;
      break;
    default:
      actionType = `Unknown action by ${user.tag}`;
  }

  const logEmbed = new EmbedBuilder()
    .setColor('#ff0000')
    .setTitle('Audit Log Entry')
    .setDescription(actionType)
    .addFields(
      { name: 'Target', value: `${target}` || 'N/A' },
      { name: 'Reason', value: reason || 'No reason provided' }
    )
    .setFooter({ text: `Action by: ${user.tag}` });

  try {
    await channel.send({ embeds: [logEmbed] });
    console.log(`Logged action: ${actionType}`);
  } catch (error) {
    console.error('Error sending log message:', error);
  }
});

// Fetch and log audit logs on startup
client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Fetch recent audit logs from all guilds
  client.guilds.cache.forEach(async (guild) => {
    try {
      const auditLogs = await guild.fetchAuditLogs({ limit: 10 });
      auditLogs.entries.forEach(entry => {
        console.log(`Fetched audit log entry: ${entry.action}`);
        // Process each log entry if needed
      });
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    }
  });
});

client.login(BOT_TOKEN);
