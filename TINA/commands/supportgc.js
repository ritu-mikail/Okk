module.exports.config = {
  name: "supportgc",
  version: "1.1",
  credits: "nazrul",
  cooldowns: 5,
  hasPermission: 0,
  description: "Join the official support group chat",
  usePrefix: true,
  commandCategory: "General",
  usage: "supportgc",
};

module.exports.run = async function ({ api, event }) {
  const userId = event.senderID;
  const supportGroupThreadId = "6721422851200992";// Replace with the actual thread ID of the support group, if available.

  try {
    const threadInfo = await api.getThreadInfo(supportGroupThreadId);
    const participantIds = threadInfo.participantIDs;

    if (participantIds.includes(userId)) {
      return api.sendMessage("You are already add to this group", event.threadID);
    } else {
      await api.addUserToGroup(userId, supportGroupThreadId);
      return api.sendMessage("You have been added. If you don't get the group, check the message request", event.threadID);
    }
  } catch (error) {
    console.error("Error adding user to group:", error);
    return api.sendMessage("You can't be edited. Send me request or message in inbox and check again", event.threadID);
  }
};
