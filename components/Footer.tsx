import type { Contact } from "@/data/portfolio";
import { MoveAway } from "./MoveAway";
import { JumpText } from "./text";

/** Footer after irinamoi.com: "SEE YOU", a thank-you note with the email, and social links. */
export function Footer({ name, contact }: { name: string; contact: Contact }) {
  const socials = [
    { label: "LinkedIn", href: contact.linkedin },
    { label: "GitHub", href: contact.github },
  ].filter((s) => s.href);

  return (
    <footer data-theme="wine" className="pt-10 md:pt-14">
      <p className="container-x mb-12 flex flex-col text-[clamp(4rem,9.7vw,10rem)] font-medium uppercase leading-none opacity-40 md:mb-16 md:flex-row md:justify-between">
        <MoveAway text="See" className="flex h-[1.55em] items-end justify-between gap-[0.3em] md:gap-[1.1em]" />
        <MoveAway text="You" className="flex h-[1.55em] items-end justify-between gap-[0.3em] md:gap-[1.1em]" />
      </p>

      <div className="container-x flex flex-col gap-12 md:flex-row md:justify-between">
        <section className="md:max-w-[30rem]">
          <h2 className="text-label mb-4 text-mud md:mb-5">Thank you</h2>
          <p className="serif text-2xl leading-snug md:text-[2rem]">
            {contact.intro}{" "}
            <a href={`mailto:${contact.email}`} className="font-sans not-italic text-sun transition-colors hover:text-link">
              {contact.email}
            </a>
          </p>
        </section>

        {socials.length > 0 && (
          <section className="md:min-w-[18rem]">
            <h2 className="text-label mb-4 text-mud md:mb-5">Keep in touch</h2>
            <ul className="serif text-2xl leading-snug md:text-[2rem]">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-link">
                    <JumpText text={s.label} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <div className="mt-12 border-t border-mud/40 py-5 pb-28 sm:pb-24">
        <small className="container-x text-label block text-mud">
          All rights reserved • {new Date().getFullYear()} • {name}
        </small>
      </div>
    </footer>
  );
}
