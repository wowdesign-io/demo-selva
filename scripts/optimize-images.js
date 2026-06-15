/* Convert heavy render PNGs to optimized WebP.
   Reads from the lossless handoff sources (not interim JPEGs) to avoid
   double compression. Photographic renders were 8-12MB PNG; WebP q80 cuts ~95%. */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const HANDOFF = 'C:/Users/info/Downloads/wowdesign Demo/public/images';
const DEST = 'public/images';

const DIRS = ['renders', 'amenities', 'neighborhood'];

const MAX_W = 2400;
const QUALITY = 80;

(async () => {
  for (const dir of DIRS) {
    const srcDir = path.join(HANDOFF, dir);
    const destDir = path.join(DEST, dir);
    if (!fs.existsSync(srcDir)) continue;
    fs.mkdirSync(destDir, { recursive: true });

    for (const file of fs.readdirSync(srcDir)) {
      if (!file.toLowerCase().endsWith('.png')) continue;
      const src = path.join(srcDir, file);
      const out = path.join(destDir, file.replace(/\.png$/i, '.webp'));
      const before = fs.statSync(src).size;
      const meta = await sharp(src).metadata();
      let pipe = sharp(src);
      if (meta.width && meta.width > MAX_W) pipe = pipe.resize({ width: MAX_W });
      await pipe.webp({ quality: QUALITY, effort: 5 }).toFile(out);
      const after = fs.statSync(out).size;
      console.log(`${dir}/${file}  ${(before / 1e6).toFixed(2)}MB -> ${(after / 1e6).toFixed(2)}MB webp`);

      // Remove the interim .jpg if one was created earlier
      const jpg = path.join(destDir, file.replace(/\.png$/i, '.jpg'));
      if (fs.existsSync(jpg)) fs.unlinkSync(jpg);
    }
  }
  console.log('Done.');
})();
