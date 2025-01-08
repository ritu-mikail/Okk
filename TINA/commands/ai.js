module.exports.config = {
  name: `ai`,
  version: "1.1.0",
  hasPermssion: 0,
  credits: "nazrul",
  description: "",
  commandCategory: "without prefix",
  usages: ``,
  cooldowns: 3,
  dependency: {
    "axios": ""
  }
};

module.exports.run = async function ({api, event, args}) {
  try{
  const axios = require('axios');
  let ask = args.join(' ');
  if (!ask) {
    return api.sendMessage('please provide a question.', event.threadID, event.messageID)
  }

  const res = await axios.get(`https://kaiz-apis.gleeze.com/api/gpt-4o?q=${ask}&uid=${event.senderID}`);
  const reply = res.data.response;
  if (res.error) {
    return api.sendMessage('having some unexpected error while fetching api.', event.threadID, event.messageID)
  } else {
    return api.sendMessage(`${reply}`, event.threadID, event.messageID)
  }
  } catch (error) {
    return api.sendMessage('having some unexpected error', event.threadID, event.messageID)
  }
}			api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`, event.threadID, messageID);
		}
	} catch (error) {
		console.error('Error:', error);
		api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, event.messageID);
	}
};
 
