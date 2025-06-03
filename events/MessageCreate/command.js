const { Events } = require("discord.js");
const { SlashCommandBuilder, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");

module.exports = {
    name: Events.MessageCreate,
    run: async (message) => {
    if (message.author.id !== "889842902669357066") return
    if (message.content === "!ticket") {
        message.delete()
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
        message.channel.send({
            content: "Please select a type of ticket.",
            components: [row]
        })
    }
}
}