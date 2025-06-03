const { Events } = require('discord.js')
const fs = require('fs')
const path = require('path')
const button_path = path.join(__dirname, "../../buttons")
const button_folder = fs.readdirSync(button_path)

module.exports = {
    name: Events.InteractionCreate,
    run: async (interaction) => {
    if (interaction.isButton()) {
        for (const file of button_folder) {
            const file_path = path.join(button_path, file)
            const stringed = (file_path.split(/(\\|\/)/g).pop()).split(".js").at(0)
            if (stringed === interaction.customId) {
                const required_file = require(file_path)
                required_file(interaction)
            }
        }
    }
}
}