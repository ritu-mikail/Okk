const axios = require('axios');

module.exports = {
  config: {
    name: "bing",
    version: "1.0",
    credits: "Dipto",
    countDown: 10,
    hasPermssion: 0,
   description: "Generate images by Unofficial Dalle3",
    commandCategory: "𝗜𝗠𝗔𝗚𝗘 𝗚𝗘𝗡𝗘𝗥𝗔𝗧𝗢𝗥",
    usages: { en: "{pn} prompt" }
  }, 
  run: async({ api, event, args }) => {
    const prompt = (event.messageReply?.body.split("dalle")[1] || args.join(" ")).trim();
    if (!prompt) return api.sendMessage("❌| Wrong Format. ✅ | Use: 17/18 years old boy/girl watching football match on TV with 'Dipto' and '69' written on the back of their dress, 4k", event.threadID, event.messageID);
    try {
  const cookies = ["1hot7nx06NVFng-TdE8K9GNfmft0XfaO0PW0heh2mm3Rhya-gsgEfXjPGCvcW1zp_RLiBeTYv_0fj-6uwlt5m0oIw7qnXxBRWxflX74Yu7I76Azf6YpEwGtWARGoLduXNhV-sWDqKtbDTQ16r6hTYeK1cLwUXkxYcS7P_6NTkz8r3PQrb28ckExM-xj757_deiFgjruoAbYDdNwOBmdaYDA"];
const randomCookie = cookies[Math.floor(Math.random() * cookies.length)];
      const wait = api.sendMessage("Wait koro baby 😽", event.threadID);
      const response = await axios.get(`https://www.noobs-api.rf.gd/dipto/dalle?prompt=${prompt}&key=dipto008&cookie=${cookies}`);
const imageUrls = response.data.imgUrls || [];
      if (!imageUrls.length) return api.sendMessage("Empty response or no images generated.", event.threadID, event.messageID);
      const images = await Promise.all(imageUrls.map(url => axios.get(url, { responseType: 'stream' }).then(res => res.data)));
    api.unsendMessage(wait.messageID);
   api.sendMessage({ body: `✅ | Here's Your Generated Photo 😘`, attachment: images }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage(`Generation failed!\nError: ${error.message}`, event.threadID, event.messageID);
    }
  }
}
