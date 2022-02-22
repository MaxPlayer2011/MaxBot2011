const wait = require('util').promisify(setTimeout)

import dotenv from 'dotenv'
dotenv.config()

import Discord, { Permissions } from 'discord.js'
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
const date = new Date()
const debugMode = false;
const clientId = '934288841383231488' //Change this to your own bot ID

client.on('ready', () => {
    client.user!.setActivity('$help')
    console.log('Bot ready')
})

client.on('messageCreate', async msg => {
    if (!msg.content.startsWith('$') || msg.author.bot) return;

    const args = msg.content.substring(1).trim().split(/ +/g)
    const command = args.shift()!.toLowerCase()
    const fullArgs = msg.content.substring(command.length + 2)
    switch (command) {
        case 'help':
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Commands list')
                .setAuthor({ name: 'MaxBot2011', iconURL: client.user!.avatarURL()?.toString() })
                .setDescription('`koolkid\ngay\nmrgoatcheese\ncheese\npizza\nnuke\n8ball\nkill\nheck\necho`')
                .setFooter({ 'text': 'Make sure to put a $ before each command!\n\nMade by MaxPlayer2011' })
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
                .setColor('#5acff5')
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
        case 'nuke':
            if (!checkIfUserIsAdmin(msg.member!)) {
                msg.channel.send('Sorry, but you do not have permission to do that.')
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
                const message = await msg.channel.send({
                    content: 'Are you sure you want to nuke this channel?\n**YOU WON\'T BE ABLE TO UNDO THIS!!**\n*Note: Only the last 100 messages that are under 14 days old will be deleted.*',
                    components: [nukeButtons]
                })

                const collector = msg.channel.createMessageComponentCollector({ time: 15000 });

                collector.on('collect', async i => {
                    switch (i.customId) {
                        case 'destroy':
                            try {
                                if (msg.channel.type != 'DM') {
                                    await msg.channel.bulkDelete(100)
                                }
                                msg.channel.send(`Channel nuked by <@${msg.author.id}>`)
                            } catch (error) {
                                message.delete()
                                msg.channel.send(':x: Cannot delete messages that are over 14 days old.')
                            }
                            break;
                        case 'staysafe':
                            message.delete()
                            break;
                    }
                });
            }
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
                .setAuthor({ name: client.user!.username, iconURL: client.user!.avatarURL()?.toString() })
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
                        const message = await msg.channel.send(`\`$ sudo heck ${client.users.cache.get(args[0].slice(3, -1))?.tag}\``)
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
                await msg.guild!.emojis.create(args[0], args[1])
                    .catch(console.error);
                msg.channel.send('Successfully created the emoji!')
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

function checkIfUserIsAdmin(member: Discord.GuildMember) {
    if (member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]))
        return true;
    else
        return false;
}

let previousRandomNumber: number;

function getRandomInt(max: number) {
    let random = Math.floor(Math.random() * max)
    while (random == previousRandomNumber) {
        random = Math.floor(Math.random() * max)
    }
    previousRandomNumber = random;
    return random;
}

client.login(process.env.BOT_TOKEN)
