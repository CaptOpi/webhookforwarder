const fs = require('fs');
const { EmbedBuilder, Client, GatewayIntentBits, Collection, Intents, RichEmbed, ActivityType, Activity, WebhookClient } = require('discord.js');
const { token, webhookID, webhookToken, channelID, testID, testToken} = require('./config.json');
const { timeStamp } = require('console');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
    ],
});

const webhookClient = new WebhookClient({ id: testID, token: testToken});
const webhookClients = new WebhookClient({ id: webhookID, token: webhookToken});
client.once('ready', () => {
	console.log('Ready!');
	client.user.setPresence({
        activities: [{ name: 'For Webhooks', type: ActivityType.Watching}],
        status: 'dnd',
    })
});
client.on('messageCreate', (message) => {
    if (message.channelId === channelID) {
                let fields;
                let desc;
                let asin;
                let original;
                let paid;
                let discount;
                let image;
        if (message.webhookId) {
            message.embeds.forEach((a) => {
                fields = a.fields;
                image = a.image;
                if(image == null) {
                    image = "https://i.pinimg.com/564x/cf/37/c7/cf37c7042c76f162fad963d9b0f99304.jpg";
                }
                desc = a.description;
                asin = fields[0].value;
                original = fields[1].value;
                paid = fields[2].value;
                discount = fields[3].value;
            })
            const embed = new EmbedBuilder(timeStamp)
                .setTitle(':tada: Successful Freebie Checkout!')
                .setDescription(`[${desc}](https://amazon.com/dp/${asin})`) //change to item name
                .setImage(image)
                .addFields(
                    { name: 'ASIN', value: asin}, 
                    { name: 'Original Price', value: original, inline: true},
                    { name: 'Price Paid',value: paid, inline: true},
                    { name: 'Discount',value: discount, inline: true}
                )
                .setColor(0x000000)
                .setTimestamp()
                .setFooter({ text: 'OS Aco', iconUrl: 'https://i.pinimg.com/564x/cf/37/c7/cf37c7042c76f162fad963d9b0f99304.jpg'});
    
            webhookClients.send({
                username: 'Profit Lounge Freebies',
                avatarURL: 'https://i.pinimg.com/564x/cf/37/c7/cf37c7042c76f162fad963d9b0f99304.jpg',
                embeds: [embed],
            });
        }
    }
});
client.login(token);