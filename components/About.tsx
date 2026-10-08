import type { About as AboutData } from "@/data/portfolio";
import { Eyebrow, Mixed } from "./text";

export function About({ about }: { about: AboutData }) {
  return (
    <section id="about" data-theme="mud" aria-labelledby="about-title" className="relative -mt-14 pb-28 pt-36 md:pb-40 md:pt-48">
      <div className="container-x">
        <Eyebrow label="About" />
        <h2 id="about-title" data-split className="headline-alt text-display mt-8 font-medium uppercase">
          {about.headline.map((line) => (
            <span key={line} className="block">
              <Mixed line={line} />{" "}
            </span>
          ))}
        </h2>

        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:col-start-2">
            <div data-fade className="space-y-5 text-lg leading-relaxed md:text-xl">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div data-fade className="mt-10">
              <h3 className="text-label text-fg-muted">Languages</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {about.languages.map((lang) => (
                  <li key={lang.name} className="rounded-full border border-fg/25 px-4 py-2 text-sm">
                    {lang.name}
                    {lang.level && <span className="serif text-fg-muted"> {lang.level}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <h3 className="text-label text-fg-muted">Services, all AI-powered</h3>
            <ul data-stagger className="mt-5 space-y-1">
              {about.services.map((service) => (
                <li key={service} className="serif text-3xl leading-tight md:text-[2.1rem]">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <dl className="mt-24 grid grid-cols-3 border-t border-line md:mt-32">
          {about.highlights.map((h, i) => (
            <div key={h.label} className={`flex flex-col pt-8 ${i > 0 ? "border-l border-line pl-4 md:pl-8" : ""}`}>
              <dt className="text-label order-2 mt-3 text-fg-muted">{h.label}</dt>
              <dd data-count className="order-1 font-condensed text-[clamp(3.25rem,10vw,9rem)] leading-[0.85] tabular-nums">
                {h.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
