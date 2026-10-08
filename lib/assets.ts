import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";

const publicDir = path.join(process.cwd(), "public");
const logoExtensions = ["svg", "png", "webp", "jpg", "jpeg"];

/** True if a "/..." path exists in /public. Evaluated at build time for static pages. */
export function publicFileExists(publicPath: string): boolean {
  if (!publicPath) return false;
  return existsSync(path.join(publicDir, publicPath.replace(/^\//, "")));
}

/** Returns the public URL of a logo in /public/logos, or null if no file is found. */
export function findLogo(name: string): string | null {
  for (const ext of logoExtensions) {
    const url = `/logos/${name}.${ext}`;
    if (publicFileExists(url)) return url;
  }
  return null;
}
