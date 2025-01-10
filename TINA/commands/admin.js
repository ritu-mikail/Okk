module.exports.config = {
  name: "botadmin",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "𝗜𝘀𝗹𝗮𝗺𝗶𝗰𝗸 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁",
  description: "Manage bot admin",
  commandCategory: "config",
  usages: "[list/add/remove] [userID]",
    cooldowns: 5,
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.languages = {
    "bn": {
        "listAdmin": '[Admin] Danh sách toàn bộ người điều hành bot: \n\n%1',
        "notHavePermssion": '[Admin] Bạn không đủ quyền hạn để có thể sử dụng chức năng "%1"',
        "addedNewAdmin": '[Admin] Đã thêm %1 người dùng trở thành người điều hành bot:\n\n%2',
        "removedAdmin": '[Admin] Đã gỡ bỏ %1 người điều hành bot:\n\n%2'
    },
    "en": {
        "listAdmin": '[Admin] Admin list: \n\n%1',
        "notHavePermssion": '[Admin] You have no permission to use "%1"',
        "addedNewAdmin": '[Admin] Added %1 Admin :\n\n%2',
        "removedAdmin": '[Admin] Remove %1 Admin:\n\n%2'
    }
}

module.exports.run = async function ({ api, event, args, Users, permssion, getText }) {
    const content = args.slice(1, args.length);
    const { threadID, messageID, mentions } = event;
    const { configPath } = global.client;
    const { ADMINBOT } = global.config;
    const { userName } = global.data;
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);

    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);

    switch (args[0]) {
        case "list":
        case "all":
        case "-a": {
            const listAdmin = ADMINBOT || config.ADMINBOT || [];
            var msg = [];

            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                    const name = await Users.getNameUser(idAdmin);
                    msg.push(`- ${name}(https://facebook.com/${idAdmin})`);
                }
            }

            return api.sendMessage(getText("listAdmin", msg.join("\n")), threadID, messageID);
        }

        case "add": {
            if (permssion != 2) return api.sendMessage(getText("notHavePermssion", "add"), threadID, messageID);
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
                    listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = await Users.getNameUser(content[0]);
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `[ ${content[1]} ] » ${name}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }

        case "remove":
        case "rm":
        case "delete": {
            if (permssion != 2) return api.sendMessage(getText("notHavePermssion", "delete"), threadID, messageID);
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.ADMINBOT.findIndex(item => item == id);
                    ADMINBOT.splice(index, 1);
                    config.ADMINBOT.splice(index, 1);
                    listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.ADMINBOT.findIndex(item => item.toString() == content[0]);
                ADMINBOT.splice(index, 1);
                config.ADMINBOT.splice(index, 1);
                const name = await Users.getNameUser(content[0]);
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", 1, `[ ${content[0]} ] » ${name}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
        }

        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    };
}

module.exports.config = {
  name: "admin",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ছো্ঁট্টো্ঁ ন্ঁবা্ঁব্ঁ",
  description: "Bot operator information",
  commandCategory: "info",
  cooldowns: 1
};

module.exports.run = ({ event, api }) => api.sendMessage(`𝐈𝐒𝐋𝐀𝐌𝐈𝐂𝐊 𝐂𝐇𝐀𝐓 𝐀𝐃𝐌𝐈𝐍
-------------------------------------------- 
╭•┄┅════❁🌺❁════┅┄•╮
  আসসালামু আলাইকুম-!!🖤💫
╰•┄┅════❁🌺❁════┅┄•╯

︵💚🌺🦋
●━━•*@𝐞𝐯𝐞𝐫𝐲𝐨𝐧𝐞*

        *𝐓𝐡𝐞 𝐠𝐫𝐨𝐮𝐩 𝐰𝐨𝐧𝐚𝐫 ---• 

🤗🥀

●━━•*༅༎ ছো্ঁট্টো্ঁ ন্ঁবা্ঁব্ঁ ༅---•☺️✌️

            ༅༎ლ ࿐🤍💖🌺

- 𝐀𝐃𝐃𝐑𝐄𝐒𝐒  ⇶  𝐃𝐇𝐀𝐊𝐀

- 𝐀𝐆𝐄          ⇶  𝟐𝟎

- 𝐆𝐄𝐍𝐃𝐄𝐑   ⇶  𝐌𝐀𝐋𝐄

- 𝐂𝐋𝐀𝐒𝐒      ⇶  𝐗𝐈𝐈 

- 𝐄𝐗𝐏𝐀𝐑𝐓    ⇶  𝐎𝐍𝐋𝐘 𝐇𝐓𝐌𝐋

- 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐋𝐈𝐍𝐊  

https://www.facebook.com/hassanjahid12320

- 𝐖𝐇𝐀𝐓'𝐒 𝐔𝐏 𝐋𝐈𝐍𝐊

https://we me 01859551262

-  𝐓𝐄𝐋𝐄𝐆𝐑𝐀𝐌 𝐈𝐃 𝐋𝐈𝐍𝐊

https://telegram.org/dl

  •—»✨𝐖𝐄𝐁 𝐒𝐈𝐓𝐄 🌐✨«—•

     https://linktr.ee/muslimhakcerbd
`, event.threadID, event.messageID);