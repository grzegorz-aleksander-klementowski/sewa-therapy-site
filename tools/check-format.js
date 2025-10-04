#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const files = process.argv.slice(2);
if (!files.length) {
  console.error("Usage: node tools/check-format.js <file> [...files]");
  process.exit(1);
}

const errors = [];

for (const file of files) {
  const filepath = path.resolve(process.cwd(), file);
  if (!fs.existsSync(filepath)) {
    errors.push(`${file}: file not found`);
    continue;
  }

  const raw = fs.readFileSync(filepath, "utf8");
  const lines = raw.split(/\r?\n/);

  lines.forEach((line, index) => {
    if (/\s+$/.test(line)) {
      errors.push(`${file}:${index + 1} trailing whitespace`);
    }
    if (/\t/.test(line)) {
      errors.push(`${file}:${index + 1} tab character found`);
    }
  });

  if (!raw.endsWith("\n")) {
    errors.push(`${file}: file must end with a newline`);
  }
}

if (errors.length) {
  console.error("Format check failed:\n" + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}

console.log("Format check passed for", files.join(", "));
