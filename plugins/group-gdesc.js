cmd({
    pattern: "updategdesc",
    alias: ["upgdesc", "gdesc"],
    react: "📜",
    desc: "Change the group description.",
    category: "group",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, q }) => {
    const contextInfo = {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363382023564830@newsletter",
            newsletterName: "𝙽𝙾𝚅𝙰-𝚇𝙼𝙳",
            serverMessageId: 1
        }
    };

    const quotedContact = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            remoteJid: "status@broadcast"
        },
        message: {
            contactMessage: {
                displayName: "B.M.B VERIFIED ✅",
                vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:B.M.B VERIFIED ✅\nORG:BMB-TECH BOT;\nTEL;type=CELL;type=VOICE;waid=254769529791:254769529791\nEND:VCARD"
            }
        }
    };

    if (!isGroup) return await conn.sendMessage(from, { text: `
╭───「 *ERROR* 」───╮
│ ❌ This command can only be used in groups.
╰──────────────────╯
    `.trim(), contextInfo, quoted: quotedContact });

    if (!isAdmins) return await conn.sendMessage(from, { text: `
╭───「 *ACCESS DENIED* 」───╮
│ 🚫 Only group admins can use this command.
╰──────────────────────────╯
    `.trim(), contextInfo, quoted: quotedContact });

    if (!isBotAdmins) return await conn.sendMessage(from, { text: `
╭───「 *BOT ERROR* 」───╮
│ ⚠️ I need to be an admin to update the group description.
╰──────────────────────╯
    `.trim(), contextInfo, quoted: quotedContact });

    if (!q) return await conn.sendMessage(from, { text: `
╭───「 *USAGE* 」───╮
│ ❌ Please provide a new group description.
╰──────────────────╯
    `.trim(), contextInfo, quoted: quotedContact });

    try {
        await conn.groupUpdateDescription(from, q);
        return await conn.sendMessage(from, { text: `
╭───「 *SUCCESS* 」───╮
│ ✅ Group description has been updated.
╰───────────────────╯
        `.trim(), contextInfo, quoted: quotedContact });
    } catch (e) {
        console.error("Error updating group description:", e);
        return await conn.sendMessage(from, { text: `
╭───「 *ERROR* 」───╮
│ ❌ Failed to update the group description. Please try again.
╰────────────────╯
        `.trim(), contextInfo, quoted: quotedContact });
    }
});
