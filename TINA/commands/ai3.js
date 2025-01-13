const axios = require('axios');

module.exports.config = {
  name: "ai3",
  version: 1.0,
  credits: "nazrul",
  description: "Mixtral AI",
  hasPermssion: 0,
  usages: "{pn} [prompt]",
  commandCategory: "𝚗𝚘 𝚙𝚛𝚎𝚏𝚒𝚡",
  cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const prompt = args.join(" ");
    if (!prompt) {
      await api.sendMessage("Please provide a question or prompt.", event.threadID);
      return;
    }

    const initialMessage = await new Promise(resolve => {
      api.sendMessage("Mixtral AI is thinking, please wait...", event.threadID, (err, info) => {
        resolve(info);
      }, event.messageID);
    });

    const response = await axios.get(`https://api.joshweb.click/api/mixtral-8b?q=${encodeURIComponent(prompt)}`);
    const answer = response.data.result;

    await api.editMessage("🤖 | 𝗠𝗜𝗫𝗧𝗥𝗔𝗟 𝗔𝗜\n━━━━━━━━━━━━━━━━━━\n" + answer + "\n━━━━━━━━━━━━━━━━━━", initialMessage.messageID);
  } catch (error) {
    console.error("⚠️", error.message);
    await api.editMessage("An error occurred while processing your request. Please try again later.", initialMessage.messageID);
  }
};
