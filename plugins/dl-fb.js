const { cmd } = require("../command");
const getFBInfo = require("@xaviabot/fb-downloader"); // API mpya

cmd({
  pattern: "fb",
  alias: ["facebook"],
  desc: "Download Facebook video using link",
  category: "download",
  filename: __filename
}, async (conn, m, match, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("http")) {
      return reply("❌ *Usage:* fb <Facebook Video URL>");
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const fbData = await getFBInfo(q);

    if (!fbData || (!fbData.sd && !fbData.hd)) {
      return reply("⚠️ *Failed to fetch Facebook video. Please try another link.*");
    }

    // Andika menu ya buttons kulingana na availability
    const buttons = [];
    if (fbData.sd) buttons.push({ buttonId: 'sd', buttonText: { displayText: 'SD Quality' }, type: 1 });
    if (fbData.hd) buttons.push({ buttonId: 'hd', buttonText: { displayText: 'HD Quality' }, type: 1 });

    const buttonMessage = {
      image: { url: fbData.thumbnail },
      caption: `📹 *Facebook Video*\n🎬 *Title:* ${fbData.title || 'No Title'}\n\n💠 *Select quality to download:*`,
      buttons: buttons,
      headerType: 4
    };

    await conn.sendMessage(from, buttonMessage, { quoted: m });

  } catch (err) {
    console.error("Facebook Downloader Error:", err);
    reply("❌ *An error occurred while processing your request. Please try again later.*");
  }
});
