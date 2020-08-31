const Bot = require('./Bot')
const client = new Oxide();
const Discord = require('discord.js')

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`some.link`);
}, 280000);

const fs = require("fs");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    return console.log("[LOGS] Couldn't Find Commands!");
  }
  
  jsfile.forEach((f, i) => {
    let pull = require(`./commands/${f}`);
    client.commands.set(pull.config.name, pull);
    pull.config.aliases.forEach(alias => {
      client.aliases.set(alias, pull.config.name);
    });
  });
});


client.on('ready', async () => {
  console.log('Online!')
})

client.on('message', async (message) => {
  if (message.author.bot || message.channel.type === "dm") return;
  if (message.content.includes(":kek:")) {
    client.db.add(`kek_${message.author.id}`, 1)
  }
} 

   let prefix = "prefix";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (!message.content.startsWith(prefix)) return;
  let commandfile =
    client.commands.get(cmd.slice(prefix.length)) ||
    client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
  if (commandfile) commandfile.run(client, message, args);  
})
client.login(process.env.TOKEN)
