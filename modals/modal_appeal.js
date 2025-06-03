const { ChannelType, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionsBitField, OverwriteType } = require("discord.js")

module.exports = async (interaction) => {
    if (interaction.fields.getTextInputValue("explanation") === "") {
        interaction.reply("Please put in a valid explanation.")
    }
    if (!Number(interaction.fields.getTextInputValue("user_id"))) {
        return interaction.reply({
            content: "Please put in a valid user ID.",
            ephemeral: true
        })
    }
    interaction.guild.channels.create({
        name: "appeal-" + interaction.fields.getTextInputValue("user_id"),
        type: ChannelType.GuildText,
        permissionOverwrites: [
            {
                id: interaction.guild.roles.everyone.id,
                deny: [PermissionsBitField.Flags.ViewChannel],
                type: OverwriteType.Role
            },
            {
                id: interaction.member.id,
                allow: [PermissionsBitField.Flags.ViewChannel],
                type: OverwriteType.Member
            },
            {
                id: interaction.client.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel],
                type: OverwriteType.Member
            }
        ]
    }).then((channel) => {
        interaction.reply({
            content: "Ticket has been created. <#" + channel.id + ">.",
            ephemeral: true
        })
        const close_appeal = new ButtonBuilder()
            .setLabel("Close Appeal")
            .setStyle(ButtonStyle.Danger)
            .setCustomId("close_ticket")
        const row = new ActionRowBuilder().addComponents(close_appeal)
        channel.send({
            content: `<@${interaction.member.id}> created a ban appeal ticket with the user id of **${interaction.fields.getTextInputValue("user_id")}**.\n\nTheir profile link: https://www.roblox.com/users/${interaction.fields.getTextInputValue("user_id")}/profile`,
            components: [row]
        })
        channel.send({
            content: "**Their explanation:** " + interaction.fields.getTextInputValue("explanation")
        })
    })
    .catch((error) => console.log(error))
}