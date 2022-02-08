const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('heck')
        .setDescription('hecker can do it, so why cant we?')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('the person you want to heck')
                .setRequired(true))
}
