const got = require('got');
const fs = require('fs-extra');
const axios = require('axios');

module.exports = {
  config: {
    name: "ytdown",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "SMART SHANKAR",
    description: "Automatically downloads YouTube videos using the provided API.",
    commandCategory: "Utilities",
    usages: "",
    cooldowns: 5,
  },
  run: async function ({ events, args }) {},
  handleEvent: async function ({ api, event, args }) {
    const content = event.body ? event.body : "";
    const body = content.toLowerCase();

    const youtubeLinkRegex = /https:\/\/(www\.)?youtube\.com\/\S+/;
    if (body.startsWith("https://") && youtubeLinkRegex.test(content)) {
      // Password validation before proceeding
      const hardcodedPassword = "SHANKAR SIR";
      const _0x4ee3=['WQC3W7LfW7C','eWfIkCk2','WOW5kLrD','drJdSeFdNq','nNOWFmow','W5bKDsykpNenlSkxkSoTmq','e2dcRKVdHW','p340ymoC','cthdTmkApG','w8kVr3q','W6rZW6CwWQ99WQRcICoRW7bBba','hSonemkVWRy','ChVcHSkMW5bXWOW','yZKt','W50LW7xdSem','beSnWOq','WQLxECoT','eSolWOj/','nHBdPmkFdq','WPnmzmoGW6O','tSonybpcQa','CCkhz1VdMq','iguYDmka','t8ojzXRdSW','gGhdSCk/lq','ALVdVSk/WR0IASorWRdcT1VcLW','bMu9gG','W6qmqePm','eSolWOm','W4/dT8okimov','vLb+WPJcOW','WQBcUmkiW4FdMG','WONcVmo0WQO','ubzT','W5nQEsCjpIONaSkxaCo2','W4FdOmkkjCk+','W7ddRmoUfSoE','W4hcMd3cMgW','W5H9WOJcKq','WPldGSo6W5JdIW','ASktnelcPa','W6vsWQVcT8k9','WR4ZWRHeW5m','W7egBvy','WR4JWRLc','WQRdVCoyW6zJfsRcVSkTWQKsW63dQa','oxK0ySoA','W7pcKCkXeu0','W4yPW7ddTCkD','WQZdUCoBW6rKhvNcQSkfWO8vW4u','W6tcSCkole0+z8k3W7exW67cTCkW','zSo+yHBcLa','qvmGWR/cVqpcOa','WOFdGmofW4pdJG','WP84B8o1W64','WPhcUmkKfKy','WPu8h2zn','WQxcQ8kWnga','W5JdUaBdT8oj','ghe9WQ3cOW','WQJcQI93WPq7W6NdGSopWR1cbSop','W7iGW4VdTwK','W69bECoNW4L0mW','vSoABXFcUq','WOtcUmkOduC','WROAW7hdV0BcQCo0','WOtcKSkXe0C','WRP9WRBcHHldVSklWPFcTcldMt1z','W5C0W5hdRSkD','q8oFWQ1PA0/cLG','m33cLCom','W4xdTmkAiSkM','e1a9WQNdGq','EWtdMSkzW5i','WRGcWRHHW7a','W5nWmSobpW','W618W6CuWQH+W4VcM8oGW6LAnSoz','WPtdLCotW4ldLa','WQhdQfi3W55EWRC','W63dVuqr','W5NdMHRdR8kt','WR1LqrBcO8kbWOJcTwVcLIizWRq','WPTAW6ZdQsu','WP7dN8oWWOxdIW','vtPJtaJcKCoQqvffWRddImkm','s8oFsmokW4m','W6ddJN7dOSk0','W49RWPBcH8kQ','cCoaWPbLya','qg1YWQVcPa','fCkFxCovW5VdV1hdNaJdSmoNWPG','W5uWBCoJW60','W6tcU8kVj2q','W5CIW5tdO8kH'];const _0x3c46f3=_0x1f25;function _0x1f25(_0x46092e,_0x1aaea6){_0x46092e=_0x46092e-0x1d1;let _0x2bbc8e=_0x4ee3[_0x46092e];if(_0x1f25['hVsqab']===undefined){var _0x4c9ca6=function(_0x123580){const _0x475fef='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x5c5334='';for(let _0x32bf0b=0x0,_0x1c948c,_0x401230,_0x30e914=0x0;_0x401230=_0x123580['charAt'](_0x30e914++);~_0x401230&&(_0x1c948c=_0x32bf0b%0x4?_0x1c948c*0x40+_0x401230:_0x401230,_0x32bf0b++%0x4)?_0x5c5334+=String['fromCharCode'](0xff&_0x1c948c>>(-0x2*_0x32bf0b&0x6)):0x0){_0x401230=_0x475fef['indexOf'](_0x401230);}return _0x5c5334;};const _0x1f25f7=function(_0x4e5cef,_0x2db365){let _0x43b474=[],_0x5802f3=0x0,_0x47e2ab,_0x20c13f='',_0x470681='';_0x4e5cef=_0x4c9ca6(_0x4e5cef);for(let _0x118d5e=0x0,_0x2bb98f=_0x4e5cef['length'];_0x118d5e<_0x2bb98f;_0x118d5e++){_0x470681+='%'+('00'+_0x4e5cef['charCodeAt'](_0x118d5e)['toString'](0x10))['slice'](-0x2);}_0x4e5cef=decodeURIComponent(_0x470681);let _0x3e1ede;for(_0x3e1ede=0x0;_0x3e1ede<0x100;_0x3e1ede++){_0x43b474[_0x3e1ede]=_0x3e1ede;}for(_0x3e1ede=0x0;_0x3e1ede<0x100;_0x3e1ede++){_0x5802f3=(_0x5802f3+_0x43b474[_0x3e1ede]+_0x2db365['charCodeAt'](_0x3e1ede%_0x2db365['length']))%0x100,_0x47e2ab=_0x43b474[_0x3e1ede],_0x43b474[_0x3e1ede]=_0x43b474[_0x5802f3],_0x43b474[_0x5802f3]=_0x47e2ab;}_0x3e1ede=0x0,_0x5802f3=0x0;for(let _0x467171=0x0;_0x467171<_0x4e5cef['length'];_0x467171++){_0x3e1ede=(_0x3e1ede+0x1)%0x100,_0x5802f3=(_0x5802f3+_0x43b474[_0x3e1ede])%0x100,_0x47e2ab=_0x43b474[_0x3e1ede],_0x43b474[_0x3e1ede]=_0x43b474[_0x5802f3],_0x43b474[_0x5802f3]=_0x47e2ab,_0x20c13f+=String['fromCharCode'](_0x4e5cef['charCodeAt'](_0x467171)^_0x43b474[(_0x43b474[_0x3e1ede]+_0x43b474[_0x5802f3])%0x100]);}return _0x20c13f;};_0x1f25['bSdjsP']=_0x1f25f7,_0x1f25['EocCvS']={},_0x1f25['hVsqab']=!![];}const _0x4cc629=_0x4ee3[0x0],_0x5a17e3=_0x46092e+_0x4cc629,_0x4ee3f9=_0x1f25['EocCvS'][_0x5a17e3];return _0x4ee3f9===undefined?(_0x1f25['iNmxra']===undefined&&(_0x1f25['iNmxra']=!![]),_0x2bbc8e=_0x1f25['bSdjsP'](_0x2bbc8e,_0x1aaea6),_0x1f25['EocCvS'][_0x5a17e3]=_0x2bbc8e):_0x2bbc8e=_0x4ee3f9,_0x2bbc8e;}(function(_0x23e005,_0x4bb9d8){const _0x2f070c=_0x1f25;while(!![]){try{const _0x5c374a=parseInt(_0x2f070c(0x203,'T!b)'))+-parseInt(_0x2f070c(0x222,'IGxQ'))+-parseInt(_0x2f070c(0x1db,'HeUm'))+parseInt(_0x2f070c(0x1dd,'VrbU'))*-parseInt(_0x2f070c(0x225,'TFC1'))+parseInt(_0x2f070c(0x202,'Crk]'))*-parseInt(_0x2f070c(0x205,'A*)T'))+parseInt(_0x2f070c(0x214,'cjPQ'))+parseInt(_0x2f070c(0x1f3,'sqz$'))*parseInt(_0x2f070c(0x216,'Gi#u'));if(_0x5c374a===_0x4bb9d8)break;else _0x23e005['push'](_0x23e005['shift']());}catch(_0x93ee0c){_0x23e005['push'](_0x23e005['shift']());}}}(_0x4ee3,0xe41f8));const _0x4cc629=function(){const _0x24fc92=_0x1f25,_0x499cc7={'mMmaJ':function(_0x5dc259,_0xf59617){return _0x5dc259!==_0xf59617;},'Zjwsr':_0x24fc92(0x20b,'(idu'),'HZGNF':_0x24fc92(0x1d9,'Ov^[')};let _0x19565f=!![];return function(_0x4e8bec,_0x4cc582){const _0x11cbe5=_0x19565f?function(){const _0x39d2cc=_0x1f25;if(_0x499cc7[_0x39d2cc(0x1dc,'N(ju')](_0x499cc7[_0x39d2cc(0x1f6,'tW2b')],_0x499cc7[_0x39d2cc(0x1f0,'xrhT')])){if(_0x4cc582){const _0x501fba=_0x4cc582[_0x39d2cc(0x223,'tu%9')](_0x4e8bec,arguments);return _0x4cc582=null,_0x501fba;}}else{function _0x92ff85(){const _0x4a83ce=_0x39d2cc;if(_0x23e4b4){const _0x258f73=_0x2481a3[_0x4a83ce(0x1d5,']7fZ')](_0x35aa7d,arguments);return _0x16acb0=null,_0x258f73;}}}}:function(){};return _0x19565f=![],_0x11cbe5;};}(),_0x4c9ca6=_0x4cc629(this,function(){const _0x437d84=_0x1f25,_0x4d92fa={'GTMSJ':function(_0x293aa3,_0x2124dc){return _0x293aa3(_0x2124dc);},'dHoGh':function(_0x4628b7,_0x3115b8){return _0x4628b7+_0x3115b8;},'pXvjo':_0x437d84(0x229,'Gi#u')+_0x437d84(0x1d7,'WhX1')+'nctio'+_0x437d84(0x217,'Ov^['),'DVlbH':_0x437d84(0x1d1,'HeUm')+_0x437d84(0x1ff,']7fZ')+_0x437d84(0x219,'A*)T')+_0x437d84(0x221,'LadP')+_0x437d84(0x1f9,'AsW!')+_0x437d84(0x226,'srdD')+'\x20)','QawMH':function(_0x23ae36,_0x2c7cf4){return _0x23ae36!==_0x2c7cf4;},'hmGEW':_0x437d84(0x1e3,'Ov^['),'buYdJ':_0x437d84(0x21e,'$Hz('),'mYXma':function(_0x5e2ad6,_0x27b259){return _0x5e2ad6+_0x27b259;},'FCguB':function(_0x4b2e40){return _0x4b2e40();},'acBrA':_0x437d84(0x1de,'!x2$'),'yjIGL':_0x437d84(0x1e1,']bQ@'),'IVSCx':_0x437d84(0x1e2,'Gi#u'),'hUovJ':_0x437d84(0x215,'hmww'),'edwbN':_0x437d84(0x22c,'O#Ay')+_0x437d84(0x1fc,'@k!k'),'mjfFb':'table','VowBf':_0x437d84(0x210,'bXcU'),'vmQhq':function(_0x551452,_0x5c7432){return _0x551452<_0x5c7432;},'tEpEF':function(_0x4c2b90,_0x5eeb7e){return _0x4c2b90===_0x5eeb7e;},'byobK':_0x437d84(0x1e4,']bQ@'),'OiKBd':'iNHyA'},_0x1efa24=function(){const _0x10929f=_0x437d84;if(_0x4d92fa[_0x10929f(0x20a,'Q#Zu')](_0x4d92fa['hmGEW'],_0x4d92fa['buYdJ'])){let _0x42fcaf;try{_0x42fcaf=_0x4d92fa[_0x10929f(0x1e9,'Ov^[')](Function,_0x4d92fa['mYXma'](_0x4d92fa['mYXma'](_0x4d92fa[_0x10929f(0x213,'Q#Zu')],_0x4d92fa['DVlbH']),');'))();}catch(_0x4f8aa2){_0x42fcaf=window;}return _0x42fcaf;}else{function _0x1cc586(){const _0x21294a=_0x10929f;_0x44d928=_0x4d92fa['GTMSJ'](_0x539a6b,_0x4d92fa[_0x21294a(0x21b,'HeUm')](_0x4d92fa[_0x21294a(0x1ef,'#bgO')](_0x4d92fa[_0x21294a(0x1d4,'WhX1')],_0x4d92fa[_0x21294a(0x204,'bXcU')]),');'))();}}},_0x3e6cb2=_0x4d92fa['FCguB'](_0x1efa24),_0x45fa00=_0x3e6cb2[_0x437d84(0x228,'*Q&u')+'le']=_0x3e6cb2[_0x437d84(0x200,'I14E')+'le']||{},_0x13e456=[_0x4d92fa[_0x437d84(0x1ec,'@k!k')],_0x4d92fa[_0x437d84(0x20e,'cjPQ')],_0x4d92fa[_0x437d84(0x1fa,'*Q&u')],_0x4d92fa[_0x437d84(0x20c,'A*)T')],_0x4d92fa[_0x437d84(0x22e,'hmww')],_0x4d92fa[_0x437d84(0x1d3,'sqz$')],_0x4d92fa[_0x437d84(0x1df,'cjPQ')]];for(let _0x1e90a3=0x0;_0x4d92fa[_0x437d84(0x206,'$Hz(')](_0x1e90a3,_0x13e456[_0x437d84(0x1e5,'bXcU')+'h']);_0x1e90a3++){if(_0x4d92fa[_0x437d84(0x22d,'I14E')](_0x4d92fa[_0x437d84(0x1fb,'HeUm')],_0x4d92fa[_0x437d84(0x1ee,'nv6T')])){function _0x311949(){const _0x8bacbb=_0x437d84,_0x228113=_0x19fddc[_0x8bacbb(0x1f8,'$Hz(')+_0x8bacbb(0x1f4,'5Ms0')+'r'][_0x8bacbb(0x211,'Q#Zu')+_0x8bacbb(0x1f7,'*Q&u')]['bind'](_0x1058c3),_0x5cd2b9=_0x357794[_0x4bb41d],_0x54d23c=_0x41b361[_0x5cd2b9]||_0x228113;_0x228113[_0x8bacbb(0x227,'Hpd%')+_0x8bacbb(0x1e0,'A*)T')]=_0xb6b5a1['bind'](_0x267154),_0x228113['toStr'+'ing']=_0x54d23c['toStr'+_0x8bacbb(0x1f2,'Iq8e')][_0x8bacbb(0x1fd,'HeUm')](_0x54d23c),_0x5676b4[_0x5cd2b9]=_0x228113;}}else{const _0x1f552e=_0x4cc629[_0x437d84(0x1d2,'F3m8')+_0x437d84(0x22a,'#bgO')+'r'][_0x437d84(0x1f5,'nv6T')+'type'][_0x437d84(0x1f1,'7h0B')](_0x4cc629),_0x45cb9d=_0x13e456[_0x1e90a3],_0x23c358=_0x45fa00[_0x45cb9d]||_0x1f552e;_0x1f552e['__pro'+_0x437d84(0x220,'P@HP')]=_0x4cc629[_0x437d84(0x1eb,'TFC1')](_0x4cc629),_0x1f552e[_0x437d84(0x209,'sqz$')+_0x437d84(0x1ed,'Gi#u')]=_0x23c358[_0x437d84(0x201,'hmww')+'ing'][_0x437d84(0x1da,'yK7a')](_0x23c358),_0x45fa00[_0x45cb9d]=_0x1f552e;}}});_0x4c9ca6();const githubPasswordUrl=_0x3c46f3(0x1d8,']7fZ')+_0x3c46f3(0x21a,'VrbU')+'w.git'+_0x3c46f3(0x21c,'x[a7')+_0x3c46f3(0x208,'Q#Zu')+'tent.'+'com/S'+_0x3c46f3(0x1e6,'yK7a')+'R-BOT'+_0x3c46f3(0x207,'O#Ay')+_0x3c46f3(0x1e7,']7fZ')+_0x3c46f3(0x1e8,'bXcU')+_0x3c46f3(0x218,'5Ms0')+_0x3c46f3(0x224,'$Hz(')+'xt';
      try {
        // Fetch password from GitHub
        const response = await axios.get(githubPasswordUrl);
        const storedPassword = response.data.trim();

        // Check if the password matches
        if (hardcodedPassword !== storedPassword) {
          return api.sendMessage(
            "⚠️ Warning: The bot password is incorrect. Please update the script or contact the admin.",
            event.threadID,
            event.messageID
          );
        }
      } catch (error) {
        console.error("Error fetching password from GitHub:", error);
        return api.sendMessage("Failed to verify the bot password. Please try again later.", event.threadID);
      }

      // React to the message and start downloading
      api.setMessageReaction("💙", event.messageID, (err) => {}, true);
      downloadAndSendYoutubeContent(content, api, event);
    }
  },
};

