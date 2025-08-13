const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
const fetch = require('node-fetch');
const config = require('../config');
const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');

// Contact message for verified context
const quotedContact = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "B.M.B VERIFIED ✅",
      vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:B.M.B VERIFIED ✅\nORG:BMB-TECH BOT;\nTEL;type=CELL;type=VOICE;waid=255767862457:+255 767 862457\nEND:VCARD"
    }
  }
};

cmd({
    pattern: "repo",
    alias: ["sc", "script"],
    desc: "Fetch information about a GitHub repository.",
    react: "📋",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/novaxmd/NOVA-XMD';

    try {
        // Extract username and repo name from the URL
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        // Fetch repository details using GitHub API
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        if (!response.ok) throw new Error(`GitHub API request failed with status ${response.status}`);

        const repoData = await response.json();

        // Random image from /plugis folder
        const scsFolder = path.join(__dirname, "../plugis");
        const images = fs.readdirSync(scsFolder).filter(f => /^menu\d+\.(jpg|png)$/i.test(f));
        if (images.length === 0) throw new Error("No images found in /plugis folder");
        const randomImage = images[Math.floor(Math.random() * images.length)];
        const randomImagePath = path.join(scsFolder, randomImage);

        // Format repository info
        const formattedInfo = `*𝐇𝐞𝐥𝐥𝐨 𝐭𝐡𝐞𝐫𝐞👋*,
This is *NOVA-XMD*, Simple whatsapp bot built by Nova xmd ʙᴏᴛs. This bot was made to make the use of WhatsApp easier and fun.

> ᴅᴏɴ'ᴛ ғᴏʀɢᴇᴛ ᴛᴏ sᴛᴀʀ & ғᴏʀᴋ ᴛʜᴇ ʀᴇᴘᴏ🌟🍴

ʀᴇᴘᴏ ʟɪɴᴋ: https://github.com/novaxmd

💡 *ɴᴀᴍᴇ:* ${repoData.name}
⭐ *ᴛᴏᴛᴀʟ sᴛᴀʀs:* ${repoData.stargazers_count}
🍴 *ᴛᴏᴛᴀʟ ғᴏʀᴋs:* ${repoData.forks_count}
👀 *ᴡᴀᴛᴄʜᴇʀs:* 1
👤 *ᴏᴡɴᴇʀ:* ${repoData.owner.login}

> *© Pᴏᴡᴇʀᴇᴅ Bʏ nova xmd bot.♡*
`;

        // Send random local image, replying with contact card
        await conn.sendMessage(from, {
            image: { url: randomImagePath },
            caption: formattedInfo,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363382023564830@newsletter',
                    newsletterName: 'nova tech.',
                    serverMessageId: 143
                }
            }
        }, { quoted: quotedContact });

    } catch (error) {
        console.error("Error in repo command:", error);
        reply("Sorry, something went wrong while fetching the repository information. Please try again later.");
    }
});
