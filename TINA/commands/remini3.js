const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: 'rem',
    version: '1.0.2',
    hasPermssion: 0,
    hasPrefix: true,
    commandCategory: "without prefix",
    description: 'Chat with AI assistant',
    usage: 'ai <message>',
    credits: 'churchill',
    cooldown: 3,
};

module.exports.run = async function ({ api, event, args }) {
    if (!args.length) return api.sendMessage('❌ Please provide a message.', event.threadID, event.messageID);

    const userMessage = args.join(' ');
    const apiUrl = `http://sgp1.hmvhostings.com:25721/gemini?question=${encodeURIComponent(userMessage)}`;

    try {
        api.sendMessage('🔎 Thinking...', event.threadID, async (err, info) => {
            if (err) return;

            const response = await axios.get(apiUrl);
            const data = response.data;
            
            const answerText = (data.answer || '').trim();

            if (data.web_images.length > 0) {
                const imageUrl = data.web_images[0];
                const imagePath = path.join(__dirname, 'ai_image.jpg');

                const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });
                const writer = fs.createWriteStream(imagePath);

                imageResponse.data.pipe(writer);

                await new Promise((resolve, reject) => {
                    writer.on('finish', resolve);
                    writer.on('error', reject);
                });

                await api.sendMessage(
                    {
                        body: answerText,
                        attachment: fs.createReadStream(imagePath),
                    },
                    event.threadID,
                    () => fs.unlinkSync(imagePath),
                    event.messageID
                );
            } else {
                api.editMessage(answerText || '⚠️ No response received.', info.messageID);
            }
        });
    } catch (error) {
        api.sendMessage('❌ Error processing your request. Try again later.', event.threadID, event.messageID);
    }
};
