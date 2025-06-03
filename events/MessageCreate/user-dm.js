const { ChannelType, Events } = require("discord.js")
const { OpenAI } = require('openai')
require('dotenv').config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
})

module.exports = {
    name: Events.MessageCreate,
    run: async (message) => {
    if (message.author.bot) return
    if (message.inGuild() === null || message.inGuild() === false) {
        /* message.client.channels.fetch(message.channelId)
            .then(channel => channel.send("hi"))*/
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'user',
                    content: "say this is a test"
                }
            ]
        })
        .catch((error) => console.error("open ai error: " + error))
        message.client.channels.fetch(message.channelId)
            .then(channel => console.log(response))
    }
}
}