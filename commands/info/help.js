const {default_prefix} = require('../../config.json');
const Discord = require('discord.js')
//const colors = require('../colors.json')
const client = require('../../index.js')
const {
	Collection
} = require('discord.js')

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	category: 'info',
	usage: 'help [command]',
	cooldown: 5,
  run: async (client, message, args) => {
		const data = [];

		let categories = new Discord.Collection()

		if (!args.length) {
			message.client.commands.forEach(command => {
				const category = categories.get(command.category)
				if (category) {
					category.set(command.name, command)
				} else {
					categories.set(command.category, new Collection().set(command.name, command))
				}
			})

			const lines = categories.map((category, name) => `**${name}**: \n\`${category.map(command => command.name).join('`, `')}\``)

			let noArgEmbed = new Discord.MessageEmbed()
				.setThumbnail(message.guild.iconURL({dynamic: true}))
				.setDescription(`Want to know more about a command? \nDo \`${default_prefix}help <command>\`for more info! join RZ Group Server \`\n\n\`\`\`\n[] - Optional\n<> - Required\n\`\`\``)
				.addField("Commands: ", lines.join('\n'))
				.setColor("RANDOM")
				.setAuthor(message.author.tag, message.author.avatarURL({
					dynamic: true
				}))
				.setFooter(`© RaeiZers 2021 | RZ Group | Version:4.8 | Total commands : ${client.commands.size}`)
				.setTitle(`${message.client.user.username} Bot Help`)

			return message.channel.send(noArgEmbed)
				.catch(error => {
					console.error(`Could not send help to ${message.author.tag}.\n`, error);
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(", ")}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** \`${default_prefix}${command.usage}\``);
		if (command.example) data.push(`**Example:** \`${default_prefix}${command.example}\``)
		if (command.required) data.push(`**Required Permission:**\`${command.required}\``)

		let helpEmbed = new Discord.MessageEmbed()
			.setTitle(":books: Command Help")
			.setDescription(data)
			.setColor("RANDOM")
			.setFooter(message.client.user.username, message.client.user.avatarURL())
		message.channel.send(helpEmbed)
	},
};