const axios = require('axios');

const baseApiUrl = async () => {
     return "https://www.noobs-api.rf.gd/dipto";
};

module.exports.config = {
  name: "baby",
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
    if(body.startsWith("bby") || body.startsWith("বট") || body.startsWith("bot")){
var id = event.senderID;
    var name = await Users.getNameUser(event.senderID);
        const arr = body.replace(/^\S+\s*/, "")
      if(!arr) {
       const ran = ["মেঘের গল্প আকাশ ঘিরে \nরোদের লুকোচুরি,\nবুকের ভেতর থাকলে আগুন ইচ্ছেমতো পুড়ি।\n\nলেখার কলম থাকলে হাতে \nগল্প বাঁধি যতো,\nতুমিও লেখো কাব্য হাজার \nনিজের ইচ্ছেমতো।\n\nইচ্ছে হলেই হাসতে থাকো\nতারাও দেখো হাসে,\nভাতের গল্প থাকবে শুধু\nক্ষুধার উপন্যাসে।","ওই তো ওরা ভালোই আছে\nহাসছে দেখো রোজ,\nএই শহরের ব্যস্ত জীবন\nকে কার রাখে খোঁজ!\n\nখোঁজ রেখেছে চোখের নদী\nরৌদ্রে ভেজা কাক,\nখোঁজ না রাখার মানুষগুলো\nতোরাও ভালো থাক।\n\nথাকুক ভালো মায়ের আঁচল জোছনা ভরা বেড,\nঘুমপাড়ানির কথায় মোড়া\nমিছিল ব্যারিকেড।","সুখের খোঁজে পথ হেঁটেছি\nসুখের দেখা নাই,\nঅসুখটা আজ দিচ্ছে ধরা\nপথের ঠিকানায়।\n\nপথের পাশে পথ চলেছে\nহারিয়ে যাওয়ার ভয়!\nবৃথা নেশায় জীবনটা আজ\nকরেছি নয়-ছয়।","ভুল জায়গায় সেক্রিফাইজ\nসবচে বড়ো ভুল,\nএই জীবনে সফলতা\nদেবে না একচুল।\n\nভুল মানুষের সাথে যদি\nকম্প্রোমাইজ হয়,\nচলার পথে সুখ শান্তি\nপাবে না নিশ্চয়ই।","কথার ভিড়ে হারায় কথা\nব্যথার স্রোতে মন,\nএকলা ঘরে তোমায় এখন\nবড্ড প্রয়োজন।\n\nজানি না আজ কার বুকেতে\nখুঁজলে সুখের দাম,\nঠোঁটের কোণে জড়িয়ে গেছে\nতোমারই ডাকনাম।","কার দেওয়া ফুল খোঁপার চুলে\nযত্নে গুঁজে রাখিস,\nএই ঘর আজ আঁধার করে\nকার ঘরে আজ থাকিস?\n\nতোর মনে আজ নতুন মানুষ\nযত্নে ছবি আঁকে,\nআমার মতোই সেই মানুষটা\nতোর খবর কি রাখে?\n\nআমার খবর রাখছে এখন\nশূন্য ভেজা পাতা,\nকান্না জলে ভিজছে আজও\nরাত বিছানার কাঁথা।","বদলে যাওয়ার অচেনা শহরে\nকি দারুণ তুমি সাজো!\nপুরানো কে খুঁজবো বলেই\nবদলে যাইনি আজও\n\nকতো সহজেই পিছুটান ভুলে\nআবারও গল্প লেখা,\nআজ আমার গল্পে একটা আমিই\nরয়ে গেল বড়ো একা!","মুখ নেই আজ মুখোশের ভিড়ে\nব্যস্ততা শুধু আছে\nপ্রিয়জন নামে যারা ছিল পাশে\nতারাও বদলে গেছে\n\nহারানো মানুষ খুঁজে পাওয়া যায়\nদিন বদলের ঝড়ে\nবদলে যাওয়া সে মানুষগুলোকে\nখুঁজবো কেমন করে","খুব জ্বালাতন করছি তোমায়\nদিচ্ছি শুধু ব্যথা,\nএকটা সময় ঘুমিয়ে যাবো\nবলবো না আর কথা!\n\nসেদিন তোমার কাঁদবে দু'চোখ\nআমায় কাছে পেতে,\nস্মৃতি হয়েই থাকবো পড়ে\nফোনের গ্যালারিতে\n\nকনটেক্টের সেভ করা নাম\nছুঁড়েই দিও ফেলে,\nকল মেসেজ আর আসবে না গো\nতোমার মোবাইলে\n\nযাবো যেদিন ফিরবো না গো\nবিদায় বলে দিও,\nযত্ন করে চুল বেঁধো আর\nকপালে টিপ নিও","কোন আকাশে মেললো ডানা\nআমার প্রিয় পাখি!\nএক প্রেমিকা স্বপ্ন হাজার\nশূন্য বুকে রাখি\n\nপাখির বুকে নেই এখন আর\nফিরে আসার তাড়া,\nআকাশটা তাই একলা ভীষণ\nদারুণ ছন্ন ছাড়া!","খুব গোপনের কান্নাগুলো\nপায় নি পথের দেখা,\nএকটা ছেলে নিঝুম্ ঘরে\nগান লিখেছে একা।\n\nসেই ছেলেটা ভীষণ বোকা\nস্মৃতির ছবি আঁকে,\nযাকে ভাবে, সেই তো এখন\nঅন্য ঘরে থাকে।","হারায় নি সে, বদলে গেছে\nখুঁজবো কেমন করে!\nবদলে গেছে মনের শহর\nরঙ বদলের ঝড়ে।\n\nযাও না তুমি যতই দূরে\nদাও না যতই আড়ি,\nএখন আমি হাজার ব্যথা\nসহ্য করতে পারি।","সমাজ যদি আঙুল তোলে\nনষ্টা বলে তোকে\nমুখ লুকিয়ে থাকিস না রে\nআদর ভাঙা শোকে।\n\nসঠিক পথে থাকিস যদি\nভয় কি মেয়ে তোর\nমনে রাখিস রাতের পরেই\nআসবে নতুন ভোর।","ঘুমভাঙা পাখি নেই\nসকালটা নিঝঝুম্!\nউড়ে গেছে সেই পাখি\nভাঙায় না আর ঘুম।\n\nস্মৃতিগুলো পড়ে আছে\nপড়ে আছে ভাঙা মন!\nপ্রিয়জন হতে হতে\nহয়ে গেছি প্রয়োজন।","একটা শহর থমকে থাকুক\nচোখের পাতা ঘিরে,\nখুঁজবো না প্রেম এই পৃথিবীর\nলক্ষ লোকের ভিড়ে।\n\nখুঁজবো না আর আলোর জীবন\nঠোঁটের কোণে হাসি,\nএকলা থাকার জীবনটা আজ\nবড্ড ভালোবাসি।","মনের মানুষ হারিয়ে গেছে\nগল্প গেছে থেমে!\nমানুষটা আজ মন বেঁধেছে\nঅন্য কারো প্রেমে।\n\nকেউ ডাকে না ডাকনামেতে\nকেউ আসে না পাশে,\nসে তো এখন অন্য মানুষ\nভীষণ ভালোবাসে।\n\nআমিই এখন একলা পাখি\nএকলা জেগে থাকি,\nহয় নি বলা অনেক কথা\nরয়েই গেছে বাকি।","স্বার্থের টানে সেই যে হারালি\nদেখলি না ফিরে আর\nশহরটা জুড়ে রেখে গেলি\nশুধু অথই অন্ধকার!\n\nগল্পটা আর লেখা হলো না রে\nকলমের কালি শেষ!\nহিসেবের খাতা খুলে দেখি,\nআমি হয়ে গেছি ভাগশেষ।","স্বপ্ন আমার অনেক বড়\nনীল আকাশের মতো,\nস্বপ্ন আমার পাতাল পুরে\nহোকনা পানি যত ।\n\nস্বপ্ন আমার মনের ঘরে\nরঙ বেরঙের ফুল,\nস্বপ্ন আমার মধুয় ভরা\nমৌমাছি মাশগুল।\n\nস্বপ্ন আমার মাতাল হাওয়া\nছুটে অচিন পানে,\nস্বপ্ন আমার উড়ে বেড়ায়\nমিষ্টি পাখির গানে","তোর আঁচলে বৃষ্টি খুঁজি\nভালো থাকার গান,\nতোর হাসিতে লুকিয়ে থাকে\nআদুরে সম্মান।\n\nতোর চোখেতে ইচ্ছে করে\nসাঁতরে হবো পার,\nমুগ্ধ করে তোর স্বভাব আর\nমিষ্টি ব্যবহার।\n\nএমনি করেই থাকিস পাশে\nবাসিস ভালো বেশ,\nতোর ছোঁয়াতে কষ্টগুলো\nহঠাৎ নিরুদ্দেশ!","আমি না হয় ভীষণ খারাপ\nবড্ড বাজে ছেলে,\nশেষ দেখাটাও দিলে না হায়\nহঠাৎ চলে গেলে!\n\nআমিও ঠিক যাবো চলে\nআসবো না আর ফিরে,\nএক জীবনের সবটুকু সুখ\nথাকুক তোমায় ঘিরে।\n\nথাকুক ঘিরে নতুন মানুষ\nকাজলা চোখের কোণে,\nআমিই না হয় হারিয়ে গেলাম\nতোমার প্রয়োজনে।","ভুল হলে আজ ভীষন রাগে\nকেউ করে না মানা,\nদূরে গেলেও ফুরায় কি আর\nমনের লেনা দেনা !\n\nফুরিয়ে গেলে ভালোই হতো\nপড়তো না আর মনে,\nআমিতে নয়, থাকতে তুমি\nঅন্য কারো গানে।\n\nআর কখনো বলবো না গো\nআসতে হবে ফিরে,\nএক জীবনের সবটুকু সুখ\nথাকুক তোমায় ঘিরে।","কেমন করে বোঝাই আমি\nবড্ড এলোমেলো!\nবুকের ভিতর ঘুমিয়ে থাকে\nতোমার স্মৃতিগুলো।\n\nএকলা জাগি রাতের বুকে\nকান্না জমে চোখে\nরাতপাখিটাও কেঁদে ওঠে\nনা জানি কার শোকে!","তোর মনে যে দিচ্ছে হানা\nচলে যা তার কাছে,\nদেখবি হঠাৎ প্রেম বেঁচে নেই\nমানুষ বেঁচে আছে!\n\nনিজের ভুলে কাঁদবি যেদিন\nথাকবো না আর আমি\nবুঝবি সেদিন তোর জীবনে\nকে ছিলো খুব দামী।","মুখের মিছিলে মুখোশের ভিড়\nস্বার্থের ঘরে শর্ত,\nপুরুষ কখনো হয় না আপন\nনা থাকলে তার অর্থ।\n\nটাকার ওজনে মন মাপামাপি\nঅনর্থে সব মত্ত!\nকেউ কি কখনো করেছে আপন\nপুরুষের বেকারত্ব!","অন্য ঘরে খুব আদরে\nবাঁধলি অভিমান,\nরোজ রাত্রে কে শোনায় আজ\nঘুম পাড়ানির গান?\n\nআমার এখন ঘুম আসে না\nএকলা জাগি রাত,\nরাত কাটলেও আগের মতো\nহয় না সুপ্রভাত।\n\nতবুও তুই ভীষণ ভালো\nহয়তো স্বার্থপর!\nবদলে যাওয়ার স্বভাব দোষে\nগুছিয়ে নিলি ঘর।","একটা মানুষ চাইলি না তুই\nএকের অধিক চাই,\nপথ বদলের নেশাটা তোর\nকিসের চাহিদায়!\n\nপারফেক্ট তুই পাবি না রে\nপাবি না সব ঠিক,\nসবার মনেই কমতি থাকে\nএটাই স্বাভাবিক।\n\nঅন্য কারো মন ভেঙে আর\nকরিস না তুই পাপ,\nভালো থাকিস,সুখেই থাকিস-\nদিলাম অভিশাপ।","আজ অভিমান কিছু নেই\nনেই অভিযোগ,\nধীরে ধীরে কেটে গেছে\nসব যোগাযোগ।\n\nআজও আছে কিছু ছায়া\nস্মৃতিদের গান,\nমায়াগুলো কি দারুণ!\nবাঁধে পিছুটান।","ডেকে ডেকে তোকে ক্লান্ত হয়েছি\nহেঁটে গেলি কার সাথে?\nঅভিমানে নয়, হারালি রে তুই\nকি দারুণ অজুহাতে!\n\nঠকে গিয়ে আজ ভালোই আছি রে\nনেই আর অগোছালো,\nএই পৃথিবীতে ঠকানোর চেয়ে\nঠকে যাওয়া ঢের ভালো।","হাতের উপর হাত রেখেছি\nমনের উপর মন,\nতবুও সে চাইলো শেষে\nঅন্য প্রিয়জন।\n\nদোষটা ছিল আমারই খুব\nকেউ নেবে না দায়,\nএই ক'দিনে হুট করে কি\nমানুষ চেনা যায়!","খুব গোপনের কান্নাগুলো\nপায় নি পথের দেখা,\nএকটা ছেলে নিঝুম্ ঘরে\nগান লিখেছে একা।\n\nসেই ছেলেটা ভীষণ বোকা\nস্মৃতির ছবি আঁকে,\nযাকে ভাবে,\nসেই তো এখন\nঅন্য ঘরে থাকে।","রাত্রি এলেই মৃত্যু কিনি\nনগদ কিংবা ধার,\nবুক পকেটে তোর ছবিটা\nস্মৃতির ক্যালেন্ডার।\n\nদেখলি না আর গোপন ঘরে\nদু'চোখ ভরা জল,\nহঠাৎ করেই ঘুমিয়ে গেলে\nকেমন হবে বল!\nভোরের বেলা ডাকবি কতো\nভাঙবে না আর ঘুম!\nনিজের মতো গুছিয়ে নিবি\nমনেরই ক্লাসরুম।","অনেক বছর পেরিয়ে গেছে\nঅনেক ব্যবধান !\nআজও কি তোর পড়ে মনে\nপুরানো সেই গান?\n\nবলতি আমায় বাঁচবো না রে\nনা পেলে আজ তোকে,\nকেমন করে আছিস বেঁচে\nবুকে পাথর রেখে!\n\nকেউ কখনো যায় না মরে\nঠিকই বেঁচে থাকে,\nশেষে হাতটি রেখে নতুন হাতে\nকে কার খবর রাখে!","পরের কষ্টে হাসে যারা\nতারাই থাকুক সুখে,\nসব অপমানের জবাব এখন\nদিই না নিজের মুখে।\n\nবৃথা তর্কে যাওয়ার চেয়ে\nচুপ থাকাটাই শিখি,\nখারাপ-ভালোর জবাবগুলো\nসময় দেবে ঠিকই।","মেঘ কাঁদলে বৃষ্টি ঝরে\nজল থই থই নদী,\nআমার এ মন হঠাৎ করে\nমেঘ হয়ে যায় যদি!\n\nমেঘের পাশে রৌদ্র থাকে\nসান্ত্বনা দেয় কতো,\nআমার আছে শূন্য শহর\nহারিয়ে যাওয়ার মতো।","কোন ঠিকানায় বাঁধলি রে ঘর\nবাঁধলি সুখের বাসা,\nঘৃণার মানুষ ঘৃণায় থাকি\nচাই না ভালোবাসা।\n\nচাই না কোনো সান্ত্বনা আজ\nথাকুক বুকে ক্ষত,\nচাইছি শুধু- একটু আমি\nবাঁচবো নিজের মতো।","বারে বারে ব্যর্থ মানেই\nপিছিয়ে যাওয়া নয়,\nধৈর্য যারা রাখতে পারে\nতারাই সফল হয়।\n\nনিজের মতো এগিয়ে চলো\nকিসের মতামত!\nএকটা রাস্তা বন্ধ হলে\nখোলে হাজার পথ।","আধাঁর ঘিরে সন্ধ্যে নামে\nমুখখানা তোর কই ?\nএই তো সেদিন বললি রে-\nতোর মনের মানুষ হই\n\nআজকে তবে কোন ভুলে তুই\nখুঁজলি অন্য মন?\nবলবো না রে, আর কখনো-\nতোকেই প্রয়োজন।","কিছু মানুষের কথা \nবেশি শোনাতে নেই দম,\nতারা ভাবে- আমার\nচেয়ে সবাই জানে কম।\n\nধৈর্য নিয়ে শোনে যারা\nতারাই জ্ঞানী হয়,\nঅল্প জেনেই সব\nজেনেছি মূর্খে পরিচয়।","স্মৃতিটুকু নিয়ে অনেক জীবনই\nঅভিনয় সুখে বাঁচে,\nচেনা মুখ শুধু  হাতরে বেড়াই\nজানালার ভাঙা কাঁচে\n\nজানবি কি করে হৃদপিন্ডটা\nকার ছবি বেঁধে রাখে!\nকখনো কি তুই বেসেছিস ভালো\nআমার এই আমিটাকে!","বিনা কারনেই  যতো অজুহাত\nভয়ংকর এক রোগ,\nবারবার শুধু স্বভাবের দোষে\nঅকারনে অভিযোগ।\n\nকার কাছে তুই শান্তি খুঁজবি\nঅশান্ত করে মন!\nস্বার্থ ফুরোলে চলে যাবি তাই\nঅজুহাত প্রয়োজন।","স্বার্থবন্দী চাওয়া-পাওয়া\nকে কার খবর রাখে!\nদাঁত থাকতে বোঝে না মন\nদাঁতের মূল্যটাকে!\nখুব সহজেই সব পেলে আর\nমূল্য কি কেউ বোঝে!\nহারিয়ে যাওয়ার পরই সবাই\nপাগল হয়ে খোঁজে।","হাত বদলের গল্পকথায়\nভাঙ্গিস না তুই ঘর\nহাজার না হোক, একটা গল্পে\nথাকিস জীবন ভর\n\nআমার জীবন তোর করেছি\nএকটু পাশে থাক,\nপালকি পালকি এই আমিটা\nযত্নে বেঁধে রাখ।","যার ছবিটা আঁকছো মনে\nরঙের তুলি দিয়ে,\nসে তো এখন ভালোই আছে\nঅন্য চিন্তা নিয়ে।\nযার কথাটা ভাবছো ভীষণ\nবাধছো মনের ফ্রেমে,\nখোঁজ নাও সে মন বেধেছে\nঅন্য কারো প্রেমে।","কত ভাঙা পথ, পথিক হয়েছে\nদাঁড়িয়ে রয়েছে ঠায়,\nতুমিও থেকেছো হয়তো বা কারও\nআসার অপেক্ষায়\nশেষ কি হয়েছে অপেক্ষাগুলো\nফিরে কি পেয়েছ তাকে?\nনাকি কান্না রেখেছ! আকাশ যেভাবে\nবৃষ্টি আগলে রাখে।","এখনো কি কান্না করো\nবায়না ধরো রাগে?\nসে কি তোমায় চোখ মুছে দেয়\nজরিয়ে ধরার আগে?\n\nহয়তো তুমি ভালোই আছো\nথাকুক ঠোঁটে হাসি,\nইচ্ছে হলেও জায় কি বলা\nবড্ড ভালোবাসি।","শেষ বিকেলের ক্লান্ত পাখি\nগল্প শোনায় রোজ,\nসেই পাখিটা একলা ভীষণ\nনেয় না তো কেউ খোঁজ!\nপাখি টা  আজ ভালোই আছে\nরঙ্গিন ডানায় সুখ,\nযন্ত করেই লুকিয়ে রাখে\nব্যাথায় পোড়া বুক।"];
      const r = ran[Math.floor(Math.random() * ran.length)];
      if (!arr) return api.sendMessage({body: `${name}\n\n ${r}\n⋆✦⎯⎯⎯⎯⎯⎯⎯✦⋆\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫  𝐈𝐬𝐥𝐦𝐚𝐢𝐜𝐤 𝐂𝐡𝐚𝐭`,
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
    return api.sendMessage(``, event.threadID, event.messageID);
}};
