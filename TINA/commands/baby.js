const axios = require('axios');

const baseApiUrl = async () => {
     return "https://www.noobs-api.rf.gd/dipto";
};

module.exports.config = {
  name: "rimi",
  version: "6.9.9",
  credits: "dipto",
  cooldowns: 0,
  hasPermssion: 0,
  description: "better than all sim simi",
  commandCategory: "chat",
  usages: `[anyMessage] OR\nteach [YourMessage] - [Reply1], [Reply2], [Reply3]... OR\nteach [react] [YourMessage] - [react1], [react2], [react3]... OR\nremove [YourMessage] OR\nrm [YourMessage] - [indexNumber] OR\nmsg [YourMessage] OR\nlist OR\nall OR\nedit [YourMessage] - [NewMessage]`,
};

module.exports.run = async function ({ api, event, args, Users }) {
  try {
    const link = `${await baseApiUrl()}/baby`;
    const dipto = args.join(" ").toLowerCase();
    const uid = event.senderID;

    if (!args[0]) {
      const ran = ["Bolo baby", "hum", "type help baby", "type !baby hi"];
      const r = ran[Math.floor(Math.random() * ran.length)];
      return api.sendMessage(r, event.threadID, event.messageID);
    }

    if (args[0] === 'remove') {
      const fina = dipto.replace("remove ", "");
      const respons = await axios.get(`${link}?remove=${fina}&senderID=${uid}`);
      return api.sendMessage(respons.data.message, event.threadID, event.messageID);
    }

    if (args[0] === 'rm' && dipto.includes('-')) {
      const [fi, f] = dipto.replace("rm ", "").split(' - ');
      const respons = await axios.get(`${link}?remove=${fi}&index=${f}`);
      return api.sendMessage(respons.data.message, event.threadID, event.messageID);
    }

    if (args[0] === 'list') {
      if (args[1] === 'all') {
        const res = await axios.get(`${link}?list=all`);
        const data = res.data.teacher.teacherList;
        const teachers = await Promise.all(data.map(async (item) => {
          const number = Object.keys(item)[0];
          const value = item[number];
          const name = await Users.getName(number) || "unknown";
          return { name, value };
        }));
        teachers.sort((a, b) => b.value - a.value);
        const output = teachers.map((teacher, index) => `${index + 1}/ ${teacher.name}: ${teacher.value}`).join('\n');
        return api.sendMessage(`Total Teach = ${res.data.length}\n\n👑 | List of Teachers of baby\n${output}`, event.threadID, event.messageID);
      } else {
        const respo = await axios.get(`${link}?list=all`);
        return api.sendMessage(`Total Teach = ${respo.data.length}`, event.threadID, event.messageID);
      }
    }

    if (args[0] === 'msg' || args[0] === 'message') {
      const fuk = dipto.replace("msg ", "");
      const respo = await axios.get(`${link}?list=${fuk}`);
      return api.sendMessage(`Message ${fuk} = ${respo.data.data}`, event.threadID, event.messageID);
    }

    if (args[0] === 'edit') {
      const command = dipto.split(' - ')[1];
      if (command.length < 2) {
        return api.sendMessage('❌ | Invalid format! Use edit [YourMessage] - [NewReply]', event.threadID, event.messageID);
      }
      const res = await axios.get(`${link}?edit=${args[1]}&replace=${command}`);
      return api.sendMessage(`changed ${res.data.message}`, event.threadID, event.messageID);
    }

    if (args[0] === 'teach' && args[1] !== 'amar' && args[1] !== 'react') {
      const [comd, command] = dipto.split(' - ');
      const final = comd.replace("teach ", "");
      if (command.length < 2) {
        return api.sendMessage('❌ | Invalid format! Use [YourMessage] - [Reply1], [Reply2], [Reply3]... OR remove [YourMessage] OR list OR edit [YourMessage] - [NewReply]', event.threadID, event.messageID);
      }
      const re = await axios.get(`${link}?teach=${final}&reply=${command}&senderID=${uid}`);
      const name = await Users.getName(re.data.teacher) || "";
      return api.sendMessage(`✅ Replies added ${re.data.message}\nTeacher: ${name || "unknown"}\nTeachs: ${re.data.teachs}`, event.threadID, event.messageID);
    }

    if (args[0] === 'teach' && args[1] === 'amar') {
      const [comd, command] = dipto.split(' - ');
      const final = comd.replace("teach ", "");
      if (command.length < 2) {
        return api.sendMessage('❌ | Invalid format! Use [YourMessage] - [Reply1], [Reply2], [Reply3]... OR remove [YourMessage] OR list OR edit [YourMessage] - [NewReply]', event.threadID, event.messageID);
      }
      const re = await axios.get(`${link}?teach=${final}&senderID=${uid}&reply=${command}&key=intro`);
      return api.sendMessage(`✅ Replies added ${re.data.message}`, event.threadID, event.messageID);
    }

    if (args[0] === 'teach' && args[1] === 'react') {
      const [comd, command] = dipto.split(' - ');
      const final = comd.replace("teach react ", "");
      if (command.length < 2) {
        return api.sendMessage('❌ | Invalid format! Use [teach] [YourMessage] - [Reply1], [Reply2], [Reply3]... OR [teach] [react] [YourMessage] - [react1], [react2], [react3]... OR remove [YourMessage] OR list OR edit [YourMessage] - [NewReply]', event.threadID, event.messageID);
      }
      const re = await axios.get(`${link}?teach=${final}&react=${command}`);
      return api.sendMessage(`✅ Replies added ${re.data.message}`, event.threadID, event.messageID);
    }

    if (['amar name ki', 'amr nam ki', 'amar nam ki', 'amr name ki'].some(phrase => dipto.includes(phrase))) {
      const response = await axios.get(`${link}?text=amar name ki&senderID=${uid}&key=intro`);
      return api.sendMessage(response.data.reply, event.threadID, event.messageID);
    }

     const a = (await axios.get(`${link}?text=${dipto}&senderID=${uid}&font=1`)).data.reply;
    return api.sendMessage(a, event.threadID,
        (error, info) => {
          global.client.handleReply.push({
            name: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            lnk: a,
            apiUrl: link
          });
        }, event.messageID);

  } catch (e) {
    console.error('Error in command execution:', e);
    return api.sendMessage(`Error: ${e.message}`, event.threadID, event.messageID);
  }
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
try{
  if (event.type == "message_reply") {
    const reply = event.body.toLowerCase();
    if (isNaN(reply)) {
      const b = (await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(reply)}&senderID=${event.senderID}&font=1`)).data.reply;
      await api.sendMessage(b, event.threadID, (error, info) => {
          global.client.handleReply.push({
            name: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            lnk: b
          });
        }, event.messageID,
      )}}
}catch(err){
    return api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);
}};

   
module.exports.handleEvent = async function ({ api, event, Users, }) {
try{
    const body = event.body ? event.body.toLowerCase() : ""
    if(body.startsWith("nazrul") || body.startsWith("sumi") || body.startsWith("সুমি")){
var id = event.senderID;
    var name = await Users.getNameUser(event.senderID);
        const arr = body.replace(/^\S+\s*/, "")
      if(!arr) {
       const ran = ["🍒)⎯⃝লিৃ্ঁপৃ্ঁ কিৃ্ঁসৃ্ঁ কৃ্ঁরুৃ্ঁমৃ্ঁ আৃ্ঁয়ৃ্ঁ🥺","⎯͢⎯⃝🩵 খাৃ্ঁলি্ঁ ডাৃ্ঁকেঁ দেৃ্ঁখ্ঁ তো্ঁ কে্ঁম্ঁন্ঁ ডা্ঁ লা্ঁগে্ঁ😒🌚🔪⎯͢⎯⃝💚","≛⃝🌺উ্ঁফ্ঁস্ঁ জা্ঁনস্ঁ✿︎'ন্ঁক্ঁ দি্ঁও্ঁ কি্ঁন্তুু্ঁ༉༐༐🌺🥺","🙄🙄★≛⃝🌸🍂◄──⃜⃜͢͢⎼⎼⎼⃡⃝⃨ ছ্যাকা খাইলে নক দিছ শান্তনা দিবো 🙄🙄★≛⃝🌸🍂","༎⎯͢⎯⃝দেৃ্ঁখৃ্ঁতেৃ্ঁ কিৃ্ঁ কৃ্ঁমৃ্ঁ সুৃ্ঁন্দৃ্ঁরৃ্ঁ ছিৃ্ঁলাৃ্ঁমৃ্ঁ রেৃ্ঁ প্রৃ্ঁপোৃ্ঁজৃ্ঁ কৃ্ঁরৃ্ঁলিৃ্ঁ নাৃ্ঁ যেৃ্ঁ•⎯͢⎯⃝🩷😾🪽🪄","┉❈🐰⋆⃝চলো রিলেশন সিপ স্ট্যাটাস দেয়🙈❈┄","•⎯͢⎯⃝🩷  ꙰আ্ঁসো্ঁ সো্ঁনা্ঁ ⋆⃝প্রে্ঁম্ঁ 𝄞⋆⃝ক্ঁরি্ঁ༎🐰ক্ঁরি্ঁ 🙊"," উপস সোনা তুমি এত কিউট কেন🙈💋","𝄞⋆⃝🥵⋆⃝বা্ঁবু্ঁতো্ঁমা্ঁর্ঁ𝄞⋆⃝অ্ঁলি্ঁতে্ঁ গ্ঁলি্ঁতে্ঁ লা্ঁভ্ঁ ই্ঁউ্ঁ🥵⋆⃝𝄞⋆⃝","𝄞⋆⃝🥵⋆⃝বা্ঁবু্ঁ এ্ঁই্ঁতো্ঁ 𝄞⋆⃝আ্ঁমি্ঁ দে্ঁখা্ঁ যা্ঁয়্ঁ🥵⋆⃝𝄞⋆⃝","𝄞⋆⃝🥵ওঁগোৃ্ঁ𝄞⋆⃝ কিৃ্ঁ রাৃ্ঁন্না্ৃঁ 𝄞⋆⃝ক্ঁর্ঁছো্ঁ𝄞⋆⃝ আ্ঁজ্ঁকে্ঁ.𝄞⋆⃝😝","𝄞⋆⃝🥵চু্ঁম্মা্ঁ𝄞⋆⃝চু্ঁম্মি্ঁ 𝄞⋆⃝স্কু্ঁল্ঁ 𝄞⋆⃝থে্ঁকে্ঁ 𝄞⋆⃝অ্ঁটো্ঁ𝄞⋆⃝পা্ঁস্ঁ𝄞⋆⃝ ক্ঁর্ঁছি্ঁ𝄞⋆⃝🥵","𝄞⋆⃝🥵জা্ঁন্স্ঁ 𝄞⋆⃝কোৃঁলেৃঁ 𝄞⋆⃝নাৃঁওৃঁ❥᭄ ⑅⃝🌺😻","❥᭄ ⑅⃝🌺উৃঁম্মাৃঁ𝄞⋆⃝দিৃঁলেৃঁ𝄞⋆⃝চৃঁকৃঁলেৃঁটৃঁ দিৃঁমুৃঁ❥᭄🤤 ⑅⃝🌺"];
      const r = ran[Math.floor(Math.random() * ran.length)];
      if (!arr) return api.sendMessage({body: `${name}\n\n ${r}`,
mentions: [{ tag: name, id: event.senderID }]  
   }, event.threadID, (error, info) => {
          global.client.handleReply.push({
            name: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID
          });
        }, event.messageID,
      )
    }
    const a = (await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(arr)}&senderID=${event.senderID}&font=1`)).data.reply;     
        await api.sendMessage(a, event.threadID, (error, info) => {
          global.client.handleReply.push({
            name: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            lnk: a
          });
        }, event.messageID,
      )}
}catch(err){
    return api.sendMessage(`Error Baby 😞😞😓`, event.threadID, event.messageID);
}};
