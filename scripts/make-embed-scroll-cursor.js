const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <circle cx="64" cy="64" r="62" fill="#FAFAF7"/>
  <circle cx="64" cy="64" r="54" fill="#1A2820"/>
  <path fill="#FAFAF7" d="M64 22l11 13H68v10H60V35H53zM64 106L53 93h7V83h8v10h7z"/>
  <text x="64" y="70" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="16" font-weight="700" fill="#FAFAF7" letter-spacing="1.2">SCROLL</text>
</svg>`

const out = path.join(__dirname, '../public/cursors/embed-scroll.png')
sharp(Buffer.from(svg))
  .resize(64, 64, { kernel: sharp.kernel.lanczos3 })
  .png()
  .toFile(out)
  .then(() => console.log('wrote', out))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
