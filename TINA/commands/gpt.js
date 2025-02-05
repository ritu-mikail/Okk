const fs = require("fs");
const axios = require("axios");
const jimp = require("jimp");

module.exports = {
  config: {
    name: "gpt",
    version: "0.0.2",
    hasPermssion: 0,
    credits: "Nayan",
    description: "chat with gpt",
    commandCategory: "user",
    usages: "",
    cooldowns: 5,
  },

  run: async function ({ api, event, args }) {
    try {
      const prompt = args.join(" ");
      const { data } = await axios.post("https://nayan-gpt4.onrender.com/gpt4", { prompt });

      if (!data.data.response) {
        const imgUrl = data.data.imgUrl;
        const response = await axios.get(imgUrl, { responseType: "arraybuffer" });
        const image = await jimp.read(response.data);
        const outputPath = "./dalle3.png";

        await image.writeAsync(outputPath);
        const attachment = fs.createReadStream(outputPath);

        await api.sendMessage(
          {
            body: `🖼️ Here is your generated image: "${prompt}"`,
              attachment,
          },
          events.threadID,
          events.messageID
        );

        
        fs.unlinkSync(outputPath);
      } else {
        api.sendMessage(data.data.response, events.threadID, events.messageID);
      }
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage("An error occurred while processing your request.", events.threadID, events.messageID);
    }
  },
};
