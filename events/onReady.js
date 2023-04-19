const { ActivityType } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		const activities = [
            // Add more arrays to switch activities
			['Sou brilhante como uma estrela!', ActivityType.Competing],
		];

		setInterval(async () => {
			const i = Math.floor(Math.random() * activities.length + 1) - 1;
			await client.user.setActivity(activities[i][0], {
				type: activities[i][1],
			});
		}, 10000);

		console.log(
			`========= Ready, logged as: ${client.user.tag} ========= `,
		);
	},
};