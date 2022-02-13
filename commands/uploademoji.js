const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uploademoji')
        .setDescription('Upload an animated or regular emoji!')
        .addStringOption(option =>
            option
                .setName('url')
                .setDescription('The full URL to the emoji')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('The name of the emoji')
                .setRequired(true))
}
