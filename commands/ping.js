module.exports = {
    name:'ping',
    description: "This Is a ping command!",
    execute(message, args, Discord, client) {
        message.reply('Calculating ping...').then(resultPing => {

            const ping = resultPing.createdTimestamp - message.createdTimestamp
    
            const pingEmbed = new Discord.MessageEmbed()
            .setColor('#242424')
            .setTitle("Ping :ping_pong:")
            .setDescription(`This is to show Bot Latency and API Latency\nBot Latency: ${ping} ms\nAPI Latency: ${client.ws.ping} ms`)
            .setFooter('Use command \'EH Help\' if you need help')
        
        message.channel.send(pingEmbed)

        })
    }
}

