module.exports.config = {
  name: "flux2",
  version: "1.0.",
  hasPermssion: 0,
  credits: "nazrul",
  description: "generate image from flux",
  commandCategory: "image",
  usages: ".flux <prompt>",
  cooldowns: 7,
};

module.exports.run = async ({api, event, args }) => {
const axios = require('axios');
const fs = require('fs-extra');
 let { threadID, messageID } = event;
  let nazrul = args.join(" ");
try {
  if (!nazrul) return api.sendMessage("𝐏𝐥𝐞𝐚𝐬𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐏𝐫𝐨𝐦𝐩𝐭 𝐅𝐨𝐫 𝐓𝐡𝐞 𝐢𝐦𝐚𝐠𝐞....", threadID, messageID);
  api.sendMessage("𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐁𝐚𝐛𝐲...😘",event.threadID, event.messageID);
let path = __dirname + `/cache/tina.png`;
  const nazrul2 = (await axios.get(`https://xnilnew404.onrender.com/xnil/fluxpro?prompt=${nazrul}`, {
    responseType: "arraybuffer",
  })).data;
  fs.writeFileSync(path, Buffer.from(nazrul2, "utf-8"));
  api.sendMessage({
    body: `𝐈𝐦𝐚𝐠𝐞 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐞𝐝 𝐒𝐮𝐜𝐜𝐞𝐟𝐮𝐥`,
    attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID);
}catch(nazrul3) {
  api.sendMessage(`Error: ${nazrul3.message}`, event.threadID, event.messageID)}
};
