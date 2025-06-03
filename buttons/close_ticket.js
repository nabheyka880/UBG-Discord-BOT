const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")

module.exports = async (interaction) => {
    const channel = interaction.channel
    channel.delete()
}