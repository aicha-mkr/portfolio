import "server-only";
import { portfolio, type Brand } from "@/data/portfolio";
import { findLogo } from "./assets";

export type ResolvedBrand = Brand & {
  /** Public URL of the logo, or null when the file is missing (a text placeholder is shown). */
  logo: string | null;
};

/** All brands with their logo files resolved from /public/logos. */
export function getBrands(): ResolvedBrand[] {
  return portfolio.brands.map((brand) => ({ ...brand, logo: findLogo(brand.id) }));
}
