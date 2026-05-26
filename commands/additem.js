const itemModel = require("../models/itemSchema");
module.exports = {
  name: "additem",
  admin: true,
  description: "additem to db",
  async execute(message, args, Discord) {

       const itemName = args[0] && args[1];
       const itemID = args[2];
       const itemDescription = "A Fishing Pole"
       const itemCategory = "Fishing";
       const itemBuyprice = args[3];
       const itemSellprice = args[4];
       if(!message.member.hasPermission('ADMINISTRATOR')) return;
       let item = await itemModel.create({
        name: itemName,
        itemID: itemID,
        description: itemDescription,
        category: itemCategory,
        buyPrice: itemBuyprice,
        sellPrice: itemSellprice,
       });
       item.save();
       message.channel.send("Added to DB!")
    }

}