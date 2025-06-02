case "message_reaction":
const uid = global.config.BOTADMIN;
        if(!uid.includes(event.senderID) && uid.includes(event.senderID) == api.getCurrentUserID() && event.reaction == '🥀') {
					api.unsendMessage(event.messageID)
				}
        handleReaction({ event });
        break;
      default:
        break; 
    }
  };
};
