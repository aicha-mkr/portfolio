"use client";

import { useEffect, useState } from "react";
import { Hello } from "./Hello";

/** Fixed top bar (irinamoi.com): name, "HELLO" in the middle, links on the right. Hides while scrolling down. */
export function Header({ name }: { name: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [first, ...rest] = name.split(" ");

  return (
    <header
      data-intro
      className={`fixed inset-x-0 top-0 z-50 text-fg transition-transform duration-700 ease-out-expo ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container-x grid grid-cols-[1fr_auto_1fr] items-center py-5 md:py-7">
        <a href="#top" className="justify-self-start text-[0.72rem] font-semibold uppercase leading-[1.1] tracking-[0.26em] transition-colors hover:text-link">
          <span className="block">{first}</span>
          <span className="block">{rest.join(" ")}</span>
        </a>

        <a href="#top" aria-label="Back to top" className="text-base transition-colors hover:text-link md:text-xl">
          <span data-hello-target className="inline-block">
            <Hello />
          </span>
        </a>

        <nav aria-label="Primary" className="justify-self-end">
          <ul className="serif flex items-center gap-6 text-lg md:gap-8 md:text-xl">
            <li className="hidden sm:block">
              <a href="#featured" className="link-line transition-colors hover:text-link">
                featured
              </a>
            </li>
            <li>
              <a href="#contact" className="link-line transition-colors hover:text-link">
                contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
