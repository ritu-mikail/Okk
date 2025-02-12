const fs = require("fs");
const path = require("path");
const axios = require("axios");
const yts = require("yt-search");

module.exports.config = {
  name: "sssrr",
  hasPermission: 0,
  version: "1.0.0",
  description: "Download YouTube audio (under 25MB) or provide link",
  credits: "SHANKAR",
  cooldowns: 10,
  commandCategory: "Utility"
};

module.exports.run = async function ({ api, event, args }) {
  if (!args[0]) {
    return api.sendMessage(`❌ | कृपया एक गाने का नाम दर्ज करें!`, event.threadID);
  }

  try {
    const query = args.join(" ");
    const findingMessage = await api.sendMessage(`🔍 | "${query}" खोजा जा रहा है...`, event.threadID);

    const searchResults = await yts(query);
    const firstResult = searchResults.videos[0];

    if (!firstResult) {
      await api.sendMessage(`❌ | "${query}" के लिए कोई परिणाम नहीं मिला।`, event.threadID);
      return;
    }

    const { title, url } = firstResult;
    await api.editMessage(`⏳ | "${title}" का डाउनलोड लिंक प्राप्त किया जा रहा है...`, findingMessage.messageID);

    const apiUrl = `https://mr-prince-malhotra-ytdl.vercel.app/audio?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);
    const responseData = response.data;

    if (!responseData.result || !responseData.result.url) {
      await api.sendMessage(`❌ | "${title}" के लिए कोई डाउनलोड लिंक नहीं मिला।`, event.threadID);
      return;
    }

    const downloadUrl = responseData.result.url;
    const filePath = path.resolve(__dirname, "cache", `${Date.now()}-${title}.mp3`);

    const audioResponse = await axios.get(downloadUrl, {
      responseType: "stream",
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const fileStream = fs.createWriteStream(filePath);
    audioResponse.data.pipe(fileStream);

    fileStream.on("finish", async () => {
      const stats = fs.statSync(filePath);
      const fileSizeInMB = stats.size / (1024 * 1024);

      if (fileSizeInMB > 25) {
        await api.sendMessage(`❌ | "${title}" का साइज ${fileSizeInMB.toFixed(2)}MB है, जो 25MB से ज्यादा है।\n📥 डाउनलोड लिंक: ${downloadUrl}`, event.threadID);
        fs.unlinkSync(filePath);
        return;
      }

      await api.sendMessage({
        body: `🎵 | आपका ऑडियो "${title}" डाउनलोड हो गया है!`,
        attachment: fs.createReadStream(filePath)
      }, event.threadID);

      fs.unlinkSync(filePath);
      api.unsendMessage(findingMessage.messageID);
    });

    audioResponse.data.on("error", async (error) => {
      console.error(error);
      await api.sendMessage(`❌ | ऑडियो डाउनलोड करने में समस्या हुई: ${error.message}`, event.threadID);
      fs.unlinkSync(filePath);
    });

  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    await api.sendMessage(`❌ | ऑडियो प्राप्त करने में समस्या हुई: ${error.response ? error.response.data : error.message}`, event.threadID);
  }
};
