const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
let data =  client.db.all().filter(data => data.ID.startsWith("kek_")).sort((a,b) => b.data - a.data);
    data.length = 12;
      let embed = new Discord.MessageEmbed()
        .setTitle("The KEK Leaderboard")
        .setColor("BLURPLE")
        .setTimestamp();
      data.forEach(d => {
        embed.addField(`${data.indexOf(d) + 1}. ` + ( client.users.cache.get(d.ID.split("_")[1]) ?  client.users.cache.get(d.ID.split("_")[1]).tag : "Unknown User#0000"), `Times Sent: ${d.data}`, true)
      })
      return message.channel.send(embed);
}


module.exports.config = {
    name: "leaderboard",
    description: "lb",
    usage: "leaderboard",
    accessableby: "Members",
    aliases: ["keklb", "lbkek"]
}
