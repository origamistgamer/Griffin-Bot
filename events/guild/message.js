const prefix = 'griff';
const profileModel = require('../../models/profileSchema');

module.exports = async(Discord, client, message) => {
    if(message.author.bot) return; {

                msg = message.content.toLowerCase();
            
                if(msg ==="<@796246278174277634> "+"prefix"|| msg==="<@!796246278174277634> "+"prefix")
                    message.channel.send("My Prefix Is \"`Griff`\"!\nDon\'t forget to add my prefix before my commands!! \nThe Prefix is also case insensitive!");
                } 
        let profileData;
        try{
          profileData = await profileModel.findOne({ userID: message.author.id });
          if(!profileData)
          {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                coins: 1000,
                bank: 0,
                inventory: []
            });
            profile.save();
          }
        }catch(err){
            console.log(err)
        }
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    if (message.content.toLowerCase().startsWith(prefix)) {
            
            const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();
        
            if(command ==='ping') {
        
                client.commands.get('ping').execute(message, args, Discord, client);
                
            }
        
            if(command === 'help') {
        
                client.commands.get('help').execute(message, args, Discord);
        
            }
                
            if(command === 'channel') {
        
                client.commands.get('channel').execute(message, args, Discord);
        
            }
        
            if(command === 'balance') {
        
                client.commands.get('balance').execute(message, args, Discord);
         
            }
            if(command === 'beg') {
        
                client.commands.get('beg').execute(message, args, Discord, profileData);
         
            }
            if(command === 'deposit') {
        
                client.commands.get('deposit').execute(message, args, Discord, profileData);
         
            }
            if(command === 'withdraw') {
        
                client.commands.get('withdraw').execute(message, args, Discord, profileData);
         
            }
            if(command === 'reward') {
        
                client.commands.get('reward').execute(message, args, Discord, profileData);
         
            }
            if(command === 'additem') {
        
                client.commands.get('additem').execute(message, args, Discord);
         
            }
            if(command === 'buy') {
        
                client.commands.get('buy').execute(message, args, Discord, profileData);
         
            }
            if(command === 'meme') {
        
                client.commands.get('meme').execute(message, args, Discord);
         
            }
        }
}       
