const config = require("../config.json"),
  { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isCommand()) return;
    const { client } = interaction;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    console.log(
      `${interaction.user.tag} em #${interaction.channel.name}: ${interaction.commandName}`
    );

    // This code logs the commands on a chat
    const opts = interaction.options.data.map((option) => option.value);

    const logChannel = client.channels.cache.get(config.logs.slash);
    if (!logChannel)
      return console.error(
        `Log channel not found: ${config.logs.slash}`
      );

    const fields = [
      {
        name: "Autor:",
        value: `<@${interaction.user.id}> - (\`${interaction.user.id}\`)`,
        inline: false,
      },
      {
        name: "Comando:",
        value: `${interaction.commandName} ${opts.join(" ")}`,
        inline: false,
      },
      {
        name: "Id da mensagem/comando:",
        value: `${interaction.id}`,
        inline: false,
      },
      {
        name: "Canal:",
        value: `${interaction.channel.name} - (${interaction.channel.id})`,
        inline: false,
      },
      {
        name: "Servidor:",
        value: `${interaction.guild.name} - (${interaction.guild.id})`,
        inline: false,
      },
    ];
    const embed = new EmbedBuilder()
      .setColor(config.botPreferences.color)
      .setThumbnail(
        interaction.guild.iconURL({
          dynamic: true,
          size: 2048,
        })
      )
      .setTitle("Jéssica - Logs")
      .setDescription("Log de Comandos")
      .addFields(fields);

    logChannel.send({ embeds: [embed] }).catch((error) => {
      console.error(`Error sending interaction log: ${error}`);
    });

    // Now, run the command

    try {
      return command.execute(interaction);
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "Caaaalma! Deu um erro aqui.",
        ephemeral: true,
      });
    }
  },
};
