//const channelcreaterole = [];
module.exports = {
    name:'channel',
    description: "Create channel, lock shannel, show channel (Read Messages permission)",
    execute(message, args, Discord) {
       
      let channelName = args.slice(2).join(' ');
      let owner = message.mentions.members.first();
      
     /* let rolesofchannelcreate = message.mentions.roles
      rolesofchannelcreate.forEach(role => channelcreaterole.push(role.name));
      if(args[0] === 'creater' && args[1] === 'perms')
      {
        if(message.guild.id === '811931650564292630') return message.channel.send("This command is disabled in this server!");
        message.channel.send("These are the roles you have chosen which can create channels: "+channelcreaterole);
      }*/
      if(args[0] === 'create') { /*['Soul Of The Server','Moderator']*/
        if(message.guild.id === '811931650564292630') return message.channel.send("This command is disabled in this server!");
        if(!args[1] && !args[2]) return message.channel.send("You did not mention a person for owner of channel and the name of the channel ")
          if(message.member.roles.cache.some(role => ['Soul Of The Server','Moderator']/*channelcreaterole*/.includes(role.name))) { 
            
             message.guild.channels.create(channelName, {

              type: "text",
              parent: '839739331139731459',
              permissionOverwrites: [
                {
                  id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead 
                  deny: ['VIEW_CHANNEL'] 
                },
                {
                    id: message.guild.roles.cache.find(role => role.name === "Members"),
                    allow: ['VIEW_CHANNEL','READ_MESSAGE_HISTORY'], 
                },
                {
                  id: owner,
                  allow: ['VIEW_CHANNEL','MANAGE_CHANNELS','SEND_MESSAGES']
                }
             ],

          })
          .catch(console.error);
          message.reply(`I have created your channel!!,Type \"#${channelName}\" to teleport to it !!`);
           
        } else
          message.reply("You do not have the perms to create a channel!")
      } 
     
      let MemberRole = message.guild.roles.cache.find(role => role.name === "Members");
       if(args[0] === 'lock') {
          if(message.channel.permissionsFor(message.author).has('MANAGE_CHANNELS', true)) {
            if(message.channel.permissionsFor(MemberRole).has('SEND_MESSAGES', null)) {
              message.channel.updateOverwrite(MemberRole, {
                SEND_MESSAGES: false
              }) 
              .catch(console.error);
              
            const lockchannelmsg = new Discord.MessageEmbed()
              .setColor('#43B581')
              .setTitle("Channel Locked :lock:")
              .setDescription(":white_check_mark: Your channel has been locked!")
            message.channel.send(lockchannelmsg);
            } else {
              const alrLockChannelmsg = new Discord.MessageEmbed()
              .setColor('#FF0000')
              .setDescription(":x: Bruh...your channel is already locked! :lock:")
            message.channel.send(alrLockChannelmsg);
            }
          } else 
            message.reply("You do not own this channel or you do not have enough perms!");
          
        } 
        
      if(args[0] === 'unlock') {
        if(message.channel.permissionsFor(message.author).has('MANAGE_CHANNELS', true)) {
          if(!message.channel.permissionsFor(MemberRole).has('SEND_MESSAGES', null)) {
            message.channel.updateOverwrite(MemberRole, {
              SEND_MESSAGES: null
            }) 
            .catch(console.error);
            const unlockchannelmsg = new Discord.MessageEmbed()
              .setColor('#43B581')
              .setTitle("Channel Unlocked :unlock:")
              .setDescription(":white_check_mark: Your channel has been unlocked!")
            message.channel.send(unlockchannelmsg);
         } else {
         const alrunlockchannelmsg = new Discord.MessageEmbed()
         .setColor('FF0000')
         .setDescription(":x: Bruh...your channel is already unlocked! :unlock:")
         message.channel.send(alrunlockchannelmsg);
         }
          
        } else
          message.reply("You do not own this channel or you do not have enough perms!");
    }
      if(!args.length)
      {
        message.reply("You did not pass any arguments!")
      }
  }
}