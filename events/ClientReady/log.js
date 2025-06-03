const { Events, ActivityType, REST, Routes } = require("discord.js")
const commands = []
const path = require('path')
const fs = require('fs')
const command_path = path.join(__dirname, '../../commands')
const command_folder = fs.readdirSync(command_path)

const rest = new REST({version: '10'}).setToken(process.env.BOT_ID);

module.exports = {
    name: Events.ClientReady,
    run: async (client) => {
        console.log(client.user.tag + " is ready.")
        client.user.setActivity({
            name: "Untitled Button Game",
            type: ActivityType.Playing,
            url: "https://www.roblox.com/games/17474221303/FLING-untitled-button-game"
        })
        try {
            console.log("Refreshing application commands (/)...")
            for (const file of command_folder) {
                const file_path = path.join(command_path, file)
                const require_file = require(file_path)
                commands.push(require_file.data.toJSON())
            }
            rest.put(Routes.applicationCommands("1294621834649538651"), {body: commands})
                .then(console.log("Refresed application commands. (/)"))
        } catch (error) {
            console.log(error)
        }
    }
}