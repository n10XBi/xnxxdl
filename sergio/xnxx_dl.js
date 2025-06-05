const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const https = require('https');

module.exports = async function downloadFromVideoPage(link) {
  const headers = { 'User-Agent': 'Mozilla/5.0', 'Cookie': 'age_verified=1; family_filter=0;' };
  const res = await axios.get(link, { headers });
  const $ = cheerio.load(res.data);
  const title = $('meta[property="og:title"]').attr('content') || 'video';
  const script = $('script').filter((i, el) => $(el).html().includes('setVideoUrlHigh')).first().html();
  const mp4Match = script && script.match(/setVideoUrlHigh\('(.*?)'\)/);
  const mp4Url = mp4Match ? mp4Match[1] : null;

  if (!mp4Url) throw 'Link MP4 tidak ditemukan';

  const fileName = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mp4`;
  const filePath = path.resolve(__dirname, fileName);

  const file = fs.createWriteStream(filePath);
  await new Promise((resolve, reject) => {
    https.get(mp4Url, res => {
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });

  return { title, file: filePath };
}
