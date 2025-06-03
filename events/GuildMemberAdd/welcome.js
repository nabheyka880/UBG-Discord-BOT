const { Events } = require("discord.js")

module.exports = {
        name: Events.GuildMemberAdd,
        run: async (member) => {
        if (member.user.bot) return
        const channel = member.guild.channels.cache.get("1119022596348985435")
        if (!channel) return
        channel.send(`Hello, <@${member.id}>, and welcome to the secret base.`)
        member.send(`Hello, new member. I am a bot that got sent in your DM's to tell you some things.\nFirst off, you're going to need to verify, which is very simple. Don't worry.\nNow, you have access to everything, but maybe you joined the server for one thing only?\n# EXPLOIT REPORTS/BAN APPEALS\nIf you want to submit an exploit report/appeal, go to <#1163516803801165854>.\n# BING CHILLING\nIf you want to just chill and chat in general, then just go into <#1118997431795843105>`)
}
}