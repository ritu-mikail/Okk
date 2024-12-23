const axios = require("axios");
class Imgur {
  constructor() {
    this.clientId = "fc9369e9aea767c", this.client = axios.create({
      baseURL: "https://api.imgur.com/3/",
      headers: {
        Authorization: `Client-ID ${this.clientId}`
      }
    })
  }
  async uploadImage(url) {
    return (await this.client.post("image", {
      image: url
    })).data.data.link
  }
}
class Modules extends Imgur {
  constructor() {
    super()
  }
  get config() {
    return {
      name: "imgur",
      description: "Upload image to imgur",
      version: "1.0.0",
      credits: "nazrul",
      cooldown: 5,
      usage: "imgur <url>",
      commandCategory: "Công cụ",
      hasPermssion: 0
    }
  }
  run = async ({ api, event }) => {
    var array = [];
    if ("message_reply" != event.type || event.messageReply.attachments.length < 0) return api.sendMessage(" Please reply to the photo or video", event.threadID, event.messageID);
    for (let { url } of event.messageReply.attachments) await this.uploadImage(url).then((res => array.push(res))).catch((err => console.log(err)));
    return api.sendMessage(`${array.join("\n")}`, event.threadID, event.messageID)
  }
}
module.exports = new Modules;
