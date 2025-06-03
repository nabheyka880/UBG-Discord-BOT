const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder() 
        .setName("ubg-unban")
        .setDescription("Unbans someone from UBG.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option.setName("user")
                .setDescription("The user you want to unban.")
                .setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.options.get("user").value
        const api_key = process.env.API_KEY
        const axios = require('axios')
        interaction.fetchReply({
            ephemeral: true
        })
        axios.post("https://apis.roblox.com/messaging-service/v1/universes/6157977372/topics/unban_Discord", {
            'message': JSON.stringify({
                userId: user
            })
        }, {
            'headers': {
                'x-api-key': api_key,
                'Content-Type': 'application/json'
            }
        })
        .catch((error) => interaction.editReply({
            content: "Something occured.",
            ephemeral: true
        }))
        .then(() => interaction.editReply({
            content: "Successfully unbanned **" + user + "**.",
            ephemeral: true
        }))
    }
}