const path = require('path')
const fs = require('fs')
const menu_path = path.join(__dirname, '../../menus')
const menu_folder = fs.readdirSync(menu_path)
const {StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, Events} = require('discord.js')

module.exports = {
    name: Events.InteractionCreate,
    run: async (interaction) => {
    if (interaction.isStringSelectMenu()) {
        if (interaction.guild.id === "1295742821281566760") {
            interaction.reply({
                content: "Nuh uh.",
                ephemeral: true
            })
            return
        }
        const interaction_value = interaction.values.pop()
        for (const file of menu_folder) {
            const file_path = path.join(menu_path, file)
            const formatted = (file_path.split(/(\\|\/)/g).pop()).split(".js").at(0)
            const required_file = require(file_path)
            if (formatted === interaction_value) {
                required_file(interaction)
            }
        }
    }
}
}