const profileModel = require("../models/profileSchema");
module.exports = {
  name: "beg",
  description: "Beg for coins!",
  async execute(message, args, Discord, profileData) {
    const randomNumber = Math.floor(Math.random() * 500) + 1;
    const response = await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
           coins: randomNumber,
            }
        }
    );
    const formattedBegCoins = new Intl.NumberFormat('en-US').format(randomNumber);
    return message.channel.send(`${message.author.username}, you begged and received ${formattedBegCoins} **coins**`);
  },
};