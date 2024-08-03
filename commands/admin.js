const { REST, Routes } = require("discord.js");

// Define bot commands
const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "hint",
    description: "Get a hint for the treasure hunt",
    options: [
      {
        name: "level",
        description: "The level you need a hint for",
        type: 4, // 4 represents an integer type
        required: true,
      },
    ],
  },
  {
    name: "kick",
    description: "Kick a user from the server",
    options: [
      {
        name: "user",
        description: "The user to kick",
        type: 6, // 6 represents a user type
        required: true,
      },
      {
        name: "reason",
        description: "Reason for kicking the user",
        type: 3, // 3 represents a string type
        required: false,
      },
    ],
  },
  {
    name: "ban",
    description: "Ban a user from the server",
    options: [
      {
        name: "user",
        description: "The user to ban",
        type: 6, // 6 represents a user type
        required: true,
      },
      {
        name: "reason",
        description: "Reason for banning the user",
        type: 3, // 3 represents a string type
        required: false,
      },
    ],
  },
  {
    name: "mute",
    description: "Mute a user in the server",
    options: [
      {
        name: "user",
        description: "The user to mute",
        type: 6, // 6 represents a user type
        required: true,
      },
      {
        name: "duration",
        description: "Duration of the mute in minutes",
        type: 4, // 4 represents an integer type
        required: false,
      },
      {
        name: "reason",
        description: "Reason for muting the user",
        type: 3, // 3 represents a string type
        required: false,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(
  "ENTER_YOUR_TOKEN",
);

(async () => {
  try {
    console.log("Started refreshing administration (/) commands.");

    await rest.put(Routes.applicationCommands("CHANNEL_ID"), {
      body: commands,
    });

    console.log("Successfully reloaded administration (/) commands.");
  } catch (error) {
    console.error("Error reloading commands:", error);
  }
})();
