const profileModel = require("../models/profileSchema");
module.exports = {
  name: "withdraw",
  description: "Withdraw coins from your bank",
  async execute(message, args, Discord, profileData) {
    let amount = args[0];
    if (amount % 1 != 0 || amount <= 0) return message.channel.send("Withdrawn amount must be a whole number");

    try {
      if (amount > profileData.bank) return message.channel.send(`You don't have that amount of coins to withdraw`);

      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: amount,
            bank: -amount,
            }
        }
      );
     //Below line is for formatting number to have commas with american system
      const formattedAmt = new Intl.NumberFormat('en-US').format(amount);
      return message.channel.send(`**${formattedAmt}** coins withdrawn to your wallet!`);
    } catch (err) {
      console.log(err);
    }
  },
};