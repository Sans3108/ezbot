const { brawlStars, db, Discord } = require("../functions/requirePackages.js");

module.exports = {
	name: 'addclub',
	description: 'Adds a Club to the database.',
  aliases: ['ac', 'newclub', 'pushclub', 'clubadd'],
	usage: '[Club name] [Club tag] [Role ID]',
	cooldown: 3,
	guildOnly: true, 
	args: true,
  bannedGuilds: [],
  allowedGuilds: [],
	execute(message, args, bot, color) {
		const perms = ["MANAGE_GUILD"];
    const embed1 = new Discord.RichEmbed()
			.setColor(color.red)
      .addField("ERROR: Insufficient permissions", "You don't have permission to run this command!");
		if (!message.member.hasPermission(perms)) return message.channel.send(embed1);

		const embed2 = new Discord.RichEmbed()
			.setColor(color.red)
			.addField("ERROR: Invalid arguments provided", "You provided incorrect arguments!")
      .addField("Proper usage:", `\`/addclub [Club name] [Club tag] [Role ID]\``);

		if (!args[2] || args[2].startsWith("#") || !isNaN(args[0][0])) return message.channel.send(embed2);
		const embed3 = new Discord.RichEmbed()
			.setColor(color.green)
      .setAuthor(message.member.displayName, message.author.displayAvatarURL)
      .addField("**Success! Club added!**", `Added Club ${args[0]} to role ID ${args[2]}!`);

    async function getClub() {
      let tag = args[1];
      if (!tag.startsWith("#")) tag = "#" + tag;
      return brawlStars.getClub(tag);
    };
    
    let clubName = args[0].charAt(0).toUpperCase() + name.slice(1);
		db.push("clubList", [clubName, args[1], args[2]], getClub());
		message.channel.send(embed3);
	}
};