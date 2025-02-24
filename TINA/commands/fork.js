   module.exports.config = {
  name: "fork",
  version: "1.2.8",
  hasPermssion: 0,
  credits: "Islamick Chat", //Don't chinge The credit
  description: "See information about the 12 zodiac animals",
  commandCategory: "Utilities",
  usages: "animals",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "request": ""
  } 
}

module.exports.onLoad = () => {
  let { mkdirSync, existsSync, createWriteStream } = require("fs-extra");
  let request = require("request");
  let dirMaterial = __dirname + `/noprefix/12congiap/`; 
  if (!existsSync(dirMaterial + "noprefix" + "12congiap")) mkdirSync(dirMaterial, { recursive: true });

  if (!existsSync(dirMaterial + "pack.jpg")) request("https://i.imgur.com/R8QnewK.jpeg").pipe(createWriteStream(dirMaterial + "pack.jpg"))

  if (!existsSync(dirMaterial + "mirai.jpg")) request("https://i.imgur.com/4apF2KR.jpeg").pipe(createWriteStream(dirMaterial + "mirai.jpg"))

}

module.exports.handleReply = async ({ api, event, handleReply }) => {
  let { createReadStream } = require("fs-extra");
  let { threadID, messageID, senderID, body } = event;
    switch(handleReply.type) {
        case "choosee": {
            switch(body) {

          case "1":
                api.unsendMessage(handleReply.messageID);
      api.sendMessage({
        body: "𝐈𝐬𝐥𝐚𝐦𝐢𝐜𝐤 𝐂𝐡𝐚𝐭 𝐅𝐨𝐫𝐤 𝐋𝐢𝐧𝐤\n𝐍𝐚𝐦𝐞: 𝐈𝐬𝐥𝐚𝐦𝐢𝐜𝐤 𝐂𝐡𝐚𝐭\n𝐌𝐨𝐝𝐞𝐥: 𝐁𝐨𝐭𝐏𝐚𝐜𝐤\n⋆✦⎯⎯⎯⎯⎯⎯⎯✦⋆\n\nhttps://github.com/HACKER-NAZRUL-420/ISLAMIC-TINA\n\n𝐀𝐧𝐲𝐨𝐧𝐞 𝐖𝐢𝐭𝐡 𝐀𝐧𝐲 𝐏𝐫𝐨𝐛𝐥𝐞𝐦 𝐂𝐚𝐧 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐀𝐝𝐦𝐢𝐧\nhttps://m.me/ji.la.pi.6\n𝐓𝐡𝐚𝐧𝐤𝐬 𝐅𝐨𝐫 𝐔𝐬𝐢𝐧𝐠 𝐈𝐬𝐥𝐚𝐦𝐢𝐜 𝐂𝐡𝐚𝐭", 
        attachment: createReadStream(__dirname + `/noprefix/12congiap/pack.jpg`)
      }, threadID, messageID);
      break;

    case "2":
                api.unsendMessage(handleReply.messageID);
      api.sendMessage({
        body: "𝐈𝐬𝐥𝐚𝐦𝐢𝐜𝐤 𝐂𝐡𝐚𝐭 𝐅𝐨𝐫𝐤 𝐋𝐢𝐧𝐤\n𝐍𝐚𝐦𝐞: 𝐈𝐬𝐥𝐚𝐦𝐢𝐜𝐤 𝐂𝐡𝐚𝐭\n𝐌𝐨𝐝𝐞𝐥: 𝐌𝐢𝐫𝐚𝐢\n⋆✦⎯⎯⎯⎯⎯⎯⎯✦⋆\n\n\https://github.com/mr-nazrul-404/islamick-chat\n\n𝐀𝐧𝐲𝐨𝐧𝐞 𝐖𝐢𝐭𝐡 𝐀𝐧𝐲 𝐏𝐫𝐨𝐛𝐥𝐞𝐦 𝐂𝐚𝐧 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐀𝐝𝐦𝐢𝐧\nhttps://m.me/ji.la.pi.6\n𝐓𝐡𝐚𝐧𝐤𝐬 𝐅𝐨𝐫 𝐔𝐬𝐢𝐧𝐠 𝐈𝐬𝐥𝐚𝐦𝐢𝐜 𝐂𝐡𝐚𝐭", 
        attachment: createReadStream(__dirname + `/noprefix/12congiap/mirai.jpg`)
      },threadID, messageID);
      break;

          default:
        const choose = parseInt(body);
              if (isNaN(body)) return api.sendMessage("•—»✨ একটি নুম্বারে রিপ্লাই দিন", threadID, messageID);
              if (choose > 2 || choose < 1) return api.sendMessage("•—»✨ নির্বাচনের তালিকা নেই", threadID, messageID); 

      }
    }
  }
}

module.exports.run = async ({ api, event, handleReply }) => {
  let fs = require("fs-extra");
  let { threadID, senderID } = event;
  return api.sendMessage({ body: "𝐀𝐬𝐬𝐚𝐥𝐚𝐦𝐮 𝐀𝐥𝐚𝐢𝐤𝐮𝐦\n𝐈𝐬𝐥𝐚𝐦𝐢𝐜𝐤 𝐂𝐡𝐚𝐭 𝐏𝐮𝐛𝐥𝐢𝐜 𝐅𝐨𝐫𝐤\n𝐖𝐡𝐢𝐜𝐡 𝐎𝐧𝐞 𝐃𝐨 𝐘𝐨𝐮 𝐍𝐞𝐞𝐝?\n\n｢𝟏｣ 𝐈𝐬𝐥𝐚𝐦𝐢𝐜𝐤 𝐂𝐡𝐚𝐭-𝐁𝐨𝐭𝐩𝐚𝐜𝐤\n｢𝟐｣ 𝐈𝐬𝐥𝐚𝐦𝐢𝐜𝐤 𝐓𝐢𝐧𝐚-𝐌𝐢𝐫𝐚𝐢\n\n𝐑𝐞𝐩𝐥𝐲 𝐓𝐨 𝐓𝐡𝐞 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐓𝐡𝐚𝐭 𝐘𝐨𝐮 𝐍𝐞𝐞𝐝"
            }, threadID, (error, info) => {
        global.client.handleReply.push({
            type: "choosee",
            name: this.config.name,
            author: senderID,
            messageID: info.messageID
        })  
    })
  }
