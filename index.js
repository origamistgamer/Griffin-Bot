const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = 'Griff';

const mongoose = require('mongoose');

const MONGO_SRV = "mongodb+srv://OrigamistAj:Origami6002@epicrpghelperbot.mp9mf.mongodb.net/EpicRpgHelperDB";

const got = require('got');

const fs = require('fs');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});



mongoose.connect(MONGO_SRV,{
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false

}).then(() => {
    console.log("Connected to Database!")
}).catch((err) => {
    console.log(err);
});



client.once('ready', () => {
    console.log("Griffin is Ready to Pounce!"); 

    client.user.setActivity("Griff help");

});

//client.on("message", (message) => {

//    if(message.author.bot) return; {

//        msg = message.content.toLowerCase();
    
//        if(msg ==="<@796246278174277634> "+"prefix"|| msg==="<@!796246278174277634> "+"prefix")
//            message.channel.send("My Prefix Is \"`EH`\"!\nDon\'t forget to add my prefix before my commands!!");
//        }


//    if (message.content.startsWith(prefix) || message.content.startsWith('Eh') || message.content.startsWith('eH') || message.content.startsWith('eh')) {
    
//        const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/);
//        const command = args.shift().toLowerCase();

//        if(command ==='ping') {

//           client.commands.get('ping').execute(message, args, Discord, client);
        
//        }

//        if(command === 'help') {

//           client.commands.get('help').execute(message, args, Discord);

//        }
        
//        if(command === 'channel') {

//           client.commands.get('channel').execute(message, args, Discord);

//        }

//        if(command === '') {

//           client.commands.get('').execute(message, args, Discord);
 
//        }

//    }

//});






client.login('Nzk2MjQ2Mjc4MTc0Mjc3NjM0.X_VIIg.hxX_f_BHPboc7ZbW9uXFDALethg');



//EpicRpgHelperDB

