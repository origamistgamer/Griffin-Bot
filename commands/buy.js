const profileModel = require("../models/profileSchema");
const itemsModel = require("../models/itemSchema")
module.exports = {
  name: "buy",
  description: "Buy Items!",
  async execute(message, args, Discord, profileData) {

      const buyID = args[0];
      const buyIDToInt = parseInt(buyID);
      const validID = await itemsModel.findOne({ itemID: buyID});
      if(!validID) return message.reply("You have not used a correct item id!");
      if(validID.buyPrice > profileData.coins) return message.reply("You do not have enough money to buy this item!");
      
      const qtyCheck = await profileModel.findOne(
        {
          userID: message.author.id,
          "inventory.itemID" : 1, //there is a mistake in this line i must clarify this soon, cant find docs
        }
      );

      if(!qtyCheck)
      {
        await profileModel.findOneAndUpdate(
        {
         userID: message.author.id
        },
        {
          $push: {
              inventory: validID
          },
          $inc: {
            coins: -validID.buyPrice
          }
        });
      } else
        {
          /*const specificItemInArray = await profileModel.findOne(
           
              {
                userID: message.author.id,
                  inventory : { $in:  validID },
                  
              }, 
              {
                "inventory.$": 1
              }
           );*/
            await profileModel.updateOne(
           
           
            {
              userID: message.author.id,
              "inventory.itemID" : buyIDToInt,
            }, 
                
            
            {
              $inc: {
                "inventory.$.qty" : 1,
              } 
            }
            
          );    
             /*{
              $inc: {
                "inventory[0].qty" : 1,
              } 
            }*/
            console.log(qtyCheck);
        } 
      return message.channel.send(`${message.author.username} has successfully bought a ${validID.name}!`)


  }
}