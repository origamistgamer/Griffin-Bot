const profileModel = require("../models/profileSchema");
module.exports = {
  name: "reward",
  admin: true,
  description: "Reward a player with some coins",
  async execute(message, args, Discord, profileData) {
    if (message.member.id != "661573969148903465") return message.channel.send(`Sorry only **Origamist** can run this command`);
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You do not have perms to use this command!");
    if (!args.length) return message.channel.send("You need to mention a player to give them coins");
    const amount = args[1];
    const target = message.mentions.users.first();
    if (!target) return message.channel.send("That user does not exist");

    if (amount % 1 != 0 || amount <= 0) return message.channel.send("Reward amount should be a whole number!");

    try {
      const targetData = await profileModel.findOne({ userID: target.id });
      if (!targetData) return message.channel.send(`This user has not started the game`);

      await profileModel.findOneAndUpdate(
        {
          userID: target.id,
        },
        {
          $inc: {
            coins: amount,
          }  
        }
      );

      const formattedReward = new Intl.NumberFormat('en-US').format(amount);

      return message.channel.send(`This player has been rewarded with **${formattedReward}** coins!`);
    } catch (err) {
      console.log(err);
    }
  },
};