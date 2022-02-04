const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pizza')
        .setDescription('ME WANT PIZZA')
}
