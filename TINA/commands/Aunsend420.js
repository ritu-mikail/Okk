module.exports.config = {
    name: "unsend420",
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
    const { messageID, reaction } = event;
    if (reaction === '🤬') {
        api.unsendMessage(messageID);
    }
};

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
					type: "reaction",
					targetID,
					reason,
					name: this.config.name,
					messageID: info.messageID,
					author: event.senderID,
					
				});
			}, messageID);
		}
