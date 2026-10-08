import type { Metadata, Viewport } from "next";
import { Anton, Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import { portfolio } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const grotesk = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif-italic",
  display: "swap",
});
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });

// Runs before first paint:
// - enables the scroll color themes, starting on the hero's theme;
// - enables intro animations and the "hello" curtain unless reduced motion is preferred.
// Without JavaScript nothing is hidden and each section paints its own colors.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('theme-js');d.dataset.theme='light';if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion','preload')})()`;

const { profile } = portfolio;
const title = `${profile.name} | ${profile.title}`;
const description = `${profile.title} based in ${profile.location}. ${profile.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Fullstack AI Developer",
    "IT Project Lead",
    "Next.js developer",
    "Abu Dhabi",
    "UAE",
    ...portfolio.skills.flatMap((g) => g.items).slice(0, 12),
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const sameAs = [portfolio.contact.linkedin, portfolio.contact.github].filter(Boolean);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: siteUrl,
  email: `mailto:${portfolio.contact.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Abu Dhabi", addressCountry: "AE" },
  knowsLanguage: portfolio.about.languages.map((l) => l.name),
  knowsAbout: portfolio.skills.flatMap((g) => g.items),
  ...(sameAs.length > 0 && { sameAs }),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${serif.variable} ${anton.variable}`}
      // The boot script adds classes before hydration.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="font-sans">
        <a
          href="#main"
          data-native
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-sun focus:px-5 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        <div className="grain" aria-hidden="true" />
        <script
          type="application/ld+json"
          // Static data from data/portfolio.ts; "<" is escaped so the JSON can't close the tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
