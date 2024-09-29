 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUtBSjcwWTVkdFFsL3Zic2xBbEFPaVd0elRCZjRwTCtKbU5kVHZ6NWNIND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVkhqM21UMTQwTlJNNGc1OU9EU3lHOUt1YjJOdmFaZ284WVB3b2Q2d0YzTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxQStyRmloaVlVejBxVkUxbldHTDhVRjZSWEZ0ektkek5Oek52NGJaaUZFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBZGo4L3dCMlU4Ny9jTEwrRHB6QjZFeGhyeFkyUkxmR2tsYUNHMzZEamtzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVCOXoyaHYwRGtpTFBXWmVlbk5IcnZsdHUyTGVTcU41REVGOWI4OWlqRVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlR2TG9ERUtNUE9sZC80NVZ4cms5M3ZjQUlaN1BBQW5YREZYTEFlSzdtM2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUZQNDU2Q3BSNEY2MEhMNXN3L1Bta1l2Q3JMdUdwNmd2SjEwbHhVVXVrbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicm1NZFpBRVlrMVRsZnYweXIyc1phTVlabHV3Q2tPRUN5T01wMSs5WTJrMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitjcCtXcGJHRCtWZEttc3dzUjJWaW9tUjFIS2NNQjNqZ0lxWUJpYThwejdld001TzJFSkt5amFpakozM3VwVEZTYk5zaGpLYmt2V1ZBT2p3VHh1MWhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQyLCJhZHZTZWNyZXRLZXkiOiJoZ0s1QmdhUW1vRVNwS2Rva245alY1aFNZRGZDZHh1MHlRalYzaFhPeFR3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkwNjU1MjY2OTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMURDMUE2OEFGOEVDREQzNDkzMjMwNEZFMUNDQTIyM0EifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNzY1MTY2M30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTA2NTUyNjY5MkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3MTQ1MjlGNjJDODQzMDFDQUJCMTg2MTkxRTBGOEU0MCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI3NjUxNjcyfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ3NG9TV1hlU1FxRzdmODdNdWJvNG1BIiwicGhvbmVJZCI6ImQ4NjUxNTBkLWE0MmMtNDIwOS1iMTlkLTJiM2IyYzY1MWNhOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2MXVWYmV1THJnZUZwRThyZ1BUN1hmQTRzTEE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQzFIMnhBeXM3dWhlNnR5aGtxdktMcUZsWnlFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ikc2VldOR1NBIiwibWUiOnsiaWQiOiIyMzQ5MDY1NTI2NjkyOjI1QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkVybmVzdCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUGJVMUx3R0VMZSs1N2NHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiOU1ZMUtNbDVaOElOSHE4a0Q3bHlLL3U5ajRVUmZ6MnZkTGhXdUZMMlR3UT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSDRxOGlUWVJoSUN0R0FQdDl4QUxhVEdUUWFiWDZ5cDBQYkx2YlI3OWk4UlYzelA1cVQwR0FiR0s3ZVlzelNFQkQ5bGdFUVhYMjFDVWIwUVBWVWZXQWc9PSIsImRldmljZVNpZ25hdHVyZSI6IklUbzhWekdBUVBaYUFoSDFkRm5iSDNSeEhnQWQ1Tkxua2pwaEl2dVlNSHlnMFV6SmhodmNnQ25jUWRoL0QzVEJGaEVHeDZTMUkvSmt2OHZiN29ycmpBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0OTA2NTUyNjY5MjoyNUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmVEdOU2pKZVdmQ0RSNnZKQSs1Y2l2N3ZZK0ZFWDg5cjNTNFZyaFM5azhFIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI3NjUxNjUxLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVBoWCJ9',

////////////////////////////////



    PREFIXE: process.env.PREFIX || "+",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'off',
    CHATBOT: process.env.CHAT_BOT || "on",
    OWNER_NAME: process.env.OWNER_NAME || "Ernest",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2349065526692",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://whatsapp.com/channel/0029VakMfZR4yltPyixMaK0D',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
