const path = require('path')
const fs = require('fs')
const { Events } = require('discord.js')
const modal_path = path.join(__dirname, '../../modals')
const modal_folder = fs.readdirSync(modal_path)

module.exports = {
    name: Events.InteractionCreate,
    run: async (interaction) => {
    if (interaction.isModalSubmit()) {
        for (const file of modal_folder) {
            const file_path = path.join(modal_path, file)
            const file_name_fake = file_path.split(/(\\|\/)/g).pop()
            const file_name = file_name_fake.split(".js").at(0)
            if (interaction.customId === file_name) {
                const required_file = require(file_path)
                required_file(interaction)
            }
        }
    }
}
}