const axios = require("axios");
const fs = require("fs-extra");
const getFBInfo = require("shankar-facebook");
const { alldown } = require("shankar-media-downloader");

module.exports = {
  config: {
    name: "linkAutoDownload",
    version: "1.3.0",
    hasPermssion: 0,
    credits: "SMART SHANKAR",
    description: "Automatically detects links in messages and downloads the file.",
    commandCategory: "Utilities",
    usages: "",
    cooldowns: 5,
  },
  run: async function ({ events, args }) {},
  handleEvent: async function ({ api, event, args }) {
    const content = event.body ? event.body : "";
    const body = content.toLowerCase();

    const facebookLinkRegex = /https:\/\/www\.facebook\.com\/\S+/;
    const youtubeLinkRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    if (body.startsWith("https://")) {
      if (facebookLinkRegex.test(content)) {
        api.setMessageReaction("📥", event.messageID, (err) => {}, true);
        downloadAndSendFBContent(content, api, event);
      } else if (youtubeLinkRegex.test(content)) {
        api.setMessageReaction("🎥", event.messageID, (err) => {}, true);
        downloadAndSendYTContent(content, api, event);
      } else {
        api.setMessageReaction("🖤", event.messageID, (err) => {}, true);
        const data = await alldown(content);
        console.log(data);
        const { high, low } = data.data; // Extract both high and low quality URLs
        const videoUrl = high || low; // Prefer high quality, fallback to low if high is not available
        api.setMessageReaction("💌", event.messageID, (err) => {}, true);
        const video = (
          await axios.get(videoUrl, {
            responseType: "arraybuffer",
          })
        ).data;
        fs.writeFileSync(
          __dirname + "/cache/auto.mp4",
          Buffer.from(video, "utf-8")
        );

        return api.sendMessage(
          {
            body: ``,
            attachment: fs.createReadStream(__dirname + "/cache/auto.mp4"),
          },
          event.threadID,
          event.messageID
        );
      }
    }
  },
};

const downloadAndSendFBContent = async (url, api, event) => {
  const fbvid = './video.mp4'; 
  try {
    const result = await getFBInfo(url);
    const videoUrl = result.hd || result.sd; // Prefer HD quality, fallback to SD if HD is not available
    let videoData = await axios.get(encodeURI(videoUrl), { responseType: 'arraybuffer' });
    fs.writeFileSync(fbvid, Buffer.from(videoData.data, "utf-8"));
    
    api.sendMessage({
      body: "SHANKAR-BOT",
      attachment: fs.createReadStream(fbvid)
    }, event.threadID, () => {
      fs.unlinkSync(fbvid); 
    });
  } catch (e) {
    console.log(e);
  }
};

const downloadAndSendYTContent = async (url, api, event) => {
  const ytvid = './video.mp4';
  try {
    const apiUrl = `https://mr-prince-malhotra-ytdl.vercel.app/video?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);
    const responseData = response.data;

    if (!responseData.result || !responseData.result.url) {
      await api.sendMessage(`❌ | वीडियो के लिए कोई डाउनलोड लिंक नहीं मिला।`, event.threadID);
      return;
    }

    const downloadUrl = responseData.result.url;
    const title = responseData.result.title;
    const videoResponse = await axios.get(downloadUrl, {
      responseType: "arraybuffer",
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    fs.writeFileSync(ytvid, Buffer.from(videoResponse.data, "utf-8"));

    api.sendMessage({
      body: `🎥 | आपका वीडियो "${title}" डाउनलोड हो गया है!`,
      attachment: fs.createReadStream(ytvid)
    }, event.threadID, () => {
      fs.unlinkSync(ytvid);
    });

  } catch (e) {
    console.log(e);
    await api.sendMessage(`❌ | वीडियो प्राप्त करने में समस्या हुई: ${e.message}`, event.threadID);
  }
};
