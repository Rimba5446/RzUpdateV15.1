const Djs = require('discord.js');

module.exports = {
    name: "eid",
    aliases: ["eid"],
    category: "info",
    description: "Eid Days",
    run: async (client, message, args) => {
let embed = new Djs.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor("RaykujanK13")
      .setDescription(`Eid days are meant to celebrate the goals, and the achievements that makes you happiest. 
      The ideals you believe in, the dream you. Love the best. Happy Eid Mubarak to you!
`)
      .setFooter(`© RZ Group 2021`);             
     message.channel.send(embed);
    }
}