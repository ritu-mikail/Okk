const axios = require('axios');

const fs = require('fs-extra');

module.exports.config = {

name: "upscale",

hasPermssion: 0,

usages: `reply image`,

dev: "Jonell Magallanes",

cooldowns: 2,

commandCategory: "without prefix",

description: "Enhance Photo",

credits: "nazrul",
  }
};

module.exports.run = async function({ api, event, args }) {

const pathie = __dirname + `/cache/remove_bg.jpg`;

const { threadID, messageID } = event;

const james = event.messageReply.attachments[0].url || target.join(" ");

try {

const hshs = await api.sendMessage("⏱️ | Your Photo is Enhancing. Please Wait....", threadID, messageID);

const response = await axios.get(`https://hiroshi-api.onrender.com/image/upscale?url=${encodeURIComponent(james)}`);

const processedImageURL = response.data; 

const imgResponse = await axios.get(processedImageURL, { responseType: 'stream' });

const writer = fs.createWriteStream(pathie);

imgResponse.data.pipe(writer);

writer.on('finish', () => {

api.unsendMessage(hshs.messageID);

api.sendMessage({

body: "🖼️ | Your Photo has been Enhanced!",

attachment: fs.createReadStream(pathie)

}, threadID, () => fs.unlinkSync(pathie), messageID);

});

writer.on('error', (error) => {

api.sendMessage(`❎ | Error writing image to file: ${error}`, threadID, messageID);

});

} catch (error) {

api.sendMessage(`❎ | Error processing image: ${error}`, threadID, messageID);

}

}

};

