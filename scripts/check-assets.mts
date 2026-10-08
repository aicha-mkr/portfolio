// Lists files referenced in data/portfolio.ts that are missing from /public.
// Run with: npm run check-assets (needs Node 22.18+ for built-in TypeScript support)
import { existsSync } from "node:fs";
import { portfolio } from "../data/portfolio.ts";

const has = (p: string) => existsSync(new URL(`../public${p}`, import.meta.url));
const exts = ["svg", "png", "webp", "jpg", "jpeg"];
const missing: string[] = [];

for (const b of portfolio.brands) {
  if (!exts.some((e) => has(`/logos/${b.id}.${e}`))) missing.push(`public/logos/${b.id}.(svg|png|webp|jpg)  — ${b.name}`);
}
if (portfolio.profile.photo && !has(portfolio.profile.photo)) missing.push(`public${portfolio.profile.photo}  — photo`);
const { left, right } = portfolio.profile.heroImages;
for (const src of [...left.images, ...right.images]) {
  if (!has(src)) missing.push(`public${src}  — hero image`);
}
for (const p of portfolio.featured) {
  for (const src of p.images) if (!has(src)) missing.push(`public${src}  — ${p.title.join(" ")}`);
}
const placeholders = portfolio.featured.flatMap((p) => p.images).filter((src) => src.startsWith("/images/featured/") && src.endsWith(".svg"));

console.log(missing.length ? `Missing ${missing.length} file(s):\n  ${missing.join("\n  ")}` : "All referenced files present.");
if (placeholders.length) console.log(`\n${placeholders.length} featured image(s) are still placeholders in public/images/featured/.`);
