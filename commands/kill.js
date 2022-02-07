const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kill')
        .setDescription('murder someone')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('Select a user')
                .setRequired(true))
}
