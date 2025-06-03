const path = require('path')
const fs = require('fs')
const { Events } = require('discord.js')
const command_path = path.join(__dirname, '../../commands')
const command_folder = fs.readdirSync(command_path)

module.exports = {
    name: Events.InteractionCreate,
    run: async (interaction) => {
    if (interaction.isChatInputCommand()) {
        const client = interaction.client
        for (const file of command_folder) {
            const file_path = path.join(command_path, file)
            const file_required = require(file_path)
            if (file_required.data.toJSON().name === interaction.commandName) {
                if ('execute' in file_required) {
                    file_required.execute(interaction, client)
                } else {
                    console.error(`[UBG_BOT]: Missing execute function on the "${interaction.commandName}" command.`)
                }
            }
        }
    }
}
}