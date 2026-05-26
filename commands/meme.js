const got = require('got');
const https = require('https');
const { brotliDecompress } = require('zlib');
module.exports = {
    name: "meme",
    description: "Brings you hilarious memes!",
    async execute(message, args, Discord) {

        const memeEmbed = new Discord.MessageEmbed()
        await got('https://www.reddit.com/r/memes/random/.json').then(response => {
            const content = JSON.parse(response.body);
            console.log(content);
            const permalink = content[0].data.children[0].data.permalink;
            const memeUrl = `https://reddit.com${permalink}`;
            const memeImage = content[0].data.children[0].data.url;
            const memeTitle = content[0].data.children[0].data.title;
            const memeUpvotes = content[0].data.children[0].data.ups;
            const memeNumComments = content[0].data.children[0].data.num_comments;

               memeEmbed.setTitle(`${memeTitle}`)
               memeEmbed.setURL(`${memeUrl}`)
               memeEmbed.setImage(memeImage)
               memeEmbed.setColor('RANDOM')
               memeEmbed.setFooter(`👍 ${memeUpvotes}  💬 ${memeNumComments}`)
               message.channel.send(memeEmbed);
            //console.log(content.length); content[0]

        }) 

    }
}