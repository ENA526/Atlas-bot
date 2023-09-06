const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
API_KEY = 'RGAPI-7a75725c-d454-4540-b46e-af59ef78399e'
module.exports = {
	data: new SlashCommandBuilder()
		.setName('lol_match')
		.setDescription('Get LOL match data')
		.addStringOption(option => 
			option
			.setName("user_name")
			.setDescription("LOL User Name")
			.setRequired(true)),

	async execute(interaction) {
		const userName = interaction.options.getString('user_name');
		const userData = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userName}`, {headers: {'X-Riot-Token': API_KEY}});
		const puuid = userData.data.puuid;
		const matchData = await axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`, {headers: {'X-Riot-Token': API_KEY}, params: {'type': 'ranked'}});
		const { EmbedBuilder } = require('discord.js');
		
		const exampleEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(`Match history of ${userName}`)
			.setTimestamp()
			
			str = matchData.data.join([separator = '\n'])
			exampleEmbed.addFields({ name: '** **', value: str})
		//const channel = interaction.client.channels.cache.get(interaction.channelId)
		interaction.reply({ embeds: [exampleEmbed] });
	},
};