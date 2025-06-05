/*
╭────────────────────────────────────────
│ GitHub   : https://github.com/r-serex
│ YouTube  : https://youtube.com/@zxruzx
│ WhatsApp : https://wa.me/6288980698613
│ Telegram : https://rujekaciw.t.me
╰─────────────────────────────────────────
*/

const fs = require('fs')

//~~~~~~~~~ Setting Owner ~~~~~~~~~~//
global.owner = "6287814960299"
global.namaowner = "G3N⫹⫺"

//~~~~~~~~~ Setting Channel ~~~~~~~~~~//
global.namach = "Informasi Bot & Website 2025"
global.linkch = "https://whatsapp.com/channel/0029Vb51J3fIt5s2oJDnKN1q"
global.idch = "120363398454335006@newsletter"

//~~~~~~~~~ Setting Packname ~~~~~~~~~~//
global.packname = "WhatsApp Bot 2025"
global.author = "https://wa.me/6287814960299"

//~~~~~~~~~ Setting Status ~~~~~~~~~~//
global.status = true
global.welcome = true

//~~~~~~~~~ Setting Apikey ~~~~~~~~~~//
global.KEY = "GET APIKEY elevenlabs.io"
global.IDVOICE = "GET ON elevenlabs.io"

global.pairing = "RUZXOFFC"

//~~~~~~~~~ Setting Message ~~~~~~~~~~//
global.mess = {
    owner: "Fitur ini khusus untuk owner!", 
    group: "Fitur ini untuk dalam grup!", 
    private: "Fitur ini untuk dalam private chat!", 
}

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
