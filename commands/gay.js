const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gay')
        .setDescription('are u gay?')
        .addUserOption(option => option.setName('target').setDescription('Select a user'))
}
