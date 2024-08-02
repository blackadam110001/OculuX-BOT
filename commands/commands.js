const { REST, Routes } = require("discord.js");

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
        type: 4,
        required: true,
      },
    ],
  },
  {
    name: "start",
    description: "Start Hunt",
  },
];

const rest = new REST({ version: "10" }).setToken(
  "MTI2ODkzNjQzNTY5MjczMjQ3OA.GxzOX7.Swd6zDDvooz4T7PdLqkJsfW1RgIHe5MCtgyZqk",
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands("1268936435692732478"), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

