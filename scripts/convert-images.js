const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const outDir = path.join(publicDir, 'optimized');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// placeholders will be written into src so components can import them
const placeholdersPath = path.join(__dirname, '..', 'src', 'image-placeholders.json');
const placeholders = {};

// List the large images we want to optimize (adjustable)
const files = [
  'pic2.jpg',
  'girl.jpg',
  'Pic1.jpg',
  'house.jpg',
  'van.jpg',
  'cycle1.jpg',
  'bike.jpg',
  'greybag.jpg',
  'brown-boot.jpg',
  'blackorange-shows.jpg'
];

const sizes = [480, 768, 1200, 1920];
const formats = [
  { ext: 'avif', options: { quality: 70 } },
  { ext: 'webp', options: { quality: 80 } }
];

async function convert(file) {
  const inPath = path.join(publicDir, file);
  if (!fs.existsSync(inPath)) {
    console.warn('source not found:', file);
    return;
  }
  const base = path.parse(file).name.replace(/\s+/g, '-');
  for (const size of sizes) {
    const pipeline = sharp(inPath).resize({ width: size }).withMetadata();
    for (const fmt of formats) {
      const out = path.join(outDir, `${base}.${size}.${fmt.ext}`);
      await pipeline.toFormat(fmt.ext, fmt.options).toFile(out);
      console.log('wrote', out);
    }
  }

  // create a tiny placeholder (20px) and store as data URI (webp)
  try {
    const buf = await sharp(inPath).resize({ width: 20 }).toFormat('webp', { quality: 40 }).toBuffer();
    const dataUri = `data:image/webp;base64,${buf.toString('base64')}`;
    placeholders[base] = dataUri;
  } catch (err) {
    console.warn('placeholder error for', file, err.message || err);
  }
}

(async () => {
  for (const f of files) {
    try {
      await convert(f);
    } catch (e) {
      console.error('error converting', f, e.message || e);
    }
  }
  // write placeholders JSON for import in components
  try {
    const dir = path.dirname(placeholdersPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(placeholdersPath, JSON.stringify(placeholders, null, 2));
    console.log('wrote placeholders to', placeholdersPath);
  } catch (err) {
    console.warn('failed to write placeholders', err.message || err);
  }

  console.log('done');
})();
