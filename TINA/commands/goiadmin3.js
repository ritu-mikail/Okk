module.exports.config = {
  name: "goiadmin4",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "nayan",
    description: "mention",
    commandCategory: "user",
    usages: "tag",
    cooldowns: 5,
};
module.exports.handleEvent = function({ api, event, args,client,Users,Threads,__GLOBAL,Currencies }) {
  const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
if (event.senderID !== "61559715091297") {
    var aid = ["61559715091297"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var hi = ["আমার বস চিপায়  বিজি আছে\n যা বলার আমাকে বলো", "মেয়ে পটাতে গেছে😁😁😁", "এমন ভাবে মেনশান না দিয়ে একটা জি এফ দাও🙈🙈", "এত ডাকিস কেন😡😡😡\n আমার বস অনেক বিজি", "বস কই তুমি\nতোমারে এক বলদে খোজ করে 😑😑😁🤣"];
      var know = hi[Math.floor(Math.random() * hi.length)];

var link = [

"https://i.imgur.com/hgXTRP0.jpeg",
];

var callback = () => api.sendMessage({body:`${know}`,attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg"));	

return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());

};
module.exports.run = async function({}) {
                 }

