// 📦 WA Bot Plugin: Upload Media to AnonFiles & Telegra.ph
// Perintah:
// .vidurl [reply video]
// .imgurl [reply foto]

const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

module.exports = async (m, {
  client, command, quoted, mime, reply
}) => {
  if (!quoted || !quoted.message || !quoted.download) return reply(`Balas media dengan perintah .${command}`);
  
  const media = await quoted.download();
  const type = await fromBuffer(media);
  const isImage = /image\//.test(mime);
  const isVideo = /video\//.test(mime);

  const tmpPath = `./temp_${Date.now()}.${type.ext}`;
  fs.writeFileSync(tmpPath, media);

  try {
    if (command === 'imgurl' && isImage) {
      // Upload ke telegra.ph
      const form = new FormData();
      form.append('file', fs.createReadStream(tmpPath));
      const res = await axios.post('https://telegra.ph/upload', form, {
        headers: form.getHeaders()
      });

      if (res.data && res.data[0] && res.data[0].src) {
        const link = 'https://telegra.ph' + res.data[0].src;
        reply(`🖼️ Link Gambar Telegraph:
${link}`);
      } else {
        reply('❌ Gagal upload ke Telegra.ph');
      }

    } else if (command === 'vidurl' && isVideo) {
      // Upload ke anonfiles
      const form = new FormData();
      form.append('file', fs.createReadStream(tmpPath));
      const res = await axios.post('https://api.anonfiles.com/upload', form, {
        headers: form.getHeaders()
      });

      const link = res.data?.data?.file?.url?.full;
      if (link) {
        reply(`🎞️ Link Video Anonfiles:
${link}`);
      } else {
        reply('❌ Gagal upload ke Anonfiles');
      }

    } else {
      reply('❌ Format tidak didukung. Kirim foto untuk .imgurl, kirim video untuk .vidurl');
    }

  } catch (e) {
    console.error(e);
    reply('💥 Error saat upload media');
  } finally {
    fs.unlinkSync(tmpPath);
  }
};

module.exports.command = ['imgurl', 'vidurl'];
