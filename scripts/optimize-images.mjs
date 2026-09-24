// Turn camera originals into web-ready photos:
//   originals/DSCF1277.jpg -> src/images/photos/DSCF1277.jpg
//
// Resizes to fit MAX_EDGE, re-encodes as JPEG, bakes in the EXIF rotation,
// and drops all metadata (GPS location, camera, timestamps). next/image makes
// the smaller sizes itself; this just keeps the repo and the public original
// small and private. originals/ is gitignored, so full-size files never land
// in git history.
//
// Usage: npm run images            (only new or changed originals)
//        npm run images -- --force (everything)

import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const INPUT_DIR = 'originals';
const OUTPUT_DIR = 'src/images/photos';
const MAX_EDGE = 2400;
const QUALITY = 80;
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.heic', '.tif', '.tiff']);

async function mtime(file) {
  try {
    return (await stat(file)).mtimeMs;
  } catch {
    return 0;
  }
}

function formatKB(bytes) {
  return `${Math.round(bytes / 1024).toLocaleString()} KB`;
}

let force = process.argv.includes('--force');
await mkdir(INPUT_DIR, { recursive: true });
let files = (await readdir(INPUT_DIR)).filter((file) =>
  EXTENSIONS.has(path.extname(file).toLowerCase())
);

if (!files.length) {
  console.log(`Nothing in ${INPUT_DIR}/. Drop camera files there first.`);
}

for (let file of files) {
  let input = path.join(INPUT_DIR, file);
  let output = path.join(OUTPUT_DIR, `${path.parse(file).name}.jpg`);

  if (!force && (await mtime(output)) >= (await mtime(input))) {
    console.log(`skip  ${file} (up to date)`);
    continue;
  }

  // sharp writes no metadata unless asked to, so the output has no EXIF/GPS
  let info = await sharp(input)
    .rotate()
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(output);

  let before = (await stat(input)).size;
  console.log(
    `done  ${file} -> ${output}  ${info.width}x${info.height}  ` +
      `${formatKB(before)} -> ${formatKB(info.size)}`
  );
}
