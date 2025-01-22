const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
    name: "6k",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "nazrul",
    premium: false,
    description: "Enhance Photo",
    commandCategory: "without prefix",
    usages: `reply image`,
    cooldowns: 5,
    dependencies: {
        "path": "",
        "fs-extra": ""
    }
};

module.exports.run = async function({ api, event, args }) {
  const pathie = __dirname + `/cache/remove_bg.jpg`;
  const { threadID, messageID } = event;

  const photoUrl = event.messageReply ? event.messageReply.attachments[0].url : args.join(" ");

  if (!photoUrl) {
    api.sendMessage("Please reply to a photo ", threadID, messageID);
    return;
  }

  try {
    const findingMessage = await api.sendMessage(`𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐁𝐚𝐛𝐲...😘`, event.threadID);
    
    const response = await axios.get(`https://hiroshi-api.onrender.com/image/upscale?imageUrl=${encodeURIComponent(photoUrl)}`);
    const processedImageURL = response.data.imageUrl;

    const img = (await axios.get(processedImageURL, { responseType: "arraybuffer" })).data;

    fs.writeFileSync(pathie, Buffer.from(img, 'binary'));

    api.sendMessage({
      body: "𝐈𝐦𝐚𝐠𝐞 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐞𝐝 𝐒𝐮𝐜𝐜𝐞𝐟𝐮𝐥",
      attachment: fs.createReadStream(pathie)
    }, threadID, () => fs.unlinkSync(pathie), messageID);
    api.unsendMessage(findingMessage.messsageID);
  } catch (error) {
    api.sendMessage(`Error processing image: ${error.message}`, threadID, messageID);
  }
};
