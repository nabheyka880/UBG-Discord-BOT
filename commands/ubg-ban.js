const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const axios = require('axios')
const nobloxJS = require('noblox.js')
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ubg-ban")
        .setDescription("Bans a user on UBG.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
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
        const user = interaction.options.get("user").value
        let reason
        if (!interaction.options.get("reason")) {
            reason = "No reason provided"
        } else {
            reason = interaction.options.get("reason").value
        }

        interaction.reply({
            content: "Working on it...",
            ephemeral: true
        })

        const api_key = process.env.API_KEY
        const website = "https://apis.roblox.com/messaging-service/v1/universes/6157977372/topics/ban_Discord"
        let user_id
        await nobloxJS.getIdFromUsername(user)
            .then((id) => user_id = id)
        console.log(user_id)
        const response = axios.post(website, {
                'message': JSON.stringify({
                    userId: user_id,
                    reason: reason,
                    moderator: interaction.member.displayName
                })
            }, {
                'headers': {
                    'x-api-key': api_key,
                    'Content-Type': "application/json"
                }
            })
            .then((response) => interaction.editReply("Successfully banned **" + user + "** for the following reason: **" + reason + "**."))
        if (response.status === 200) {
            interaction.editReply("Successfully banned **" + user + "** for the following reason: **" + reason + "**.")
        }
    }
}