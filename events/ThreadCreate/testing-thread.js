const { Events, ButtonBuilder, ButtonStyle, ActionRowBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
    name: Events.ThreadCreate,
    run: async (thread) => {
        const button = new ButtonBuilder()
            .setStyle(ButtonStyle.Danger)
            .setLabel("Close Bug")
            .setCustomId("close_bug")
        const attachment = new AttachmentBuilder().setFile("bread.png")
        const actionRow = new ActionRowBuilder().addComponents(button)
        thread.send({
            content: `Hello <@${thread.ownerId}> and thank you for creating this support bug. **If you are able to, please provide evidence of the bug and, if you haven't already, describe the bug with more details.**\n\nIn the meantime, check out this picture of bread.`,
            components: [actionRow],
            files: [attachment]
        })
    }
}