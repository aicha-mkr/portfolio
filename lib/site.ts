import { portfolio } from "@/data/portfolio";

/** Absolute production URL without trailing slash. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || portfolio.siteUrl).replace(/\/$/, "");
