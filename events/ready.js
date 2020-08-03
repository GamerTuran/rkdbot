const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const config = require("../config.json");
var prefix = config.prefix;

module.exports = client => {
  setInterval(function() {}, 8000);
  client.user.setPresence({
    game: {
      name: `+vcsetup`,
      type: "WATCHING"
    },
    status: "online"
  });
  console.log(`Onlineeeeeeeee`);
};
