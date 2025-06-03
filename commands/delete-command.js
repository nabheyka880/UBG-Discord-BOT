const { SlashCommandBuilder, REST, Routes, PermissionFlagsBits } = require("discord.js");
require('dotenv').config()

const rest = new REST({version: '10'}).setToken(process.env.BOT_ID);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("delete-command")
        .setDescription("Deletes a command from the ID. Only the owner of the bot can use this.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName("id")
                .setDescription("The ID of the command you want to remove.")
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.reply({
            content: "Working on it..",
            ephemeral: true
        })
        const author = interaction.member
        if (author.id !== "889842902669357066") return interaction.reply({content: "You can't use this command.", ephemeral: true})
        const command_id = interaction.options.get("id").value
        rest.delete(Routes.applicationCommand(process.env.ID, command_id))
            .then(interaction.editReply("Successfully deleted command."))
    }
}