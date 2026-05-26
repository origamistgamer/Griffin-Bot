const prefix = 'Griff';

module.exports = {
    name:'help',
    description: "This is a help command to help user about the bots commands",
    execute(message, args, Discord) {
        const data = [];
        const { commands } = message.client;
        const commandName =  (command => { 
            if(!command.admin) return command.name;
        });   
        const commandNameMap = (commands.map(commandName).join(', '))
        const commandNameString = commandNameMap.replace(/,\s,/g, ",") //RegExp '/' represents start and end of expression
        //.replace(/,\s,/g, ", ")            // ',' and '\s' represent the commas and whitespace between em, 
        if(!args.length){                    // 'g' represents finding all the matches in the string, ',\s,' gets replace with a single ','                       
        data.push("Here is a list of my commands:") ;
        data.push(commandNameString);
        //console.log(commandNameString); Helpful to analyse
        data.push(`\nYou can send \`${prefix} help [command name]\` to get info on a specific command!`);
 
        return message.author.send(data, { split: true })

        .then(() => {
            if(message.channel.type === 'dm') return;
            message.reply('I have sent you a DM about my commands')
        })
        .catch((err) => {
         message.reply("I can\'t send you a DM, Maybe you blocked me?")
        })
        
        } 

    const name = args[0].toLowerCase();
    const command = commands.get(name);
    
    if(!command){
    return message.reply('That\'s not a valid command!');
    }

    data.push(`**Name:** ${command.name}`);

    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    if (command.description) data.push(`**Description:** ${command.description}`);
    if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);  

    message.channel.send(data, { split: true });

    }
};    