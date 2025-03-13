const axios = require("axios");
const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "upscale",
    version: "1.0",
    credits: "nazrul",
    hasPermssion: 0,
    description: { en: "Upscale an image" },
    commandCategory: "image",
    usages: { en: "{p}upscale (reply to an image)" }
  },

  run: async function ({ api, event }) {
    if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
      return api.sendMessage("❌ Please reply to an image to upscale it.", event.threadID, event.messageID);
    }

    const imageUrl = event.messageReply.attachments[0].url;
    const apiURL = "https://www.noobz-api.rf.gd/api/upscaler";

    try {
      const response = await axios.post(apiURL, { imageUrl }, { headers: { "Content-Type": "application/json" } });
      const upscaledURL = response.data?.data;

      if (!upscaledURL) {
        return api.sendMessage("❌ No upscaled image found.", event.threadID, event.messageID);
      }

      const stream = await getStreamFromURL(upscaledURL);
      api.sendMessage({ body: "✅ Here is the upscaled image:", attachment: stream }, event.threadID, event.messageID);
    } catch (error) {
      console.error("Upscale Error:", error);
      api.sendMessage("❌ Error: " + error.message, event.threadID, event.messageID);
    }
  }
};
