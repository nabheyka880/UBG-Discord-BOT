const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ubg-kick")
        .setDescription("Kicks someone on UBG.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers, PermissionFlagsBits.KickMembers)
        .addStringOption(option =>
            option.setName("user")
                .setDescription("The user you want to ban.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("The reason you want to ban the user.")
        ),
    async execute(interaction) {
        await interaction.reply({content: "Let me work on it...", ephemeral: true})
        let reason_message
        const axios = require('axios')
        if (!interaction.options.get("reason")) {
            reason_message = "No reason provided."
        } else {
            reason_message = interaction.options.get("reason").value
        }
        const author = interaction.member
        const website = process.env.KICK_API
        const api_key = process.env.API_KEY
        const response = axios.post(website, {
            'message': JSON.stringify({
                name: interaction.options.get("user").value,
                reason: reason_message,
                moderator: author.displayName
            })
        }, {
            'headers': {
                'x-api-key': api_key,
                'Content-Type': 'application/json'
            }
        })
            .then(interaction.editReply({content: `Successfully kicked ${interaction.options.get("user").value} for the following reason: ${reason_message}`, ephemeral: true}))
            .catch((error) => {
                if (error.response.status === 403) return interaction.editReply({content: "Error corrured. Publish is not allowed on universe.", ephemeral: true})
                if (error.response.status === 401) return interaction.editReply({content: "API key not valid for operation, user does not have authorization", ephemeral: true})
                if (error.response.status === 500) return interaction.editReply({content: "Server internal error / Unknown error."})
                if (error.response.status === 400) {
                    interaction.editReply({content: "Request message cannot be longer than 1024 characters."})
                    console.log(error.response.data)
                    return
                }
                console.log(error)
            })
        if (response.status === 200) return interaction.editReply({content: "Successfully sent message.", ephemeral: true})
    }
}