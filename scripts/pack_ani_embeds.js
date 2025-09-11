#!/usr/bin/env node
// Packs .ani binaries into same-origin JSON for CSP-safe loading
// Usage: node scripts/pack_ani_embeds.js

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'assets', 'ani file-animation WxS');
const OUT_DIR = path.join(__dirname, '..', 'assets', 'ani-embed');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function main() {
  ensureDir(OUT_DIR);
  const files = fs
    .readdirSync(SRC_DIR)
    .filter((f) => f.toLowerCase().endsWith('.ani'))
    .sort();
  const index = [];
  for (const f of files) {
    const src = path.join(SRC_DIR, f);
    const b64 = fs.readFileSync(src).toString('base64');
    const out = { name: f, b64 };
    fs.writeFileSync(
      path.join(OUT_DIR, `${f}.json`),
      JSON.stringify(out),
      'utf8',
    );
    index.push(f);
  }
  fs.writeFileSync(
    path.join(OUT_DIR, 'index.json'),
    JSON.stringify(index, null, 2),
    'utf8',
  );
  console.log(`Packed ${index.length} ani cursors into ${OUT_DIR}`);
}

main();

