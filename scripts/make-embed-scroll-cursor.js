const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <circle cx="64" cy="64" r="62" fill="#000000"/>
  <circle cx="64" cy="64" r="60" fill="#FAFAF7"/>
  <circle cx="64" cy="64" r="52" fill="#2D4E2D"/>
  <path fill="#FAFAF7" d="M64 24l11 13H68v10H60V37H53zM64 104L53 91h7V81h8v10h7z"/>
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
