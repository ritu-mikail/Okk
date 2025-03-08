const axios = require("axios");
const fs = require("fs");
const path = __dirname + `/nayan/ramadan.json`;

module.exports.config = {
  name: "namazAutoTime",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "Nayan",
  description: "Auto send prayer time reminders in Bengali",
  prefix: true,
  commandCategory: "Islam",
  usages: "namazAutoTime",
  cooldowns: 5
};

const prayerTimes = [
  { name: 'ফজর', key: "Fazar Waqt Start", msg: '📢 ফজরের ওয়াক্ত শুরু হয়ে গেছে! দয়া করে নামাজ আদায় করুন। 🕋' },
  { name: 'জোহর', key: "Dhuhr Waqt Start", msg: '📢 জোহরের ওয়াক্ত শুরু হয়ে গেছে! দয়া করে নামাজ আদায় করুন। 🌞' },
  { name: 'আসর', key: "Asr Waqt Start", msg: '📢 আসরের ওয়াক্ত শুরু হয়ে গেছে! তাড়াতাড়ি নামাজ আদায় করুন। 🙏' },
  { name: 'মাগরিব', key: "Maghrib and Iftar Time", msg: '📢 মাগরিবের ওয়াক্ত শুরু হয়েছে! ইফতার করুন এবং নামাজ আদায় করুন। 🍽️' },
  { name: 'ইশা', key: "Isha Waqt Start", msg: '📢 ইশার ওয়াক্ত শুরু হয়েছে! নামাজ আদায় করুন এবং রাতে বিশ্রাম নিন। 🌙' }
];


async function fetchAndSavePrayerTimes() {
  const zilla = "Dhaka";
  const url = `https://bd-prayer-time.vercel.app/islam/prayerTime?zilla=${zilla}`;

  try {
    const response = await axios.get(url);
    response.data.timezone = 6; 
    fs.writeFileSync(path, JSON.stringify(response.data, null, 2));
    console.log("✅ নতুন নামাজের সময় আপডেট হয়েছে!");
  } catch (error) {
    console.error("❌ নামাজের সময় আনতে সমস্যা হয়েছে!", error);
  }
}


function scheduleDailyFetch() {
  setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
      fetchAndSavePrayerTimes();
    }
  }, 1000);
}


function convertToUTC6(timeStr) {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (period.toLowerCase() === "pm" && hours < 12) {
    hours += 12;
  }
  if (period.toLowerCase() === "am" && hours === 12) {
    hours = 0;
  }

  let date = new Date();
  date.setUTCHours(hours - 6, minutes, 0, 0); 
  return date;
}


function checkPrayerTimes(api) {
  setInterval(() => {
    if (!fs.existsSync(path)) return;

    const data = JSON.parse(fs.readFileSync(path));
    if (!data || !data.prayerTimes) return;

    const now = new Date();
    prayerTimes.forEach(prayer => {
    const threadId = "25434740849505709"
      const prayerTime = convertToUTC6(data.prayerTimes[prayer.key]);


      if (now.getUTCHours() === prayerTime.getUTCHours() && now.getUTCMinutes() === prayerTime.getUTCMinutes() && now.getUTCSeconds() === prayerTime.getUTCSeconds()) {
        global.data.allThreadID.forEach(i => {
          api.sendMessage(`${prayer.msg}\n🕰️ সময়: ${data.prayerTimes[prayer.key]}`, i);
        });
      }
    });
  }, 1000);
}


module.exports.onLoad = ({ api }) => {
  fetchAndSavePrayerTimes(); 
  scheduleDailyFetch();
  checkPrayerTimes(api);
};
