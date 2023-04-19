const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js"),
config = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ajuda")
    .setDescription("Oii! Precisa de ajuda?"),
  async execute(interaction) {

    // See https://discordjs.guide/popular-topics/embeds.html#embed-preview for more info
    const embed = new EmbedBuilder()
      .setColor(config.botPreferences.color)
      .setTitle(
       "Ajuda - Jéssica"
      )
      .setDescription(
        "Sou a bot da Royal Devs!"
      );

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Website")
        .setStyle(ButtonStyle.Link)
        .setURL("https://discord.com/invite/zc8HFTC4XA") //config.infos.website (i recommend)
    );

    return interaction.reply({ embeds: [embed], components: [row] });
  },
};


// Notes of a anom staff:

// More 2 years working hard without receive any money... hildodev...