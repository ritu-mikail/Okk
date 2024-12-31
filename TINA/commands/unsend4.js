module.exports.config = {
    name: "unsend4",
    version: "1.0.1",
    hasPermssion: 1,
    credits: "nazrul",
    description: "reply [unsend]",
    commandCategory: "system",
    usePrefix: true,
    usages: "unsend admin only",
    cooldowns: 0
};

module.exports.languages = {
     "en": {
        "returnCant": "Can't unsend message from other user.",
        "missingReply": "Reply to the message you want to unsend."
    }
};

module.exports.handleReaction = function({ api, event }) {
    const { event.messageReaction, reaction } = event;
    if (reaction === '🤬') {
        return api.unsendMessage(event.messageReaction.messageID);

module.exports.run = function({ api, event, getText }) {
    if (event.messageReply.senderID != api.getCurrentUserID()) {
        return api.sendMessage(getText("returnCant"), event.threadID, event.messageID);
    }
    if (event.type != "message_reply") {
        return api.sendMessage(getText("missingReply"), event.threadID, event.messageID);
    }
    return api.unsendMessage(event.messageReply.messageID);
};

global.client.handleReaction = global.client.handleReaction || [];
global.client.handleReaction.push({
    name: module.exports.config.name,
    messageID: null
});
