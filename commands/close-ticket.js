const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder()
        .setName("close-ticket")
        .setDescription("Closes a ticket or appeal. Requires the user of the poster, and the reason.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addUserOption(option =>
            option.setName("original-poster")
                .setDescription("The one who made the ticket/appeal")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("The reason for closing the ticket/appeal.")
                .setRequired(true)
                .addChoices(
                    {
                        name: 'Invalid',
                        value: "Invalid"
                    },
                    {
                        name: "Resolved",
                        value: "Resolved"
                    },
                    {
                        name: "Shitpost",
                        value: "Shitpost"
                    }
                )
        )
        .addBooleanOption(option => 
            option.setName("dm-op")
                .setDescription("If it's true, i will DM the bot telling that the ticket/appeal got closed.")
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.channel.name.startsWith("ticket-")) {
            return interaction.reply({
                content: "You can't use this command here, as it's not a ticket, nor an appeal.",
                ephemeral: true
            })
        }
        const channel = interaction.channel
        const fetch_messages = await channel.messages.fetch({
            limit: 1,
            after: 1
        })
        const first_message = fetch_messages.first()
        const author_poster = first_message.content.match(/(\d+)/)[0]
        const collectorFilter = m => m.author.id === interaction.member.id
        let additional_message = ""
        let message_dm
        const user = interaction.options.getUser("original-poster")
        if (user.id !== author_poster) {
            return interaction.reply({
                content: "Wrong author poster.",
                ephemeral: true
            })
        }
        const reason = interaction.options.get("reason").value
        const dm = interaction.options.getBoolean("dm-op")

        const collector = interaction.channel.createMessageCollector({
            filter: collectorFilter,
            time: 900_000,
            max: 50
        })

        if (dm === true) {
            interaction.reply({
                content: "Would you like to add an additional message to the O.P.?\nIf yes, type 'Y' and the message. If not, then just type 'N'",
                ephemeral: true
            })
        }

        function DM() {
            if (additional_message !== "") {
                message_dm = "Your post has been closed for the following reason: **" + reason + "**.\nThe moderator left an additional message: **" + additional_message + "**."
            } else {
                message_dm = "Your post has been closed for the following reason: **" + reason + "**."
            }
    
            if (dm === true) {
                user.send(message_dm)
            }
        }

        if (!dm) {
            return interaction.channel.delete()
        }

        collector.once('collect', m => {
            if (dm === false) return
            if (m.content.toUpperCase().startsWith("Y")) {
                const splitted = m.content.split("Y ").pop()
                additional_message = splitted
                interaction.editReply({content: "Got it.", ephemeral: true})
            } else if (m.content.toUpperCase() === "N") {
                interaction.editReply({content: "Got it.", ephemeral: true})
            }
            DM()
            m.delete()
            interaction.channel.delete()
        })
    }
}