const os = require('os');

module.exports.config = {
    name: "ping",
    version: "1.0.0",
    hasPermission: 2,
    description: "Respond with latency and real-time system information",
    usePrefix: true,
    credits: "nazrul",
    cooldowns: 6,
    commandCategory: "System",
};

module.exports.run = async function ({ api, event }) {
    const start = Date.now();
    
    api.sendMessage("𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐁𝐚𝐛𝐲...😘", event.threadID, (err, messageInfo) => {
        if (err) return console.error(err);

        const botResponseTime = Date.now() - start;

        setTimeout(() => {
            api.unsendMessage(messageInfo.messageID);
        }, 1000);

        const serverLatency = Date.now() - start;

        const osUptime = os.uptime();
        const osPlatform = os.platform();
        const osArch = os.arch();

        api.sendMessage(`𝐁𝐨𝐭 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐞: ${botResponseTime}ms\n𝐒𝐞𝐫𝐯𝐞𝐫 𝐋𝐚𝐭𝐞𝐧𝐜𝐲: ${serverLatency}ms\n𝐎𝐒 𝐔𝐩𝐭𝐢𝐦𝐞: ${osUptime}s\n𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦: ${osPlatform}\n𝐀𝐫𝐜𝐡𝐢𝐭𝐞𝐜𝐭𝐮𝐫𝐞: ${osArch}`, event.threadID, event.messageID);
    });
};
