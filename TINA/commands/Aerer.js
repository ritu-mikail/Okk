const axios = require("axios");
const { createReadStream, createWriteStream, unlinkSync, statSync } = require("fs-extra");

module.exports.config = {
  name: "erer",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "nazrul",
  description: "ইউটিউব থেকে ভিডিও ডাউনলোড",
  commandCategory: "video",
  usages: "video - video name",
  cooldowns: 10
};

module.exports.handleReply = async function({ api, event, handleReply }) {
  try {
    const selectedIndex = parseInt(event.body) - 1;
    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= handleReply.searchResults.length) {
      return api.sendMessage("তালিকা থেকে একটি সঠিক নম্বর দিয়ে উত্তর দিন", event.threadID, event.messageID);
    }

    const video = handleReply.searchResults[selectedIndex];
    const videoUrl = `https://yt-video-production.up.railway.app/ytdl?url=${encodeURIComponent(video.videoUrl)}`;

    api.sendMessage(`${video.title}\nভিডিও ডাউনলোড করা হচ্ছে\n1 মিনিট অপেক্ষা করুন`, event.threadID, async (err, info) => {
      setTimeout(() => api.unsendMessage(info.messageID), 20500);
    });

    try {
      const downloadResponse = await axios.get(videoUrl);
      const { video: videoFileUrl, title } = downloadResponse.data;

      const filePath = `${__dirname}/cache/video.mp4`;

      
      const videoStream = await axios({
        url: videoFileUrl,
        method: "GET",
        responseType: "stream"
      });

      videoStream.data
        .pipe(createWriteStream(filePath))
        .on("close", () => {
          if (statSync(filePath).size > 26214400) {
            api.sendMessage("⚠️ এই ভিডিও পাঠানো যাবো না\nএটি ২৫ এমবি উপরে", event.threadID, () => unlinkSync(filePath));
          } else {
            api.sendMessage({ body: title, attachment: createReadStream(filePath) }, event.threadID, () => unlinkSync(filePath));
          }
        })
        .on("error", (error) => api.sendMessage(` ${error.message}`, event.threadID));
    } catch (error) {
      api.sendMessage(`${error.message}`, event.threadID);
    }
  } catch {
    api.sendMessage("⛔ অনুরোধ করা জায় নি ", event.threadID);
  }
};

module.exports.run = async function({ api, event, args }) {
  if (args.length === 0) return api.sendMessage("⚠️ একটি  গানের নাম বলো", event.threadID, event.messageID);

  const query = args.join(" ");
  const apiUrl = `https://mr-prince-malhotra-ytdl.vercel.app/video?query=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(apiUrl);
    const searchResults = response.data.slice(0, 6); 

    if (!searchResults.length) {
      return api.sendMessage("❌  কোন ফলাফল পাওয়া যায় নি।", event.threadID, event.messageID);
    }

    let message = "কিছু গানের তালিকা দেওয়া হলো\n";
    searchResults.forEach((result, index) => {
      message += `${index + 1}. ${result.title}\n ${result.channelTitle}\n-----------------------\n`;
    });

    api.sendMessage(
      `${message}\nতালিকা থেকে আপনার পছন্দের নাম্বার রিপ্লাই দিন`,
      event.threadID,
      (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          searchResults
        });
      },
      event.messageID
    );
  } catch (error) {
    api.sendMessage(`${error.message}`, event.threadID, event.messageID);
  }
};
