const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const { Permissions } = require('discord.js');
const wait = require('util').promisify(setTimeout);

require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
const date = new Date()
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const debugMode = false;
const resetCommands = false; //Set this to true if you want to unregister the global and guild commands
const clientId = '934288841383231488' //Change this to your own bot ID
const guildId = '875382322168479784' //Change this to the guild ID where you want the bot to be tested in
const helpEmbed = new Discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle('Commands list')
    .setDescription(
        '**Commands**\n`help\nuploademoji`\n\n' +
        '**Slash Commands**\n`nuke`\n\n' +
        '**Prefix Commands**\n`koolkid\ngay\nmrgoatcheese\ncheese\npizza\n8ball\nkill\nheck\necho`'
    )
    .setFooter({ 'text': 'Made by MaxPlayer2011' })

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            // MUST READ
            // https://discordjs.guide/interactions/registering-slash-commands.html#global-commands

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
    helpEmbed.setAuthor({ name: 'MaxBot2011', iconURL: client.user.avatarURL() })
    client.user.setActivity('$help')
    console.log('Bot ready')
})

client.on('messageCreate', async msg => {
    if (!msg.content.startsWith('$') || msg.author.bot) return;

    const args = msg.content.substring(1).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const fullArgs = msg.content.substring(command.length + 2)
    switch (command) {
        case 'help':
            msg.channel.send({ embeds: [helpEmbed] })
            break;
        case 'koolkid':
            if (args[0] == null)
                msg.channel.send(`yea thats right! whos the kool kid? <@${msg.author.id}>!`)
            else
                msg.channel.send(`yea thats right! whos the kool kid? ${args[0]}!`)
            break;
        case 'gay':
            if (date.getMonth() != 5) {
                if (args[0] == null)
                    msg.channel.send(`<@${msg.author.id}> is gay!`)
                else if (args[1] == `<@${clientId}>`)
                    msg.channel.send(`hey! dont call me gay, <@${msg.author.id}>!`)
                else
                    msg.channel.send(args[0] + ' is gay!')
            }

            else {
                if (args[0] == null)
                    msg.channel.send(`happy pride month, <@${msg.author.id}>!`)
                else
                    msg.channel.send(`happy pride month, ${args[0]}!`)
            }
            break;
        case 'mrgoatcheese':
            const mrgoatcheese = new Discord.MessageEmbed()
                .setColor('5acff5')
                .setDescription('hEy There! Sexy.! I am GoatCHeESe\n\nCHEESE CHEESE CHEESE')
            msg.channel.send({ embeds: [mrgoatcheese], files: ['http://dev.gamez-productions.com/discord/maxbot2011/mrgoatcheese.png'] })
            break;
        case 'cheese':
            msg.channel.send(':cheese: :cheese: :cheese:\n\nmmm, cheese.')
            break;
        case 'pizza':
            msg.channel.send(':pizza: :pizza: :pizza:')
            msg.channel.send('OM NOM NOM NOM NOM NOM NOM NOM\nYUMMY!!!')
            break;
        case '8ball':
            const eightballreplies = [
                'yes',
                'no',
                'bro stop just no',
                'maybe',
                'isn\'t it obvious?',
                'idk maybe yes',
                'leave me alone\n\nfine fine, no'
            ]
            const eightballembed = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle(fullArgs)
                .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() })
                .setDescription(eightballreplies[getRandomInt(eightballreplies.length)])
                .setFooter({ text: 'Made by MaxPlayer2011' })
            msg.channel.send({ embeds: [eightballembed] })
            break;
        case 'kill':
            if (args[0] == null) return;

            const murderer = `<@!${msg.author.id}>`;
            const target = args[0];
            const murderMessages = [
                `${murderer} has murdered ${target}.`,
                `${target} just got screwed by ${murderer}.`,
                `**R.I.P.**\n${target}\n\nWe will always remember him, except ${murderer}, ofc.`,
                `${target} just got stabbed by ${murderer}.`
            ]
            switch (target) {
                case `<@!${clientId}>`:
                    msg.channel.send(`hey! don\'t murder me, ${murderer}!!`)
                    break;
                case murderer:
                    msg.channel.send(`${murderer} has killed himself. what an idiot.`)
                    break;
                default:
                    msg.channel.send(murderMessages[getRandomInt(murderMessages.length)])
                    break;
            }
            break;
        case 'heck':
            switch (args[0]) {
                case `<@!${clientId}>`:
                    msg.channel.send('**YOU CAN\'T HECK ME BUHAHAHAHA!!!**')
                    break;
                case `<@!${msg.author.id}>`:
                    msg.channel.send('LMAO u can\'t heck urself :joy:')
                    break;
                default:
                    const emails = [
                        'i.likecheese@yahoo.com',
                        'mrs.chisis@hotmail.com',
                        'mrasshole@gmail.com',
                        'vladimir.from.beluga@yandex.ru'
                    ]
                    const passwords = [
                        '123aBc!',
                        '(╯°□°）╯︵ ┻━┻',
                        '┬─┬ ノ( ゜-゜ノ)',
                        'morgzISdaBEST',
                        'totally_secure_password'
                    ]
                    const cringeMessages = [
                        'hEy GiRl! !',
                        'pickle',
                        'i eat eyeballz',
                        'i have diarrea every 5 mins help me :pray:'
                    ]
                    try {
                        const message = await msg.channel.send(`\`$ sudo heck ${client.users.cache.get(args[0].slice(3, -1)).tag}\``)
                        await wait(1000)
                        await message.edit('Starting hecking...')
                        await wait(3000)
                        await message.edit('**3%** Stealing Discord credentials...')
                        await wait(3000)
                        await message.edit(
                            `**9%** Found credentials:\n\`Email: ${emails[getRandomInt(emails.length)]}\nPassword: ${passwords[getRandomInt(passwords.length)]}\``
                        )
                        await wait(3000)
                        await message.edit('**16%** Hacking bank account...')
                        await wait(3000)
                        await message.edit('**22%** Finding most common string...')
                        await wait(3000)
                        await message.edit(`**32%** Found most common string:\n"${cringeMessages[getRandomInt(cringeMessages.length)]}"`)
                        await wait(3000)
                        await message.edit('**48%** Sending mean messages to all of his DMs...')
                        await wait(3000)
                        await message.edit('**64%** Obtaining birthdate...')
                        await wait(3000)
                        await message.edit(`**72%** Found birthdate:\n${date.getMonth() + 1}/${date.getDate() - 1}/${date.getFullYear()}`)
                        await wait(3000)
                        await message.edit('**87%** Deleting Roblox account with 64.66B+ Robux...')
                        await wait(3000)
                        await message.edit('**99%** Finishing up...')
                        await wait(3000)
                        await message.edit('**100%** The *totally* real heck is complete')
                        break;
                    } catch (error) {
                        msg.channel.send(':x: An error has occured.')
                    }
                    break;
            }
            break;
        case 'uploademoji':
            if (args[0] != null && args[1] != null) {
                msg.guild.emojis.create(args[0], args[1])
                    .then(msg.channel.send('Successfully created the emoji!'))
                    .catch(console.error);
            }
            break;
        case 'echo':
            if (args[0] != null) {
                msg.channel.send(fullArgs)
            }
            break;
        default:
            msg.channel.send(':x: Unknown command.')
            break;
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    switch (interaction.commandName) {
        case 'help':
            await interaction.reply({ embeds: [helpEmbed] })
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
                                await interaction.followUp({ content: ':x: Cannot delete messages that are over 14 days old.', ephemeral: true })
                            }
                            break;
                        case 'staysafe':
                            await interaction.deleteReply()
                            break;
                    }
                });
            }
            break;
        case 'uploademoji':
            await interaction.guild.emojis.create(interaction.options.getString('url'), interaction.options.getString('name'))
                .then(interaction.reply({
                    content: `Successfully created the emoji!`,
                    ephemeral: true
                }))
                .catch(console.error);
            break;
    }
})

function checkIfUserIsAdmin(member) {
    if (member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]))
        return true;
    else
        return false;
}

let previousRandomNumber;

function getRandomInt(max) {
    let random = Math.floor(Math.random() * max)
    while (random == previousRandomNumber) {
        random = Math.floor(Math.random() * max)
    }
    previousRandomNumber = random;
    return random;
}

client.login(process.env.BOT_TOKEN)
