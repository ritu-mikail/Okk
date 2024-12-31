const fs = global.nodemodule["fs-extra"];
const axios = require("axios");
const path = require("path");

module.exports.config = {
  name: "goiadmin3",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "nazrul",
    description: "mention",
    commandCategory: "user",
    usages: "tag",
    cooldowns: 5,
};
module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "61559715091297") {
    var aid = ["61559715091297"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["আমার বস চিপায়  বিজি আছে\n যা বলার আমাকে বলো", "মেয়ে পটাতে গেছে😁😁😁", "এমন ভাবে মেনশান না দিয়ে একটা জি এফ দাও🙈🙈", "এত ডাকিস কেন😡😡😡\n আমার বস অনেক বিজি", "বস কই তুমি\nতোমারে এক বলদে খোজ করে 😑😑😁🤣"];
const nazrul = msg[Math.floor(Math.random() * msg.length)];
const imgPath = path.resolve(__dirname, `./cache/${senderID}.jpg`);
      const dpResponse = await axios.get(`https://graph.facebook.com/${senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, {
        responseType: "arraybuffer",
      });

      fs.writeFileSync(imgPath, Buffer.from(dpResponse.data));

      const msg = {
        body:`${nazrul}\n`,
        attachment: fs.createReadStream(imgPath),
      };

api.sendMessage(msg, threadID, (err) => {
        if (err) {
          console.error("Error sending message:", err);
          return;
        }

        fs.unlinkSync(imgPath);
      });
    } catch (error) {
      console.error("Error fetching or sending profile picture:", error);
    }
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {};
