const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder()
        .setName("testing-welcome")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("A testing welcome message."),
    async execute(interaction) {
        interaction.member.send(`Hello, new member. I am a bot that got sent in your DM's to tell you some things.\nFirst off, you're going to need to verify, which is very simple. Don't worry.\nNow, you have access to everything, but maybe you joined the server for one thing only?\n# EXPLOIT REPORTS/BAN APPEALS\nIf you want to submit an exploit report/appeal, go to <#1163516803801165854>.\n# BING CHILLING\nIf you want to just chill and chat in general, then just go into <#1118997431795843105>`)
        interaction.reply({content: "Sent welcome message in DMS.", ephemeral: true})
    }
}