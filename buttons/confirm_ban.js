const { ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require("discord.js")
const axios = require('axios')
const nobloxJS = require('noblox.js')

module.exports = async (interaction) => {
    const button_confirm = new ButtonBuilder()
        .setLabel("Confirm")
        .setCustomId("ban")
        .setStyle(ButtonStyle.Success)
    const button_decline = new ButtonBuilder()
        .setLabel("Decline")
        .setCustomId("decline_ban")
        .setStyle(ButtonStyle.Danger)
    const row = new ActionRowBuilder().addComponents(button_confirm, button_decline)
    await interaction.reply({
        content: "Are you ACTUALLY sure you want to ban the exploiter? Type **Y** if yes, type **N** if not.",
        ephemeral: true,
    })
    const filter_button = (m) => m.author.id === interaction.member.id
    const collector = interaction.channel.createMessageCollector({
        filter: filter_button,
        max: 1,
        time: 500000
    })
    collector.on('collect', m => {
        m.delete()
        if (m.content.toUpperCase() === "Y") {
            interaction.editReply({
                content: "Working on it...",
                ephemeral: true
            })
            const channel = interaction.channel
            const website = "https://apis.roblox.com/messaging-service/v1/universes/6157977372/topics/kick"
            const api_key_test = process.env.API_TEST
            const response = axios.post(website, 
                {
                    'message': JSON.stringify({
                        userId: Number(channel.name.split("ticket-").at(1)),
                        reason: 'Exploiting',
                        moderator: m.author.displayName
                    })
                }, 
                {
                    'headers': {
                        'x-api-key': api_key_test,
                        'Content-Type': 'application/json'
                }
            })
            if (response) {
                if (response.status === 200) interaction.editReply("Successfully banned user. Closing ticket...")
            }
        }
    });
}