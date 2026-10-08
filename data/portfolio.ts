/**
 * All site content lives here. Edit this file to update the portfolio.
 *
 * Conventions:
 * - Leave a string empty ("") to hide it on the site (e.g. an unknown date or link).
 * - Brands are listed once in `brands` (the logo strip).
 * - Logos: put files in /public/logos named after the brand `id` (e.g. /public/logos/porsche.svg).
 *   .svg, .png, .webp, .jpg and .jpeg are detected automatically. If no file is found,
 *   the brand name is shown as a text placeholder. Run `npm run check-assets` to list missing files.
 * - Images and files referenced with a leading "/" are served from /public.
 * - Headlines are arrays of lines. Wrap words in *asterisks* to set them in the italic serif,
 *   e.g. "Developer *and*" renders "Developer" in caps and "and" in small italics.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Link = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  title: string;
  location: string;
  /** Large hero headline, one entry per line. */
  headline: string[];
  /** Small tag hanging off the last headline line. */
  headlineTag: string;
  /** One-line summary used in the hero and for SEO descriptions. */
  tagline: string;
  /** Optional portrait in /public, e.g. "/images/aicha.jpg". Leave "" to hide. */
  photo: string;
  /**
   * The two image blocks beside the hero headline. Each cycles through its images on hover.
   * Replace the placeholders with your own (e.g. "/images/hero/left-1.jpg").
   */
  heroImages: {
    left: HeroImageGroup;
    right: HeroImageGroup;
  };
};

export type HeroImageGroup = {
  /** Small caption shown above the image. */
  label: string;
  images: string[];
  /** Blur until hovered, like irinamoi.com (default true). */
  blur?: boolean;
};

export type About = {
  /** Large section headline, one entry per line. */
  headline: string[];
  paragraphs: string[];
  /** "What I help with" list. */
  services: string[];
  highlights: { value: string; label: string }[];
  /** Leave level "" to show the language name only. */
  languages: { name: string; level: string }[];
};

export type Experience = {
  company: string;
  role: string;
  /** Optional team/department shown after the role. */
  team?: string;
  /** Leave "" to hide. */
  location: string;
  /** e.g. "Jul 2026 to Present". Leave "" until known. */
  period: string;
  points: string[];
};

export type Brand = {
  /** Unique id; also the logo file name in /public/logos (without extension). */
  id: string;
  name: string;
};

/**
 * One project in "Featured" (after irinamoi.com's work section): a small label, a big two-line
 * title, an italic subtitle and up to three images that glide in around the title.
 */
export type FeaturedProject = {
  /** Small caps label above the title, e.g. the industry. */
  label: string;
  /** Big title, one entry per line (two lines look best). */
  title: string[];
  /** Italic line under the title, e.g. "shopify store". */
  subtitle: string;
  /** Up to three images in /public. Replace the placeholders with your own. */
  images: string[];
};

