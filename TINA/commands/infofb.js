module.exports.config = {
    name: "infofb",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Dũngkon",
    description: "Lấy uid facebook",
    commandCategory: "Tiện ích",
    usages: "uid reply/@tag",
    cooldowns: 0
    };
module.exports.run = async function ({ api, event, args, Users, Currencies }) {
  const axios = global.nodemodule["axios"];
  const fs = require("fs-extra");
  const request = require("request");
    if (Object.keys(event.mentions).length == 1) {
      var mentions = Object.keys(event.mentions)
      var name = (await Users.getData(mentions)).name
      var getlink = (await axios.get(`https://facebook-info-api.faheem001.repl.co/facebook/timejoine?uid=${mentions}`)).data;
      var day = getlink.day
      var time = getlink.time
      var getlink = (await axios.get(`https://facebook-info-api.faheem001.repl.co/facebook/getinfo?uid=${mentions}`)).data;
      var ten = getlink.name
      var link_profile = getlink.link_profile
      var relationship_status = getlink.relationship_status
      var birthday = getlink.birthday
      var username = getlink.username
      var follower = getlink.follower
      var tichxanh = getlink.tichxanh == false ? "Không!" : getlink.tichxanh == true ? "Có !" : "Đéo";
      var location = getlink.location = getlink.location || "không công khai"
      var gender = getlink.gender == 2 ? "Nam" : gender == 1 ? "Nữ" : "Không công khai";
      var created_time = getlink.created_time
      var name1 = getlink.love.name = getlink.love.name || "không có"
      var id = getlink.love.id = getlink.love.id || "không có"
      var callback = () => api.sendMessage({
        body: `😚Tên: ${ten}\n🏝Link: ${link_profile}\n💦Tên người dùng: ${username}\n✅Tích xanh: ${tichxanh} \n🐧Uid: ${mentions}\n🦋Giới tính: ${gender}\n⏱Ngày tạo tài khoản: ${day}\n⏱Giờ tạo tài khản: ${time}\n👥Follow: ${follower}\n🎂Sinh nhật: ${birthday}\n💌Mối quan hệ: ${relationship_status}\n💞Love name: ${name1}\n💓Id love: ${id}\n🏡Sống tại: ${location}`,
        attachment: fs.createReadStream(__dirname + "/cache/if.png")
      },
        event.threadID, () => fs.unlinkSync(__dirname + "/cache/if.png"), event.messageID);
      return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=1500&width=1500&access_token=463372798834978|csqGyA8VWtIhabZZt-yhEBStl9Y`))
        .pipe(fs.createWriteStream(__dirname + '/cache/if.png'))
        .on('close', () => callback());
    }
    else {
      if (!args[0]) {
        if (event.type == "message_reply")
          idmen = event.messageReply.senderID
        else idmen = event.senderID;
        var n = (await Users.getData(idmen)).name;
        var getlink = (await axios.get(`https://facebook-info-api.faheem001.repl.co/facebook/timejoine?uid=${idmen}`)).data;
      var day = getlink.day
      var time = getlink.time
        var getlink = (await axios.get(`https://facebook-info-api.faheem001.repl.co/facebook/getinfo?uid=${idmen}`)).data;
         var ten = getlink.name
         var link_profile = getlink.link_profile
         var gender = getlink.gender
         var relationship_status = getlink.relationship_status
         var birthday = getlink.birthday
         var username = getlink.username
         var follower = getlink.follower
         var tichxanh = getlink.tichxanh == false ? "Không!" : getlink.tichxanh == true ? "Có !" : "Đéo";
         var location = getlink.location = getlink.location || "không công khai"
         var gender = getlink.gender == 2 ? "Nam" : gender == 1 ? "Nữ" : "Không công khai";
         var created_time = getlink.created_time
         var name1 = getlink.love.name = getlink.love.name || "không có"
         var id = getlink.love.id = getlink.love.id || "không có"
        var callback = () => api.sendMessage({ 
         body: `😚Tên: ${ten}\n🏝Link: ${link_profile}\n💦Tên người dùng: ${username}\n✅Tích xanh: ${tichxanh} \n🐧Uid: ${idmen}\n🦋Giới tính: ${gender}\n⏱Ngày tạo tài khoản: ${day}\n⏱Giờ tạo tài khản: ${time}\n👥Follow: ${follower}\n🎂Sinh nhật: ${birthday}\n💌Mối quan hệ: ${relationship_status}\n💞Love name: ${name1}\n💓Id love: ${id}\n🏡Sống tại: ${location}`,
          attachment: fs.createReadStream(__dirname + "/cache/if.png")
        },
          event.threadID, () => fs.unlinkSync(__dirname + "/cache/if.png"), event.messageID);
        return request(encodeURI(`https://graph.facebook.com/${idmen}/picture?height=1500&width=1500&access_token=463372798834978|csqGyA8VWtIhabZZt-yhEBStl9Y`))
          .pipe(fs.createWriteStream(__dirname + '/cache/if.png'))
          .on('close', () => callback());
      }
    }
  }