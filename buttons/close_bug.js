const { ChannelType } = require("discord.js")

module.exports = async (interaction) => {
    const channel = interaction.channel
    if (channel.type === ChannelType.PublicThread) {
        await channel.setLocked(true)
        await channel.delete()
    }
}