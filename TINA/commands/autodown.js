module.exports = {
	config: {
		name: "autodownloadll",
		version: "1.3.0",
		hasPermssion: 2,
		credits: "nazrul",
		description: "Auto download videos from Facebook links with status reactions.",
		commandCategory: "Media",
		usages: "[auto-detect]",
		cooldowns: 5,
		dependencies: {
			"axios": ""
		}
	},
	handleEvent: async function({ api, event }) {
		const axios = require('axios');

		if (event.type === "message" && event.body) {
			if (event.body.startsWith("https://")) {
				const url = event.body;
				
				// Set a pending reaction
				api.setMessageReaction("💔", event.messageID, (err) => {}, true);

				try {
					const response = await axios.get(`https://priyansh-ai.onrender.com/autodown?url=${encodeURIComponent(url)}`);
					const videoData = response.data.data[0];

					if (!response.data.success || !videoData) {
						// Set a cross reaction on error
						api.setMessageReaction("😭", event.messageID, (err) => {}, true);
						return api.sendMessage("", event.threadID, event.messageID);
					}

					const { title, like_count, comment_count, share_count, videoUrl } = videoData;

					await axios({
						method: 'get',
						url: videoUrl,
						responseType: 'stream'
					}).then(videoStream => {
						api.sendMessage({
							body: `𝐅𝐁 𝐕𝐈𝐃𝐄𝐎 𝐃𝐀𝐖𝐍𝐋𝐎𝐀𝐃\n\n⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆\n｢👍｣ 𝐋𝐢𝐤𝐞𝐬 : ${like_count}\n｢💬｣ 𝐜𝐨𝐦𝐦𝐞𝐧𝐭𝐬 : ${comment_count}\n｢📝｣ 𝐓𝐢𝐭𝐥𝐞: ${title}\n⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆`,
							attachment: videoStream.data
						}, event.threadID, event.messageID);

						// Set a checkmark reaction on success
						api.setMessageReaction("💯", event.messageID, (err) => {}, true);

					}).catch(error => {
						// Set a cross reaction on error
						api.setMessageReaction("❌", event.messageID, (err) => {
							if (err) console.error(err);
						});
						api.sendMessage("", event.threadID, event.messageID);
					});

				} catch (error) {
					// Set a cross reaction on error
					api.setMessageReaction("❌", event.messageID, (err) => {}, true);
					api.sendMessage("", event.threadID, event.messageID);
				}
			}
		}
	},
	run: function() {
		// The run function can be left empty or used for additional setup if needed.
	}
};					await axios({
						method: 'get',
						url: videoUrl,
						responseType: 'stream'
					}).then(videoStream => {
						api.sendMessage({
							body: `𝐅𝐁 𝐕𝐈𝐃𝐄𝐎 𝐃𝐀𝐖𝐍𝐋𝐎𝐀𝐃\n\n⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆\n｢👍｣ 𝐋𝐢𝐤𝐞𝐬 : ${like_count}\n｢💬｣ 𝐜𝐨𝐦𝐦𝐞𝐧𝐭𝐬 : ${comment_count}\n｢📎｣𝐕𝐢𝐝𝐞𝐨𝐔𝐫𝐥 : ${videoUrl}\n｢📝｣ 𝐓𝐢𝐭𝐥𝐞: ${title}\n⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆`,
							attachment: videoStream.data
						}, event.threadID, event.messageID);

						// Set a checkmark reaction on success
						api.setMessageReaction("💯", event.messageID, (err) => {}, true);

					}).catch(error => {
						// Set a cross reaction on error
						api.setMessageReaction("❌", event.messageID, (err) => {
							if (err) console.error(err);
						});
						api.sendMessage("", event.threadID, event.messageID);
					});

				} catch (error) {
					// Set a cross reaction on error
					api.setMessageReaction("❌", event.messageID, (err) => {}, true);
					api.sendMessage("", event.threadID, event.messageID);
				}
			}
		}
	},
	run: function() {
		// The run function can be left empty or used for additional setup if needed.
	}
};
