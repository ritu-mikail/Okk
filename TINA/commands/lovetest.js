const axios = require('axios');
const fs = require('fs');
 
module.exports.config = {
  name: "lovetest",
  version: "6.0.0",
  hasPermission: 0,
  credits: "NAZRUL",
  description: "Check your love tast % and chances of a successful love relationship!",
  commandCategory: "Fun",
  usages: ["/love [your_name] [partner_name]"],
  cooldowns: 5
};
 
module.exports.run = async ({ api, event, args }) => {
  try {
    if (args.length !== 2) {
      api.sendMessage("•┄┅════❁🌺❁════┅┄•\n\nআসসালামু আলাইকুম-!!🖤💫\nlove test করার জন্য আপনার নামের সাথে আপনার Girl friend এর নাম টি লিখে দিন\n\n•┄┅════❁🌺❁════┅┄•", event.threadID, event.messageID);
      return;
    }
 
    const [yourName, partnerName] = args;
    const compatibilityScore = calculateCompatibility(yourName, partnerName);
    const compatibilityMessage = getCompatibilityMessage(compatibilityScore);
    const additionalInfo = getAdditionalInfo(compatibilityScore);
    const passionLevel = getPassionLevel(compatibilityScore);
    const commitmentLevel = getCommitmentLevel(compatibilityScore);
    const communicationLevel = getCommunicationLevel(compatibilityScore);
    const humorLevel = getHumorLevel(compatibilityScore);
    const trustLevel = getTrustLevel(compatibilityScore);
    const emotionalIntimacy = getEmotionalIntimacy(compatibilityScore);
    const sharedValues = getSharedValues(compatibilityScore);
    const growthPotential = getGrowthPotential(compatibilityScore);
 
    const resultMessage = `╭•┄┅════❁🌺❁════┅┄•╮\n _𝐓𝐇𝐄 𝐑𝐄𝐀𝐋𝐋 𝐋𝐎𝐕𝐄 𝐓𝐄𝐒𝐓_ \n╰•┄┅════❁🌺❁════┅┄•╯\n\n•—»✨${yourName} + ${partnerName}✨«—•\n\n${compatibilityMessage}\n\n${additionalInfo}\n\nPassion Level: ${passionLevel}\nCommitment Level: ${commitmentLevel}\nCommunication Level: ${communicationLevel}\nHumor Level: ${humorLevel}\nTrust Level: ${trustLevel}\nEmotional Intimacy: ${emotionalIntimacy}\nShared Values: ${sharedValues}\nGrowth Potential: ${growthPotential}\n\n༊༅༎⊱প্রিয় তুমার আর আমার ভালোবাসা: ${compatibilityScore}% সত্য🧡😽🙈༊༅༎⊱`;
 
    const response = await axios.get("https://i.imgur.com/a0xBMX5.gif",{ responseType: 'arraybuffer' });
    fs.writeFileSync(__dirname + "/cache/lovecompatibility.gif", Buffer.from(response.data, "utf-8"));
 
    api.sendMessage(
      {
        body: resultMessage,
        attachment: fs.createReadStream(__dirname + "/cache/lovecompatibility.gif"),
      },
      event.threadID, event.messageID
    );
 
    fs.unlinkSync(__dirname + "/cache/lovecompatibility.gif");
  } catch (error) {
    console.error("Error checking love compatibility:", error);
    api.sendMessage("•┄┅════❁🌺❁════┅┄•\n\nআপনার এই নাম টি সঠিক নাহ 🙂\nসঠিক নাম লিখে love  test করে নিন\n\n•┄┅════❁🌺❁════┅┄•", event.threadID, event.messageID);
  }
};
 
function calculateCompatibility(name1, name2) {
 
  const combinedNames = (name1 + name2).toLowerCase();
  const uniqueLetters = [...new Set(combinedNames)];
  const compatibilityScore = uniqueLetters.length * 10;
 
  return Math.min(compatibilityScore, 100);
}
 
function getCompatibilityMessage(score) {
  if (score >= 80) {
    return "_༊༅༎⊱তোমার ভালোবাসায়༊༅༎⊱\n༊༅༎⊱ আমি সীমাবদ্ধ প্রিয়༊༅༎⊱🥰🌸  _༊༅༎⊱তুমি রাখতে জানলে༊༅༎⊱༊༅༎⊱ আমি থাকতে বাধ্য༊༅༎⊱༏༏༅🥰❤️༊༅༎⊱দোয়া করি তুমার আর আমার ভালোবাসা সারাজীবন থাকুক༊༅༎⊱🤲❤️🌸\n🌺✨༊༅༎⊱আল্লাহ তুমি আমাদের দুজনের ভালোবাসা পবিত্র ও হালাল করে তোলার জন্য তৌফিক দান করো༊༅༎⊱💜😌🤲";
  } 
else if (score >= 60) {
    return 
" 🙀🙀🙀🙀🙀🙀🙀🙀🙀🙀🙀";
  } else if (score >= 40) {
    return 
"😌😌😌😌😌😌😌😌😌😌😌";
  } else {
    return 
"😗😗😗😗😗😗😗😗😗😗😗";
  }
}
 
