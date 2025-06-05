const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function scrapeXNXX(keyword) {
  const headers = { 'User-Agent': 'Mozilla/5.0', 'Cookie': 'age_verified=1; family_filter=0;' };
  const res = await axios.get(`https://www.xnxx.com/search/${encodeURIComponent(keyword)}`, { headers });
  const $ = cheerio.load(res.data);
  const results = [];

  $('div.mozaique .thumb-inside a').slice(0, 10).each((i, el) => {
    const link = 'https://www.xnxx.com' + $(el).attr('href');
    const thumb = $(el).find('img').attr('data-src') || $(el).find('img').attr('src');
    const title = $(el).attr('title')?.trim() || '*sayank angellia*';
    results.push({ title, link, thumb });
  });

  return results;
}
