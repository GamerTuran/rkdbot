const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');//lordcreative
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const express = require('express');
const app = express();
const no = '<a:gifx:724203875921428520>'
const yes = '<a:gifgalka:717284803577118791>'
var server = require('http').createServer(app);
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
setInterval(() => {
  http.get(`https://voicemasterus.glitch.me/`);
}, 18000);

var prefix = config.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./commands/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./commands/${command}`)];
            let cmd = require(`./commands/${command}`);
            client.commands.delete(command);//lordcreative
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./commands/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./commands/${command}`)];
            let cmd = require(`./commands/${command}`);
            client.commands.delete(command);//lordcreative
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === config.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;//lordcreative
// client.on('debug', e => {
//   l0RDconsole.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// }); //DEVİLHOUSE//

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(config.token);

//---------------------------------commands---------------------------------\\
//----------------------------------GEÇİCİ KANAL----------------------------// 
client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('Приват 2x「➕」')) {
        newMember.guild.createChannel(`${newMember.displayName} 「👤」`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(2)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith(`${newMember.displayName}`)) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            
        }
    }
});
 
//3x\\
client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('Приват 3x「➕」')) {
        newMember.guild.createChannel(`${newMember.displayName} 「👤」`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(3)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith(`${newMember.displayName}`)) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            
        }
    }
});
//4x\\
client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('Приват 4x「➕」')) {
        newMember.guild.createChannel(`${newMember.displayName} 「👤」`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(4)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith(`${newMember.displayName}`)) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            
        }
    }
});
//----------------------------------GEÇİCİ KANAL----------------------------// 
//----------------------------------Özel oda sistemi----------------------------// 
client.on('message', async message => {
  const ms = require('ms');
  const prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || config.prefix
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "vcsetup") {
  if (!message.member.hasPermission('MANAGE_CHANNELS'))
  return message.channel.send("У вас должно быть право **Управлять каналом**, чтобы использовать эту команду.");
    message.channel.send(`Напишите **Уверен**, чтобы начать работу.`)
      message.channel.awaitMessages(response => response.content === 'Уверен', {
        max: 1,
        time: 10000,
        errors: ['time'],
     })
    .then((collected) => {

message.guild.createChannel('「➕」Приваты', 'category', [{
  id: message.guild.id,
}]);

message.guild.createChannel(`Приват 2x「➕」`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「➕」Приваты")))


message.guild.createChannel(`Приват 3x「➕」`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「➕」Приваты")))

message.guild.createChannel(`Приват 4x「➕」`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「➕」Приваты")))

       message.channel.send("Настройка прошла успешно")
            })   
      
}
});
//----------------------------------Özel oda sistemi Son----------------------------// 
