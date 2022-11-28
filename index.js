const { EmbedBuilder, Client, GatewayIntentBits, Collection, Intents, RichEmbed, ActivityType, Activity, WebhookClient } = require('discord.js');
const { token, webhookID, webhookToken, channelID } = require('./config.json');
const { timeStamp } = require('console');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const webhookClient = new WebhookClient({ id: webhookID, token: webhookToken });
client.once('ready', () => {
  console.log('Running!');
  client.user.setPresence({
    activities: [{ name: 'For Webhooks', type: ActivityType.Watching }],
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
        if (a.image.url == null) {
          image = "https://cdn.discordapp.com/attachments/1036010787644395623/1041808066397601853/unknown.png";
        } else {
          image = a.image.url;
        }
        desc = a.description;
        product = fields[0].value;
        original = fields[1].value;
        paid = fields[2].value;
        discount = fields[3].value;
      })
      const embed = new EmbedBuilder(timeStamp)
        .setTitle(':tada: Successful Freebie Checkout!')
        .setDescription(desc) //change to item name
        .setImage(image)
        .addFields(
          { name: 'Product', value: product },
          { name: 'Original Price', value: original, inline: true },
          { name: 'Price Paid', value: paid, inline: true },
          { name: 'Discount', value: discount, inline: true }
        )
        .setColor(0x000000)
        .setTimestamp()
        .setFooter({ text: 'OS Aco', iconUrl: 'https://cdn.discordapp.com/attachments/1036010787644395623/1041808066397601853/unknown.png' });

      webhookClient.send({
        username: 'Profit Lounge Freebies',
        avatarURL: 'https://cdn.discordapp.com/attachments/1036010787644395623/1041808066397601853/unknown.png',
        embeds: [embed],
      });
    }
  }
});
client.login(token);
