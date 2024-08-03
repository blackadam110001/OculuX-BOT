const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

// Initialize the Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Replace with your actual channel ID where the welcome message should be sent
const WELCOME_CHANNEL_ID = "CHANNEL_ID";

// Replace with your actual bot token
const BOT_TOKEN =
  "ENTER_YOUR_TOKEN";

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);

  if (!channel) {
    console.error("Welcome channel not found.");
    return;
  }

  // Create the mention tag for the user
  const userMention = `<@${member.id}>`;

  const welcomeEmbed = new EmbedBuilder()
    .setColor("#0099ff") // Set embed color
    .setTitle("Welcome to the Server!")
    .setDescription(
      `${userMention}, welcome to the server! We are glad to have you here.`,
    )
    .setThumbnail(member.user.displayAvatarURL()) // Add member's avatar
    .setFooter({ text: "Enjoy your stay!" });

  try {
    await channel.send({ embeds: [welcomeEmbed] });
    console.log(`Welcome message sent to ${member.user.tag}`);
  } catch (error) {
    console.error("Error sending welcome message:", error);
  }
});

// Log in with your bot token
client.login(BOT_TOKEN);
