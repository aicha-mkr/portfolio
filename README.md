# Portfolio · Aicha Mokhtar

Next.js (App Router) + TypeScript + Tailwind CSS v4, with GSAP (ScrollTrigger, SplitText) and Lenis for motion.

## Editing content

Everything on the site comes from **`data/portfolio.ts`**. Edit that file and the page updates.

- Leave a string empty (`""`) to hide it (dates, links, locations).
- **Logos:** drop files into `public/logos/` named after each brand's `logo` value
  (e.g. `public/logos/mercedes-benz.svg`). `.svg`, `.png`, `.webp`, `.jpg`, `.jpeg` are detected
  automatically; missing logos show the brand name as text.
- **Photo (optional):** put it in `public/images/` and set `profile.photo`.
- **Featured projects:** edit `featured` in the data file; replace the placeholder images in
  `public/images/featured/` (three per project) and update their paths.

Run `npm run check-assets` to list files that are still missing.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

## Contact form

Messages go to the email in `data/portfolio.ts` (mokhtaraichaa@gmail.com).

- **Default (no setup):** the form sends through [FormSubmit](https://formsubmit.co). The very first message
  triggers an email to that inbox with an **Activate Form** link; click it once and every later message is
  delivered. If you test on `localhost` first, you may get one more activation email when the live domain
  sends its first message.
- **Optional:** set `RESEND_API_KEY` to send through [Resend](https://resend.com) from your own server instead
  (sign up with mokhtaraichaa@gmail.com so the default sender works).

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Optional Resend API key. Without it, FormSubmit is used. |
| `CONTACT_FROM_EMAIL` | Sender for Resend, e.g. `Portfolio <hello@yourdomain.com>` (domain verified in Resend). |
| `NEXT_PUBLIC_SITE_URL` | Production URL for SEO (canonical, sitemap, Open Graph). |

## Deploy

- **Vercel:** import the repo; no config needed. Add the environment variables in Project Settings.
- **Netlify:** import the repo; `netlify.toml` is included and Netlify's Next.js runtime is applied automatically.

## SEO & accessibility

- Metadata, Open Graph/Twitter cards, generated OG image (`app/opengraph-image.tsx`), JSON-LD `Person` schema,
  `sitemap.xml`, `robots.txt`, canonical URL.
- Semantic landmarks, skip link, labelled sections, visible focus styles, accessible accordion,
  pausable marquees. With `prefers-reduced-motion`, the preloader, smooth scroll and all animations are off.
- Content is never hidden without JavaScript; intro states only apply once the boot script runs.

## Design & motion

- Headlines in `data/portfolio.ts` are arrays of lines; wrap words in `*asterisks*` for the italic serif.
- Colors live as tokens in `app/globals.css` (`ink`, `wine`, `sun`, `coral`, `cream`, `bone`, `mud`).
- Scroll animations are opt-in data attributes handled by `components/motion/Animations.tsx`:
  `data-split`, `data-chars`, `data-fade`, `data-stagger`, `data-speed`, `data-count`, `data-marquee`, `data-magnetic`.
- Entry: a "HELLO" curtain (after irinamoi.com) plays on every page load, then shrinks into the header.
- Sections set `data-theme="light" | "mud" | "dark" | "wine"`; the page cross-fades between them while scrolling.
- Featured projects follow irinamoi.com's work section: the word "FEATURED" sharpens, its letters fly apart,
  and projects step through one screen at a time (`components/Featured.tsx`).
- Brand logos live in `public/logos/<id>.svg|png|…`, named after each brand's `id`.
- Hero images are set in `profile.heroImages`; the "Recent work" block flips through its images on hover.
- The footer follows irinamoi.com ("SEE YOU", thank-you note, social links).
