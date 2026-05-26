const profileModel = require("../models/profileSchema");
module.exports = {
  name: "deposit",
  description: "Deposit coins into your bank!",
  async execute(message, args, Discord, profileData) {
    const amount = args[0];
    if (amount % 1 != 0 || amount <= 0) return message.channel.send("Deposit amount must be a whole number");
    try {
      if (amount > profileData.coins) return message.channel.send(`You don't have that amount of coins to deposit`);
      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: -amount,
            bank: amount,
          }
        }
      );
      //Below line is for formatting number to have commas with american system
      const formattedAmt = new Intl.NumberFormat('en-US').format(amount);
      return message.channel.send(`**${formattedAmt}** coins deposited to your bank!`);
    } catch (err) {
      console.log(err);
    }
  },
};