module.exports.config = {
  name: "pic",
  version: "1.0.",
  hasPermssion: 2,
  credits: "Nazrul",
  description: "generate image from polination",
  usePrefix: true,
  commandCategory: "image",
  usages: "query",
  cooldowns: 2,
};

module.exports.run = async ({api, event, args }) => {
const axios = require('axios');
const fs = require('fs-extra');
 let { threadID, messageID } = event;
  let query = args.join(" ");
  if (!query) return api.sendMessage("𝐏𝐥𝐞𝐚𝐬𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐏𝐫𝐨𝐦𝐩𝐭 𝐅𝐨𝐫 𝐓𝐡𝐞 𝐢𝐦𝐚𝐠𝐞....", threadID, messageID);
let path = __dirname + `/cache/poli.png`;
  const poli = (await axios.get(`https://image.pollinations.ai/prompt/${query}`, {
    responseType: "arraybuffer",
  })).data;
  fs.writeFileSync(path, Buffer.from(poli, "utf-8"));
  api.sendMessage({
    body: `Here is what I Generated...`,
    attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID);
};