function getAdditionalInfo(score) {
  if (score >= 80) {
    return "✨✨✨✨✨✨✨✨✨✨✨✨";
  } else if (score >= 60) {
    return 
"🐰🐰🐰🐰🐰🐰🐰🐰🐰🐰🐰";
  } else if (score >= 40) {
    return 
"🦋🦋🦋🦋🦋🦋🦋🦋🦋🦋🦋";
  } else {
    return 
"🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️";
  }
}
 
function getPassionLevel(score) {
  if (score >= 80) {
    return 
"🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈";
  } else if (score >= 60) {
    return "🍒🍒🍒🍒🍒🍒🍒🍒🍒";
  } else if (score >= 40) {
    return 
"🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹";
  } else {
    return 
"🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸";
  }
}
 
function getCommitmentLevel(score) {
  if (score >= 80) {
    return 
"❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️";
  } else if (score >= 60) {
    return 
"🤍🤍🤍🤍🤍🤍🤍🤍🤍🤍🤍";
  } else if (score >= 40) {
    return 
"🖤🖤🖤🖤🖤🖤🖤🖤🖤🖤";
  } else {
    return 
"🤎🤎🤎🤎🤎🤎🤎🤎🤎🤎🤎";
  }
}
 
function getCommunicationLevel(score) {
  if (score >= 80) {
    return 
"🫶🫶🫶🫶🫶🫶🫶🫶🫶🫶";
  } else if (score >= 60) {
    return 
"💏💏💏💏💏💏💏💏💏💏💏";
  } else if (score >= 40) {
    return 
"👩‍❤️‍👨👩‍❤️‍👨👩‍❤️‍👨👩‍❤️‍👨👩‍❤️‍👨👩‍❤️‍👨👩‍❤️‍👨👩‍❤️‍👨👩‍❤️‍👨👩‍❤️‍👨👩‍❤️‍👨";
  } else {
    return 
"😽😽😽😽😽😽😽😽😽😽";
  }
}
 
function getHumorLevel(score) {
  if (score >= 80) {
    return 
"😘😘😘😘😘😘😘😘😘";
  } else if (score >= 60) {
    return 
"💌💌💌💌💌💌💌💌💌💌💌";
  } else if (score >= 40) {
    return 
"😻😻😻😻😻😻😻😻😻😻😻";
  } else {
    return 
"❣️❣️❣️❣️❣️❣️❣️❣️❣️❣️";
  }
}
 
function getTrustLevel(score) {
  if (score >= 80) {
    return 
"🤍🤍🤍🤍🤍🤍🤍🤍🤍🤍";
  } else if (score >= 60) {
    return 
"💛💛💛💛💛💛💛💛💛💛";
  } else if (score >= 40) {
    return 
"💝💝💝💝💝💝💝💝💝💝";
  } else {
    return 
"❤️‍🩹❤️‍🩹❤️‍🩹❤️‍🩹❤️‍🩹❤️‍🩹❤️‍🩹❤️‍🩹❤️‍🩹❤️‍🩹";
  }
}
 
function getEmotionalIntimacy(score) {
  if (score >= 80) {
    return 
"🙊🙊🙊🙊🙊🙊🙊🙊🙊🙊";
  } else if (score >= 60) {
    return 
"💗💗💗💗💗💗💗💗💗💗";
  } else if (score >= 40) {
    return.
"🤗🤗🤗🤗🤗🤗🤗🤗🤗🤗";
  } else {
    return 
"💞💞💞💞💞💞💞💞💞💞";
  }
}
 
function getSharedValues(score) {
  if (score >= 80) {
    return 
"🤗🤗🤗🤗🤗🤗🤗🤗🤗";
  } else if (score >= 60) {
    return 
"💙💙💙💙💙💙💙💙💙💙";
  } else if (score >= 40) {
    return 
"😘😘😘😘😘😘😘😘😘😘";
  } else {
    return 
"😍😍😍😍😍😍😍😍😍😍";
  }
}
 
function getGrowthPotential(score) {
  if (score >= 80) {
    return 
"🖤🖤🖤🖤🖤🖤🖤🖤🖤🖤.";
  } else if (score >= 60) {
    return 
"🙊🙊🙊🙊🙊🙊🙊🙊🙊🙊🙊";
  } else if (score >= 40) {
    return 
"💖💖💖💖💖💖💖💖💖💖";
  } else {
    return 
"🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡";
  }
}
