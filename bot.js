const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

// Check https://discordjs.guide/popular-topics/intents.html#gateway-intents to know more
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();

let commandCount = 0,
  eventCount = 0;
fs.readdirSync("./commands").forEach((dir) => {
  const commandFiles = fs
    .readdirSync(`./commands/${dir}`)
    .filter((files) => files.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${dir}/${file}`);
    client.commands.set(command.data.name, command);
  }
  commandCount++;
});

console.log(`${commandCount} Command loaded.`);

// Get all js files and run/load
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
  eventCount++;
}
console.log(`${eventCount} Events loaded.`);

client.login(process.env.TOKEN);
