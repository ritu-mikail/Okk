const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`
  );
  return base.data.xnil;
};

module.exports = {
  config: {
    name: "flux3",
    version: "2.0",
    hasPermssion: 0,
    credits: "xnil",
    description: "Generate images with Flux.1 Pro",
    commandCategory: "ai image",
    usages: "{pn} [prompt]",
    countDowns: 15,
  },

  module.exports.run: async function({ event, args, api }) {
    try {
      const prompt = args.join(" ");
      const startTime = new Date().getTime();
      const ok = api.sendMessage("wait baby <😘");
      api.setMessageReaction("⌛", event.messageID, (err) => {}, true);
      const apiUrl = `${await baseApiUrl()}/xnil/flux?prompt=${encodeURIComponent(prompt)}`;
      const response = await axios.get(apiUrl);
      const imageUrl = response.data.image;
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      api.unsendMessage(ok.messageID);
      const attachment = await global.utils.getStreamFromURL(imageUrl);
      const endTime = new Date().getTime();
      await api.sendMessage({
        body: `Here's your image\nModel Name: "Flux"\nTime Taken: ${(endTime - startTime) / 1000} second/s`,
        attachment,
      });
    } catch (e) {
        console.error('Error:', error);
        api.sendMessage(`An error occurred: ${e.message}`, event.threadID);
    }
};
