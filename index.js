const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const { Permissions } = require('discord.js');

require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
const date = new Date()
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const debugMode = false;
const resetCommands = false;
const month = date.getMonth() + 1;
const clientId = '934288841383231488'
const guildId = '875382322168479784'

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            //Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.on('ready', () => {
    if (resetCommands) {
        client.application.commands.set([]);
        client.guilds.cache.get(guildId).commands.set([]);
    }
    client.user.setActivity('/help')
    console.log('Bot ready\nCurrent Month: ' + month)
})

client.on('messageCreate', msg => {
    if (msg.content == 'hello world' && debugMode) {
        msg.channel.send(`<@${msg.author.id}> hello, idiot`)
    }
    else if (msg.content.includes(`<@!${clientId}>`)) {
        msg.channel.send('hey!! who pinged me?!')
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    switch (interaction.commandName) {
        case 'help':
            const help = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Commands list')
                .setAuthor({ name: 'MaxBot2011', iconURL: client.user.avatarURL() })
                .setDescription('`help\nkoolkid\ngay\nmrgoatcheese\ncheese\npizza`')
                .setFooter({ 'text': 'Made by MaxPlayer2011' })
            await interaction.reply({ embeds: [help] })
            break;
        case 'koolkid':
            if (interaction.options.getUser('target') == null)
                await interaction.reply(`yea thats right! whos the kool kid? <@${interaction.member.id}>!`)
            else
                await interaction.reply(`yea thats right! whos the kool kid? <@${interaction.options.getUser('target').id}>!`)
            break;
        case 'gay':
            if (date.getMonth() != 5) {
                if (interaction.options.getUser('target') == null)
                    await interaction.reply(`<@${interaction.member.id}> is gay!`)
                else if (interaction.options.getUser('target').toString() == `<@${clientId}>`)
                    await interaction.reply(`hey! dont call me gay, <@${interaction.member.id}>!`)
                else
                    await interaction.reply(`<@${interaction.options.getUser('target').id}> is gay!`)
            }

            else {
                if (interaction.options.getUser('target') == null)
                    await interaction.reply(`happy pride month, <@${interaction.member.id}>!`)
                else
                    await interaction.reply(`happy pride month, <@${interaction.options.getUser('target').id}>!`)
            }
            break;
        case 'mrgoatcheese':
            const mrgoatcheese = new Discord.MessageEmbed()
                .setColor('5acff5')
                .setDescription('hEy There! Sexy.! I am GoatCHeESe\n\nCHEESE CHEESE CHEESE')
            await interaction.reply({ embeds: [mrgoatcheese], files: ['https://www.dropbox.com/s/ib00ll2kbfvnvst/100047-white-goat-png-download-free.png?dl=1'] })
            break;
        case 'cheese':
            await interaction.reply(':cheese: :cheese: :cheese:\n\nmmm, cheese.')
            break;
        case 'pizza':
            await interaction.reply(':pizza: :pizza: :pizza:')
            await interaction.channel.send('OM NOM NOM NOM NOM NOM NOM NOM\nYUMMY!!!')
            break;
        case 'nuke':
            if (!checkIfUserIsAdmin(interaction.member)) {
                await interaction.reply('Sorry, but you do not have permission to do that.')
            }
            else {
                const nukeButtons = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton()
                        .setCustomId('destroy')
                        .setLabel('Yes')
                        .setStyle('DANGER'),
                    new Discord.MessageButton()
                        .setCustomId('staysafe')
                        .setLabel('No')
                        .setStyle('SUCCESS')
                )
                await interaction.reply({
                    content: 'Are you sure you want to nuke this channel?\n**YOU WON\'T BE ABLE TO UNDO THIS!!**\n*Note: Only the last 100 messages that are under 14 days old will be deleted.*',
                    components: [nukeButtons]
                })

                const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

                collector.on('collect', async i => {
                    switch (i.customId) {
                        case 'destroy':
                            try {
                                await interaction.channel.bulkDelete(100)
                                await interaction.channel.send(`Channel nuked by <@${interaction.member.id}>`)
                            } catch (error) {
                                await interaction.deleteReply()
                                await interaction.channel.send('**[ERROR]** Cannot delete messages that are over 14 days old.')
                            }
                            break;
                        case 'staysafe':
                            await interaction.deleteReply()
                            break;
                    }
                });

            }
            break;
    }
})

function checkIfUserIsAdmin(member) {
    if (member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]))
        return true;
    else
        return false;
}

client.login(process.env.BOT_TOKEN)
