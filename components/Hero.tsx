import type { Profile } from "@/data/portfolio";
import { HeroImage } from "./HeroImage";
import { Mixed } from "./text";

/** Hero after irinamoi.com: centered headline with two image blocks at the edges. */
export function Hero({ profile }: { profile: Profile }) {
  const { left, right } = profile.heroImages;
  
  return (
    <section
      id="top"
      data-hero
      data-theme="light"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-24 pt-32 md:min-h-[62vw] md:pb-32 md:pt-44"
    >
      <div data-intro>
        {/* Left image, tucked against the left edge */}
        <div className="absolute left-0 top-[22vw] hidden md:block">
          <p data-hero-fade className="text-label mb-3 ml-[9vw] text-fg-muted">
            {left.label}
          </p>
          <div data-hero-image>
            <HeroImage
              images={left.images}
              blur={left.blur}
              position="50% 30%"
              alt={`Portrait of ${profile.name}`}
              sizes="22vw"
              className="aspect-square w-[22vw] max-w-[360px]"
            />
          </div>
        </div>

        {/* Right image, lower and against the right edge */}
        <div className="absolute right-0 top-[37vw] hidden md:block">
          <p data-hero-fade className="text-label mb-3 text-fg-muted">
            {right.label}
          </p>
          <div data-hero-image>
            <HeroImage images={right.images} blur={right.blur} sizes="30vw" className="aspect-[16/10] w-[29vw] max-w-[520px]" />
          </div>
        </div>

        <div className="container-x relative">
          <p data-hero-fade className="text-label text-center text-fg-muted">
            {profile.name}
          </p>

          <h1
            id="hero-title"
            data-hero-title
            className="headline-alt mx-auto mt-6 text-center text-[clamp(2.6rem,11vw,4rem)] font-medium uppercase leading-[0.92] tracking-[-0.02em] md:text-[6.2vw]"
          >
            <span className="sr-only">{profile.name}, </span>
            {profile.headline.map((line) => (
              <span key={line} data-hero-line className="block">
                <Mixed line={line} />{" "}
              </span>
            ))}
          </h1>
          <p data-hero-fade className="text-label mt-8 flex items-center justify-center gap-4 text-fg-muted">
            <span aria-hidden="true" className="h-px w-8 bg-current md:w-12" />
            {profile.headlineTag}
            <span aria-hidden="true" className="h-px w-8 bg-current md:w-12" />
          </p>

          <div className="mx-auto mt-14 max-w-md text-center md:ml-[34%] md:mt-[9vw] md:max-w-[30rem] md:text-left">
            <p data-hero-fade className="serif text-2xl leading-tight md:text-[2rem]">
              {profile.tagline}
            </p>
            <ul data-hero-fade className="text-label mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 md:justify-start">
              <li>
                <a href="#featured" className="link-line pb-1 transition-colors hover:text-link">
                  View work
                </a>
              </li>
              <li>
                <a href="#contact" className="link-line pb-1 transition-colors hover:text-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Small viewports: both images under the text */}
          <div data-hero-image className="mt-14 grid grid-cols-[2fr_3fr] items-end gap-3 md:hidden">
            <div>
              <p className="text-label mb-2 text-fg-muted">{left.label}</p>
              <HeroImage images={left.images} blur={left.blur} position="50% 30%" alt={`Portrait of ${profile.name}`} sizes="40vw" className="aspect-square w-full" />
            </div>
            <div>
              <p className="text-label mb-2 text-fg-muted">{right.label}</p>
              <HeroImage images={right.images} blur={right.blur} sizes="60vw" className="aspect-[4/3] w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
