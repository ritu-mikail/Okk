module.exports.config = {
    name: "github",
    version: "1.0",
    hasPermission: 2,
    credits: "nazrul",
    description: "Send Github links",
    usages: "/github",
    commandCategory: "github code",
    cooldowns: 5
};
 
module.exports.run = async ({ api, event }) => {
    try {
        // Define the github links here
        const miraiLink = "https://github.com/HACKER-NAZRUL-420/ISLAMICK-TINA-V10"; // Replace with your actual group link
        const botpackLink = "https://github.com/HACKER-NAZRUL-420/ISLAMIC-TINA"; // Replace with your actual github link

        // Message to send with the links
        const message = `ইসলামিক চ্যাটবট ফর্ক লিংক\n\nIslamick Tina-Mirai\n\n${miraiLink}\n\nIslamick Chat-Botpack\n\n${botpackLink}\n\nAnyone with any problem can message Admin\nhttps://m.me/ji.la.pi.6\nThanks for using Islamic Chat`;

        // Send the message with the links
        api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
        console.error("An error occurred:", error);
        api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
    }
};
