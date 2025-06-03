const { SlashCommandBuilder, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder()
        .setName("testing-command")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("This is a testing command for testing purposes only."),
    async execute(interaction) {
        const select_menu = new StringSelectMenuBuilder()
            .setCustomId("testing_menu")
            .setPlaceholder("Select a report ticket.")
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel("Exploiter Report")
                    .setDescription("Used for submitting a report of an exploiter.")
                    .setValue("Exploiter"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("Ban Appeal")
                    .setDescription("Used for reporting bans that falsely happened.")
                    .setValue("Appeal")
            )
        const row = new ActionRowBuilder().addComponents(select_menu)
        interaction.reply({
            content: "Modal created.",
            ephemeral: true,
            components: [row]
        })
    }
}