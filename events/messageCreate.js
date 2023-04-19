const config = require("../config.json");

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		if (message.author.bot) return;
		if (message.content === `${config.botID}`) {
			return message.reply(
				'Olá! Use `/` para usar meus comandos, digite `/ajuda` para mais informações!',
			);
		}

		// More code here, checkout message to see what u can do
	},
};
