"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const items = [
  { id: "about", label: "About" },
  { id: "featured", label: "Featured" },
  { id: "skills", label: "Skills", wide: true },
];

/** Floating bottom navigation with a highlighted call to action (marcuslorenzet.com). */
export function PillNav({ initials, photo }: { initials: string; photo?: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = [...items.map((i) => i.id), "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      data-intro
      data-pill-nav
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:bottom-6"
    >
      <ul className="flex items-center gap-1 rounded-full border border-line bg-ink/75 p-1.5 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.8)] backdrop-blur-xl">
        {items.map((item) => (
          <li key={item.id} className={item.wide ? "hidden sm:block" : undefined}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className="text-label block rounded-full px-3.5 py-2.5 text-bone/70 transition-colors hover:text-burgundy-soft aria-[current]:bg-bone/10 aria-[current]:text-bone sm:px-4"
            >
              {item.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            aria-current={active === "contact" ? "true" : undefined}
            className="text-label ml-1 flex items-center gap-2.5 rounded-full bg-cream py-1.5 pl-1.5 pr-4 font-semibold text-ink transition-colors hover:bg-burgundy hover:text-bone"
          >
            <span aria-hidden="true" className="relative grid size-7 place-items-center overflow-hidden rounded-full bg-ink text-[0.6rem] tracking-normal text-cream">
              {photo ? <Image src={photo} alt="" fill sizes="28px" className="object-cover object-top" /> : initials}
            </span>
            Let&apos;s talk
          </a>
        </li>
      </ul>
    </nav>
  );
}
