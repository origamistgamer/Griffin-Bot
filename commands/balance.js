const profileModel = require('../models/profileSchema');

module.exports = {
    name: "balance",
    description: "Check the user balance",
    async execute(message, args, Discord) {
      
      
      let balmember = message.mentions.users.first() || message.author
      let balmemberID = balmember.id;
      let balData;
         try{
          balData = await profileModel.findOne({ userID: balmemberID})
          if(!balData) return message.channel.send(`${balmember.username} has not started the game!`)
          
          //Below line is for formatting coins and bank coins to have commas with American system
          const formattedCoins = new Intl.NumberFormat('en-US').format(balData.coins);
          const formattedBank = new Intl.NumberFormat('en-US').format(balData.bank);

          const balEmbed = new Discord.MessageEmbed()
            .setTitle(`${balmember.username} \'s Balance`)
            .setDescription(`**Wallet:** ${formattedCoins}\n**Bank:** ${formattedBank}`)
            .setColor('#9A59B5')  
          message.channel.send(balEmbed);
         } catch(err) {
          console.log(err);
        }
         
        
    },
  };