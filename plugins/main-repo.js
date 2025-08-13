const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const { cmd } = require('../command');

// Verified contact
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
  alias: ["sc", "script", "info"],
  desc: "Fetch GitHub repository information",
  react: "🎗️",
  category: "info",
  filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
  const githubRepoURL = 'https://github.com/novaxmd/NOVA-XMD';

  try {
    const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const repoData = await response.json();

    const style1 = `
╭━━━「 ${config.BOT_NAME} REPO 」━━━➤
│ 📦 Name: ${repoData.name}
│ 👤 Owner: ${repoData.owner.login}
│ ⭐ Stars: ${repoData.stargazers_count}
│ 🍴 Forks: ${repoData.forks_count}
│ 🌐 URL: ${repoData.html_url}
╰━━━━━━━━━━━━━━━━━━━━━━━➤
🔗 ${config.DESCRIPTION}`;

    const styles = [style1];
    const selectedStyle = styles[Math.floor(Math.random() * styles.length)];

    const scsFolder = path.join(__dirname, "../plugins");
    const images = fs.readdirSync(scsFolder).filter(f => /^menu\d+\.jpg$/i.test(f));
    const randomImage = images.length > 0
      ? fs.readFileSync(path.join(scsFolder, images[Math.floor(Math.random() * images.length)]))
      : null;

    const messageOptions = {
      image: randomImage || { url: "https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png" },
      caption: selectedStyle.trim(),
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363382023564830@newsletter',
          newsletterName: config.OWNER_NAME || '𝗡𝗢𝗩𝗔-𝗫𝗠𝗗',
          serverMessageId: 143
        }
      }
    };

    await conn.sendMessage(from, messageOptions, { quoted: quotedContact });

  } catch (error) {
    console.error("Repo command error:", error);
    reply(`❌ Error: ${error.message}`);
  }
});
  