export type Certification = {
  issuer: string;
  name: string;
  /** Optional year or date, e.g. "2025". */
  date?: string;
  /** Optional verification link. */
  href?: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Contact = {
  /** Large section headline, one entry per line. */
  headline: string[];
  email: string;
  linkedin: string;
  github: string;
  /** Text shown above the contact form. */
  intro: string;
};

export type Portfolio = {
  /** Production URL, used for SEO (canonical, sitemap, Open Graph). Can be overridden with NEXT_PUBLIC_SITE_URL. */
  siteUrl: string;
  profile: Profile;
  /** Words that scroll in the marquee band under the hero. */
  marquee: string[];
  about: About;
  /** Not shown on the site at the moment (the Experience section was removed). */
  experience: Experience[];
  /** Every brand you have worked with. Shown in the brand strip. */
  brands: Brand[];
  /** "Featured" projects, shown one at a time while scrolling. */
  featured: FeaturedProject[];
  certifications: Certification[];
  skills: SkillGroup[];
  contact: Contact;
};

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export const portfolio: Portfolio = {
  siteUrl: "https://aichamokhtar.com", // TODO: replace with your real domain

  profile: {
    name: "Aicha Mokhtar",
    title: "Fullstack AI Developer & IT Project Lead",
    location: "Abu Dhabi, UAE",
    headline: ["Fullstack AI", "Developer *and*", "IT Project Lead"],
    headlineTag: "All solutions AI-powered",
    tagline:
      "I build AI-powered web platforms, enterprise systems and tools, and lead projects from requirements to delivery.",
    photo: "/images/aicha-mokhtar.jpg",
    heroImages: {
      left: {
        label: "Abu Dhabi, UAE",
        images: ["/images/aicha-mokhtar.jpg"],
        blur: false,
      },
      right: {
        label: "Recent work",
        images: [
          "/images/work/amwaj-jewellery.jpg",
          "/images/work/sama-lenses.jpg",
          "/images/work/aman.jpg",
        ],
      },
    },
  },

  marquee: [
    "Every solution AI-powered",
    "Web platforms",
    "Shopify stores",
    "Enterprise systems",
    "AI integrations",
    "Project leadership",
    "From brief to launch",
  ],

  about: {
    headline: ["Experience *across*", "e-commerce, automotive", "*and* enterprise"],
    paragraphs: [
      "Clients in the UAE and Tunisia. I build web platforms, enterprise systems and AI-powered tools, and lead projects from requirements to delivery.",
    ],
    /** Shown under the label "Services, all AI-powered". */
    services: [
      "Fullstack web platforms",
      "Enterprise systems & ERP",
      "AI tools & integrations",
      "BRDs & process mapping",
      "+ Projects led end to end",
    ],
    highlights: [
      { value: "15+", label: "Brands across automotive, real estate & luxury" },
      { value: "40+", label: "Projects delivered" },
      { value: "AI-first", label: "Every build ships with smart features" },
    ],
    languages: [
      { name: "Arabic", level: "" }, // TODO: optional level, e.g. "Native"
      { name: "French", level: "" },
      { name: "English", level: "" },
      { name: "Spanish", level: "A2" },
    ],
  },

  experience: [
    {
      company: "Ali & Sons Holding",
      role: "Fullstack AI Developer",
      team: "Digital Innovation Hub",
      location: "Abu Dhabi",
      period: "Jul 2026 to Present",
      points: [
        "Building group websites and enterprise platforms across automotive, real estate and retail businesses",
        "Leading requirements, architecture and delivery for new digital systems",
        "Integrating government services (UAE PASS) and AI features",
      ],
    },
    {
      company: "OMC Accounting & Auditing Co. LLC",
      role: "IT & Business Development Manager",
      location: "Dubai",
      period: "", // TODO: add dates
      points: [
        "Owned IT infrastructure and the Microsoft Teams migration",
        "Configured Zoho CRM with LeadChain integration",
        "Ran Meta Ads campaigns (Corporate Tax, AML compliance) incl. WhatsApp-destination ads; built LinkedIn lead-gen forms",
        "Produced multilingual (AR/FR/EN) content and client documents",
      ],
    },
    {
      company: "Gabes Motors",
      role: "IT Project Coordinator",
      location: "Tunisia",
      period: "", // TODO: add dates
      points: [
        "Led a team of 4 delivering the After-Sales (SAV) ERP module; managed the full SDLC",
        "Deployed complete network infrastructure in 3 weeks",
        "Coordinated 3 external vendors",
      ],
    },
    {
      company: "Freelance",
      role: "Web Developer",
      location: "", // optional
      period: "", // TODO: add dates
      points: [
        "Website audits and builds for UAE clients (real estate, cosmetics, finance)",
        "WordPress/WooCommerce projects",
        "25+ Electron.js desktop apps",
      ],
    },
    {
      company: "Social Media Management",
      role: "Luxury & automotive brands",
      location: "", // optional
      period: "", // TODO: add dates
      points: ["Lella Gallery, SAMA Lenses, Zahra Abed House"],
    },
  ],

  brands: [
    { id: "ali-and-sons-holding", name: "Ali & Sons Holding" },
    { id: "asre", name: "Ali & Sons Real Estate (ASRE)" },
    { id: "aman", name: "AMAN" },
    { id: "eurostar-rent-a-car", name: "Eurostar Rent-A-Car" },
    { id: "xpeng-uae", name: "Xpeng UAE" },
    { id: "porsche", name: "Porsche" },
    { id: "audi", name: "Audi" },
    { id: "volkswagen", name: "Volkswagen" },
    { id: "noor-saray-real-estate", name: "Noor Saray Real Estate" },
    { id: "amwaj-jewellery", name: "Amwaj Jewellery" },
    { id: "al-nadharah", name: "Al Nadharah Cosmetics" },
    { id: "sama-lenses", name: "SAMA Lenses" },
    { id: "omc-accounting-auditing", name: "OMC Accounting & Auditing" },
  ],

  featured: [
    {
      label: "Jewellery & Luxury",
      title: ["Amwaj", "Jewellery"],
      subtitle: "shopify store",
      images: ["/images/featured/amwaj-1.jpg", "/images/featured/amwaj-2.jpg", "/images/featured/amwaj-3.jpg"],
    },
    {
      label: "Beauty & Eyewear",
      title: ["SAMA", "Lenses"],
      subtitle: "shopify store",
      images: ["/images/featured/sama-1.jpg", "/images/featured/sama-2.jpg", "/images/featured/sama-3.jpg"],
    },
    {
      label: "Automotive",
      title: ["AMAN", "Platform"],
      subtitle: "dealer management system",
      images: ["/images/featured/aman-1.jpg", "/images/featured/aman-2.jpg", "/images/featured/aman-3.jpg"],
    },
  ],

  certifications: [
    {
      issuer: "LinkedIn Learning",
      name: "React Native Essentials",
      date: "Sep 2025",
      href: "https://www.linkedin.com/learning/certificates/17234f876b5d8016dcc4f3a16a68f9a04950fe02c605ff3d9bd2db61aff4c230",
    },
    {
      issuer: "LinkedIn Learning",
      name: "Discover Generative AI",
      date: "Jul 2025",
      href: "https://www.linkedin.com/learning/certificates/ddbe18d644cbaae90a9b6ae096660646b41a847df5ec1b0b240dc9af96d131ee",
    },
    {
      issuer: "Google Cloud · Coursera",
      name: "Introduction to Generative AI",
      date: "Jul 2024",
      href: "https://coursera.org/share/37138755c1affc01517442ac7118b9e4",
    },
    {
      issuer: "Meta · Coursera",
      name: "Principles of UX/UI Design",
      date: "May 2024",
      href: "https://coursera.org/share/68e02aa6715fb9225464feb2ad618486",
    },
    {
      issuer: "SCRUMstudy",
      name: "Scrum Fundamentals Certified (SFC™)",
      date: "2024",
      href: "https://www.scrumstudy.com/certification/verify?type=SFC&number=1033549",
    },
    {
      issuer: "Google Developer IT Clubs",
      name: "Core Member",
      date: "2022-2023",
      // TODO: the certificate link on the old site is broken; add the image to /public and link it here
    },
  ],

  skills: [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
    { category: "Backend", items: ["Node.js", "Express", "NestJS", "Python"] },
    { category: "Data", items: ["PostgreSQL", "SQL Server", "Supabase", "Redis"] },
    { category: "CMS & E-commerce", items: ["Sanity", "Shopify", "WooCommerce", "Medusa.js"] },
    { category: "AI", items: ["Claude API", "OpenAI"] },
    { category: "Cloud & Desktop", items: ["Google Cloud Platform", "Electron.js"] },
    {
      category: "Business",
      items: [
        "BRDs",
        "Process mapping (AS-IS / TO-BE)",
        "Stakeholder & vendor management",
        "Zoho CRM",
        "Meta Ads",
      ],
    },
  ],

  contact: {
    headline: ["Let's *talk*"],
    email: "mokhtaraichaa@gmail.com",
    linkedin: "https://www.linkedin.com/in/aicha-mokhtar-072600252/",
    github: "https://github.com/aicha-mkr",
    intro:
      "Have a project, a role or a question? Send a message and I'll get back to you.",
  },
};
