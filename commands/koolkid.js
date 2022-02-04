const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('koolkid')
        .setDescription('are u a kool kid?')
        .addUserOption(option => option.setName('target').setDescription('Select a user'))
}
