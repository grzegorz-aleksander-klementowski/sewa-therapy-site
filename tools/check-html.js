#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const file = process.argv[2];
if (!file) {
  console.error("Usage: node tools/check-html.js <file>");
  process.exit(1);
}

const filepath = path.resolve(process.cwd(), file);
if (!fs.existsSync(filepath)) {
  console.error(`HTML check failed: ${file} not found`);
  process.exit(1);
}

const html = fs.readFileSync(filepath, "utf8");
const issues = [];

const normalized = html.replace(/\s+/g, " ").toLowerCase();

if (!/^<!doctype html>/i.test(html.trim())) {
  issues.push("missing <!DOCTYPE html>");
}
if (!/<html[^>]*lang=/i.test(html)) {
  issues.push("<html> tag missing lang attribute");
}
if (!/<head[\s>]/i.test(html) || !/<\/head>/i.test(html)) {
  issues.push("missing <head> section");
}
if (!/<body[\s>]/i.test(html) || !/<\/body>/i.test(html)) {
  issues.push("missing <body> section");
}
if (!/<link[^>]+href=["']style\.css["']/i.test(html)) {
  issues.push("style.css link not found in <head>");
}
if (!/<script[^>]+src=["']script\.js["'][^>]*><\/script>/i.test(html)) {
  issues.push("script.js script tag missing at end of document");
}

const ids = {};
const idRegex = /id="([^"]+)"/gi;
let match;
while ((match = idRegex.exec(html))) {
  const id = match[1];
  ids[id] = (ids[id] || 0) + 1;
}
Object.entries(ids).forEach(([id, count]) => {
  if (count > 1) {
    issues.push(`duplicate id="${id}" detected`);
  }
});

if (!/<section[^>]+id="intro"/i.test(html)) {
  issues.push("intro section missing");
}
if (!/<section[^>]+id="transition"/i.test(html)) {
  issues.push("transition section missing");
}
if (!/<section[^>]+id="home"/i.test(html)) {
  issues.push("home section missing");
}

if (issues.length) {
  console.error("HTML check failed:\n" + issues.map((i) => `  - ${i}`).join("\n"));
  process.exit(1);
}

console.log(`HTML check passed for ${file}`);
