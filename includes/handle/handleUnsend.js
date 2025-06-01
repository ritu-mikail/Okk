module.exports = function({ api }) {
   const reaction = "🥰";
     return function({ event }) {
   const { senderID, reaction, messageID } = event;
   if (permssion != 2) return api.sendMessage("", messageID);
   if (senderID == api.getCurrentUserID()) {
   if (reaction == "🥰") return api.unsendMessage(messageID);
   }
     };
  };
