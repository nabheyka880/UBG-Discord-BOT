const {Client, GatewayIntentBits, REST, Routes, Partials, Events} = require('discord.js')
const path = require('path')
const fs = require('fs')
const event_path = path.join(__dirname, 'events')
const events_files = fs.readdirSync(event_path)
require('dotenv').config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.AutoModerationExecution,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.DirectMessagePolls,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildIntegrations
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.Reaction
    ]
})

const rest = new REST({version: '10'}).setToken(process.env.BOT_ID);

for (const files of events_files) {
    const ev_Path = path.join(event_path, files)
    const stringed = ev_Path.split(/(\\|\/)/g).pop()
    const file_thing = fs.readdirSync(ev_Path)
    for (const file_function of file_thing) {
        const file_function_path = path.join(ev_Path, file_function)
        const file_require = require(file_function_path)
        client.on(file_require.name, (...args) => file_require.run(...args, client));
    }
}

client.login(process.env.BOT_ID)