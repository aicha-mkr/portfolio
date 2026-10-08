import type { Certification, SkillGroup } from "@/data/portfolio";
import { ArrowUpRight } from "./Icons";


export function Skills({ groups, certifications }: { groups: SkillGroup[]; certifications: Certification[] }) {
  return (
    <section id="skills" data-theme="dark" aria-labelledby="skills-title" className="py-28 md:py-40">
      <div className="container-x">
        <h2 id="skills-title" data-split className="text-display font-medium uppercase">
          Skills
        </h2>

        <dl data-stagger className="mt-16 border-t border-line md:mt-24">
          {groups.map((group) => (
            <div key={group.category} className="grid gap-4 border-b border-line py-7 md:grid-cols-12 md:items-baseline md:gap-8 md:py-9">
              <dt className="serif text-2xl text-cream md:col-span-4 md:text-3xl">{group.category}</dt>
              <dd className="md:col-span-8">
                <ul className="flex flex-wrap gap-x-3 gap-y-1 text-lg font-medium uppercase md:text-2xl">
                  {group.items.map((item, i) => (
                    <li key={item} className="flex items-center gap-3">
                      {item}
                      {i < group.items.length - 1 && (
                        <span aria-hidden="true" className="text-fg-muted">
                          /
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-28 md:mt-36">
          <h3 data-split className="text-title font-medium uppercase">
            Certifications
          </h3>
          <ul data-stagger className="mt-10 border-t border-line md:mt-14">
            {certifications.map((cert) => {
              const row = (
                <>
                  <span className="serif text-lg text-fg-muted">{cert.date}</span>
                  <span className="text-xl font-medium uppercase leading-tight transition-[transform,color] duration-500 ease-out-expo group-hover:translate-x-2 group-hover:text-link md:text-3xl">
                    {cert.name}
                  </span>
                  <span className="text-label col-start-2 text-fg-muted md:col-start-auto">{cert.issuer}</span>
                  <span className="text-label hidden justify-self-end md:block">
                    {cert.href && (
                      <span className="inline-flex items-center gap-1.5 transition-colors group-hover:text-link">
                        View <ArrowUpRight />
                      </span>
                    )}
                  </span>
                </>
              );
              const rowClass =
                "group grid grid-cols-[5.5rem_1fr] items-baseline gap-x-6 gap-y-2 border-b border-line py-6 md:grid-cols-[8rem_1fr_16rem_6rem] md:py-8";
              return (
                <li key={`${cert.issuer}-${cert.name}`}>
                  {cert.href ? (
                    <a href={cert.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
                      {row}
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <div className={rowClass}>{row}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
