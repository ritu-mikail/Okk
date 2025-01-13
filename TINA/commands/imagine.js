module.exports = {
  config: {
    name: "imagine",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Nayan",
    description: "",
    commandCategory: "prefix",
    usages: "prompt",
    cooldowns: 10,
},

   languages: {
   "vi": {},
       "en": {
           "missing": 'use : /imagine cat'
       }
   },

run: async function({ api, event, args, lang}) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const request = require("request");
    const prompt = args.join(" ");
    const key = this.config.credits;
    const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json')
  const n = apis.data.api
    if(!prompt) return api.sendMessage(lang('missing'), event.threadID, event.messageID)

  
  


    const res = await axios.get(`${n}/nayan/img?prompt=${encodeURIComponent(prompt)}`);


  console.log(res.data)
    const data = res.data.imageUrls;
  const numberSearch = data.length
    var num = 0;
    var imgData = [];
    for (var i = 0; i < parseInt(numberSearch); i++) {
      let path = __dirname + `/cache/${num+=1}.jpg`;
      let getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
      fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
      imgData.push(fs.createReadStream(__dirname + `/cache/${num}.jpg`));
    }


    api.sendMessage({
        attachment: imgData,
        body: "🔍Imagine Result🔍\n\n📝Prompt: " + prompt + "\n\n#️⃣Number of Images: " + numberSearch
    }, event.threadID, event.messageID)
    for (let ii = 1; ii < parseInt(numberSearch); ii++) {
        fs.unlinkSync(__dirname + `/cache/${ii}.jpg`)
    }
}
 }
