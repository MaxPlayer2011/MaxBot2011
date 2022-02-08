const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('use the magik 8 ball')
        .addStringOption(option =>
            option
                .setName('input')
                .setDescription('ur question')
                .setRequired(true))
}
