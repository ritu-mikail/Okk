const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "sing4",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ryuko",
    description: "Send Youtube Music",
    commandCategory: "without prefix",
    usages: `ytmp3 [music title]`,
    cooldowns: 5,
    dependencies: {
        "path": "",
        "fs-extra": ""
    }
};

module.exports.run = async function({ api, event, args }) {
    const chilli = args.join(' ');

    if (!chilli) {
        return api.sendMessage('Please provide a song, for example: ytmp3 Selos', event.threadID, event.messageID);
    }

    const apiUrl1 = `https://betadash-search-download.vercel.app/yt?search=${encodeURIComponent(chilli)}`;
    
    
    

    try {
    
    const response1 = await axios.get(apiUrl1);
    const data1 = response1.data;
    const yturl = data1[0].url;
    const channel = data1[0].channelName;
    
        const apiUrl = `https://yt-video-production.up.railway.app/ytdl?url=${encodeURIComponent(yturl)}`;
    
        const response = await axios.get(apiUrl);
        const maanghang = response.data;

        if (!maanghang || !maanghang.audio) {
            return api.sendMessage('No song found for your search. Please try again with a different query.', event.threadID, event.messageID);
        }




        const bundat = maanghang.audio;
        
        
        
        
        const fileName = `${maanghang.title}.mp3`;
        const filePath = path.join(__dirname, fileName);

        const downloadResponse = await axios({
            method: 'GET',
            url: bundat,
            responseType: 'stream',
        });

        const writer = fs.createWriteStream(filePath);
        downloadResponse.data.pipe(writer);

        writer.on('finish', async () => {
            await api.sendMessage(`🎶 Now playing: ${maanghang.title}\n\n🔗 Download Link: ${maanghang.audio}\n\n🎙️Uploader: ${channel}`, event.threadID);

            api.sendMessage({
                attachment: fs.createReadStream(filePath)
            }, event.threadID, () => {
                fs.unlinkSync(filePath);
            });
        });

        writer.on('error', () => {
            api.sendMessage('There was an error downloading the file. Please try again later.', event.threadID, event.messageID);
        });
    } catch (pogi) {
        console.error('Error fetching song:', pogi);
        api.sendMessage('An error occurred while fetching the song. Please try again later.', event.threadID, event.messageID);
    }
};
