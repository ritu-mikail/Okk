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
				api.setMessageReaction("⏳", event.messageID, (err) => {}, true);

				try {
					const response = await axios.get(`https://priyansh-ai.onrender.com/autodown?url=${encodeURIComponent(url)}`);
					const videoData = response.data.data[0];

					if (!response.data.success || !videoData) {
						// Set a cross reaction on error
						api.setMessageReaction("❌", event.messageID, (err) => {}, true);
						return api.sendMessage("", event.threadID, event.messageID);
					}

					const { title_count, like_count, comment_count, share_count, views_count, videoUrl } = videoData;

					await axios({
						method: 'get',
						url: videoUrl,
						responseType: 'stream'
					}).then(videoStream => {
						api.sendMessage({
							body: `⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆\n｢👍｣ 𝐋𝐢𝐤𝐞𝐬 : ${like_count}\n｢💬｣ 𝐜𝐨𝐦𝐦𝐞𝐧𝐭𝐬 : ${videoData.comment_count}\n｢📎｣𝐒𝐡𝐚𝐫𝐞 : ${videoData.share_count}\n｢📥｣ 𝐃𝐨𝐰𝐧𝐥𝐨𝐚d𝐬 : ${videoData.views_count}\n｢📝｣ 𝐓𝐢𝐭𝐥𝐞: ${videoData.title_count}\n⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆`,
							attachment: videoStream.data
						}, event.threadID, event.messageID);

						// Set a checkmark reaction on success
						api.setMessageReaction("✅", event.messageID, (err) => {}, true);

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
							body: `⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆\n｢👍｣ 𝐋𝐢𝐤𝐞𝐬 : ${data.digg_count}\n｢💬｣ 𝐜𝐨𝐦𝐦𝐞𝐧𝐭𝐬 : ${videoData.comment_count}\n｢📎｣𝐒𝐡𝐚𝐫𝐞 : ${videoData.share_count}\n｢📥｣ 𝐃𝐨𝐰𝐧𝐥𝐨𝐚d𝐬 : ${videoData.download_count}\n｢📝｣ 𝐓𝐢𝐭𝐥𝐞: ${videoData.title}\n⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆`,
							attachment: videoStream.data
						}, event.threadID, event.messageID);

						// Set a checkmark reaction on success
						api.setMessageReaction("✅", event.messageID, (err) => {}, true);

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
