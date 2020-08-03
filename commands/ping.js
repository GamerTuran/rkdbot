const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    message.channel.send(`Понг! Пинг бота: ${client.ws.ping}ms.`)
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["commands"],
  permLevel: 0
};

module.exports.help = {
  name: 'ping',
  description: 'Ping',
  usage: 'ping'
};