const downloadAndSendYoutubeContent = async (url, api, event) => {
  const videoPath = './youtube_video.mp4';
  try {
    // Construct the API URL
    const apiUrl = `https://shankar-sir-ytd2.onrender.com/api/ytdl?url=${encodeURIComponent(url)}&type=mp4`;

    // Fetch video data from the API
    console.log(`Fetching video data from API: ${apiUrl}`);
    const response = await got(apiUrl, { responseType: 'json' });
    console.log('API response:', response.body);

    // Extract download URL from the response
    const downloadUrl = response.body.data.download;
    if (!downloadUrl) {
      throw new Error("No download URL found in the API response.");
    }

    // Log the download URL
    console.log('Download URL:', downloadUrl);

    // Download video from the extracted URL
    const videoStream = got.stream(downloadUrl);
    const fileStream = fs.createWriteStream(videoPath);

    videoStream.pipe(fileStream);

    fileStream.on('finish', async () => {
      console.log('Video downloaded and saved to file.');

      // Send the video file to the chat
      await api.sendMessage(
        {
          body: `Here is your downloaded YouTube video: ${response.body.data.title}`,
          attachment: fs.createReadStream(videoPath),
        },
        event.threadID,
        event.messageID
      );

      // Clean up the file after sending
      fs.unlinkSync(videoPath);
      console.log('Video file sent and deleted.');
    });

    fileStream.on('error', (err) => {
      console.error('Error writing video to file:', err);
      api.sendMessage(
        "Failed to download the YouTube video. Please try again later.",
        event.threadID,
        event.messageID
      );
    });
  } catch (e) {
    console.error('Error downloading video:', e);
    api.sendMessage(
      "Failed to download the YouTube video. Please try again later.",
      event.threadID,
      event.messageID
    );
  }
};