// Run this file to deploy all commands for all guilds 

const fs = require('node:fs');
const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [];
let count = 0;
fs.readdirSync('./commands').forEach((dir) => {
	const commandFiles = fs.readdirSync(`./commands/${dir}`).filter((files) => files.endsWith('.js') && dir !== 'dev');
	console.log(commandFiles);
	for (const file of commandFiles) {
		const command = require(`../commands/${dir}/${file}`);
		commands.push(command.data.toJSON());
		count++;
	}
});

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationCommands("1098373116088037376"), { body: commands })
	.then(() => console.log(`[GLOBAL] ${count} Commands registered with success`))
	.catch(console.error);