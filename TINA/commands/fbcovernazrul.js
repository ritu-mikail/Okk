module.exports.config = {
name: "fbcoveer3",
version: "1.0.0",
hasPermssion: 0,
credits: "Islamick Chat",
description: "use but can't change credit",
commandCategory: "fbcover",
usages: "facebook cover photo make by Islamick Chat",
cooldowns: 0,
dependencies: {
    "fs-extra": "",
    "request": "",
    "axios": ""
 }
};
module.exports.run = async function ({ api, args, event, permssion }) {
if ((this.config.credits) != "Islamick Chat") { return api.sendMessage(`[ WARNING ] - Islamick Chat Don't credits modules ${this.config.name} was changed to ${this.config.credits} bởi ADMINBOT ${global.config.BOTNAME} 😐 Stop now!!!`, event.threadID, event.messageID)}
    const request = require('request');
  const fs = require("fs-extra")
  const axios = require("axios")
  const { threadID, messageID, senderID, body } = event;
  if(!args[0]) return api.sendMessage('•┄┅════❁🌺❁════┅┄•\n\nআসসালামু আলাইকুম-!!🖤💫\nঅনুগ্রহ করে টাইপ করুন /fbcover তারপর প্রাথমিক নাম লিখুন!!!\n\n•┄┅════❁🌺❁════┅┄•', threadID, messageID)
  else return api.sendMessage(`•┄┅════❁🌺❁════┅┄•\n\nআসসালামু আলাইকুম-!!🖤💫\n🌺✨আপনি প্রধান নাম চয়ন করেছেন: ${args.join(" ").toUpperCase()}\n\n(এই বার্তার উত্তর দিন এবং আপনার দ্বিতীয় নাম নির্বাচন করুন)\n\n•┄┅════❁🌺❁════┅┄•`,event.threadID, (err, info) => {
     return global.client.handleReply.push({
        type: "tenphu",
        name: `fbcover`,
        author: senderID,
        tenchinh: args.join(" ").toUpperCase(),
        messageID: info.messageID
      });
  },event.messageID);
}
module.exports.handleReply = async function({ api, event, args, handleReply, client, __GLOBAL, Threads, Users, Currencies }) {
  module.exports.circle = async (image) => {
    const jimp = require("jimp")
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
  }
  if (handleReply.author != event.senderID) return;
  const { threadID, messageID, senderID, body } = event;
  const { loadImage, createCanvas } = require("canvas");
  const request = require('request');
  const fs = require("fs-extra")
  const axios = require("axios")
  let pathImg = __dirname + `/cache/${senderID+20}.png`;
  let pathAva = __dirname + `/cache/${senderID+30}.png`;
  let pathLine = __dirname + `/cache/${senderID+40}.png`;
  const path = require("path")
  const Canvas = require("canvas")
  const __root = path.resolve(__dirname, "cache");
  var tenchinh = handleReply.tenchinh;
  //=================CONFIG TEXT=============//
  switch (handleReply.type) {
    case "tenphu": {
      var tenchinh = handleReply.tenchinh;
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`•┄┅════❁🌺❁════┅┄•\n\n আসসালামু আলাইকুম-!!🖤💫\n 🌺✨আপনি প্রধান নাম চয়ন করেছেন:${event.body.toUpperCase()}\n\n(এই বার্তার উত্তর আপনার ফোন নম্বর লিখুন)\n\n•┄┅════❁🌺❁════┅┄•`,threadID, function (err, info) {
        return global.client.handleReply.push({
          type: "sdt",
          name: `fbcover`,
          author: senderID,
          tensub-nament.body,
          tenchinh: tenchinh,
          messageID: info.messageID
        });
      },messageID)
    }
    case "sdt": {
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`•┄┅════❁🌺❁════┅┄•\n\n🌺আসসালামু আলাইকুম-!!🖤💫\n🌺✨আপনি এইভাবে SDT নির্বাচন করেছেন:${event.body.toUpperCase()}\n\(আপনার ইমেল লিখতে এই বার্তার উত্তর দিন)\n\n•┄┅════❁🌺❁════┅┄•`,threadID, function (err, info) {
        return global.client.handleReply.push({
          type: "email",
          name: `fbcover`,
          author: senderID,
          sdt: event.body,
          tenchinh: handleReply.tenchinh,
          tenphu: handleReply.tenphu,
          messageID: info.messageID
        });
      },messageID) 
    }
    case "email": {
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`•┄┅════❁🌺❁════┅┄•\n\nআসসালামু আলাইকুম-!!🖤💫\n🌺✨ আপনি এই হিসাবে ইমেল নির্বাচন করেছেন: ${event.body.toUpperCase()}\n\(আপনার ঠিকানা লিখতে এই বার্তার উত্তর দিন)\n\n•┄┅════❁🌺❁════┅┄•`,threadID, function (err, info) {
        return global.client.handleReply.push({
          type: "color",
          name: `fbcover`,
          author: senderID,
          sdt: handleReply.sdt,
          tenchinh: handleReply.tenchinh,
          tenphu: handleReply.tenphu,
          email: event.body,
          messageID: info.messageID
        });
      },messageID) 
    }
    case "color": {
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`•┄┅════❁🌺❁════┅┄•\n\nআসসালামু আলাইকুম-!!🖤💫\n🌺আপনি এই হিসাবে ঠিকানা নির্বাচন করেছেন : ${event.body.toUpperCase()}\nআপনার কভারের ব্যাকগ্রাউন্ডের রঙ বাছাই করতে এই মেসেজ এর রিপ্লাই দিন(enter no as default color)\n\n•┄┅════❁🌺❁════┅┄•`,threadID, function (err, info) {
        return global.client.handleReply.push({
          type: "create",
          name: `fbcover`,
          author: senderID,
          sdt: handleReply.sdt,
          tenchinh: handleReply.tenchinh,
          tenphu: handleReply.tenphu,
          diachi: event.body,
          email: handleReply.email,
          messageID: info.messageID
        });
      },messageID) 
    }
    case "create": {
      var color = event.body
      if (color.toLowerCase() == "no") var color = `#ffffff`
      var address = handleReply.diachi.toUpperCase()
      var name = handleReply.tenchinh.toUpperCase()
      var email = handleReply.email.toUpperCase()
      var subname = handleReply.tenphu.toUpperCase()
      var phoneNumber = handleReply.sdt.toUpperCase()
      api.unsendMessage(handleReply.messageID);
      api.sendMessage(`•┄┅════❁🌺❁════┅┄•\n\nআসসালামু আলাইকুম-!!🖤💫\nআপনার cover photo বানানো সম্পুর্ন হয়েছে আরও কিছুখনের জন্য অপেক্ষা করুন\n\n•┄┅════❁🌺❁════┅┄•`,threadID, (err, info) => {
      setTimeout(() => {
              api.unsendMessage(info.messageID);
     }, 1000);
          }, messageID);
      //=================CONFIG IMG=============//
      let avtAnime = (
        await axios.get(encodeURI(
          `https://graph.facebook.com/${senderID}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`),
          { responseType: "arraybuffer" }
        )
      ).data;
      let background = (
        await axios.get(encodeURI(`https://1.bp.blogspot.com/-ZyXHJE2S3ew/YSdA8Guah-I/AAAAAAAAwtQ/udZEj3sXhQkwh5Qn8jwfjRwesrGoY90cwCNcBGAsYHQ/s0/bg.jpg`), {
          responseType: "arraybuffer",
        })
      ).data;
      let hieuung = (
        await axios.get(encodeURI(`https://1.bp.blogspot.com/-zl3qntcfDhY/YSdEQNehJJI/AAAAAAAAwtY/C17yMRMBjGstL_Cq6STfSYyBy-mwjkdQwCNcBGAsYHQ/s0/mask.png`), {
          responseType: "arraybuffer",
        })
      ).data;
      fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
      fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
      fs.writeFileSync(pathLine, Buffer.from(hieuung, "utf-8"));
      var avatar = await this.circle(pathAva);
      //=================DOWNLOAD FONTS=============//
      if(!fs.existsSync(__dirname+`/cache/UTMAvoBold.ttf`)) { 
          let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1DuI-ou9OGEkII7n8odx-A7NIcYz0Xk9o&export=download`, { responseType: "arraybuffer" })).data;
           fs.writeFileSync(__dirname+`/cache/UTMAvoBold.ttf`, Buffer.from(getfont2, "utf-8"));
        };
      //=================DRAW BANNER=============//
      let baseImage = await loadImage(pathImg);
      let baseAva = await loadImage(avatar);
      let baseLine = await loadImage(pathLine);
      let canvas = createCanvas(baseImage.width, baseImage.height);
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
      Canvas.registerFont(__dirname+`/cache/UTMAvoBold.ttf`, { family: "UTMAvoBold" });
      ctx.strokeStyle = "rgba(255,255,255, 0.2)";
      ctx.lineWidth = 3;
      ctx.font = "100px UTMAvoBold";
      ctx.strokeText(name, 30, 100);
      ctx.strokeText(name, 130, 200);
      ctx.textAlign = "right";
      ctx.strokeText(name, canvas.width - 30, canvas.height - 30);
      ctx.strokeText(name, canvas.width - 130, canvas.height - 130);
      ctx.fillStyle = `#ffffff`
      ctx.font = "55px UTMAvoBold";
      ctx.fillText(name, 680, 270);
      ctx.font = "40px UTMAvoBold";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "right";
      ctx.fillText(subname, 680, 320);
      ctx.font = "23px UTMAvoBold";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "start";
      ctx.fillText(phoneNumber, 1350, 252);
      ctx.fillText(email, 1350, 332);
      ctx.fillText(address, 1350, 410);
      ctx.globalCompositeOperation = "destination-out";
      ctx.drawImage(baseLine, 0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = color
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(baseAva, 824, 180, 285, 285);
      const imageBuffer = canvas.toBuffer();
      fs.writeFileSync(pathImg, imageBuffer);
      return api.sendMessage(
        { attachment: fs.createReadStream(pathImg) },
        threadID,messageID
      );
    }
  }
                                                                         }
