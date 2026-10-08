"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { markIntroReady } from "@/lib/motion";
import { Hello } from "../Hello";

/**
 * Entry curtain after irinamoi.com: a burgundy screen where "HELLO" rises letter by letter,
 * then shrinks into the header while the curtain pulls up. The inline boot script in the
 * layout adds `preload` to <html> before paint (skipped for reduced motion).
 */
export function Curtain() {
  const inner = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const labelEl = label.current;
    if (!html.classList.contains("preload") || !labelEl) {
      markIntroReady();
      return;
    }

    window.__lenis?.stop();

    // Everything set here is reverted on cleanup, so a re-run (e.g. React strict mode)
    // measures the untouched layout again.
    const ctx = gsap.context(() => {
      // Start exactly where the header's HELLO sits, so the hand-off is seamless.
      const target = document.querySelector<HTMLElement>("[data-hello-target]");
      if (target) {
        const r = target.getBoundingClientRect();
        gsap.set(labelEl, { left: r.left, top: r.top });
      } else {
        gsap.set(labelEl, { left: "50%", xPercent: -50 });
      }

      const scale = window.matchMedia("(min-width: 768px)").matches ? 4.25 : 3.25;
      const rect = labelEl.getBoundingClientRect();
      const toCenter = window.innerHeight / 2 - (rect.top + rect.height / 2);
      const below = window.innerHeight / 2 / scale + rect.height * scale;
      const letters = labelEl.querySelectorAll("[data-hello-letter]");

      gsap.set(labelEl, { scale, y: toCenter });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          html.classList.remove("preload");
          window.__lenis?.start();
        },
      });

      // Letters rise one after another, slightly blurred, landing together.
      [1.33, 1.3, 1.14, 1.04, 0.92].forEach((duration, i) => {
        tl.from(letters[i], { y: below, filter: "blur(3px)", duration }, 0.25 + i * 0.07);
      });

      tl.to(labelEl, { scale: 1, y: 0, filter: "blur(2px)", duration: 0.91 })
        .to(inner.current, { scaleY: 0, duration: 1.49, ease: "power3.inOut" }, "<")
        .to(labelEl, { autoAlpha: 0, filter: "none", duration: 0.75 }, "-=1")
        .add(markIntroReady, "-=1.15");
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="curtain" aria-hidden="true" className="fixed inset-0 z-[70]">
      <div ref={inner} className="absolute inset-0 h-svh origin-top bg-wine-2" />
      <p
        ref={label}
        className="fixed left-1/2 top-7 text-base text-bone will-change-transform md:top-9 md:text-xl"
      >
        <Hello />
      </p>
    </div>
  );
}
