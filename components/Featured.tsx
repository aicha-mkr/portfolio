"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { FeaturedProject } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WORD = "FEATURED";
/** Scroll distance per project, in svh. */
const STEP = 70;
/** How long the glide to the next project takes, in seconds. */
const GLIDE = 1;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Slot = {
  /** Desktop position (% of the screen) and width (vw). */
  left: number;
  top: number;
  width: number;
  ratio: string;
  /** How far the image travels relative to the others (parallax feel). */
  travel: number;
  /** Small-screen position, or null to hide on small screens. */
  mobile: { left: number; top: number } | null;
};

// Three landscape image slots per project (website screenshots), kept clear of the centered
// title; layouts rotate so each project feels different.
const LAYOUTS: Slot[][] = [
  [
    { left: 5, top: 6, width: 26, ratio: "16 / 10", travel: 1, mobile: { left: 4, top: 8 } },
    { left: 67, top: 5, width: 27, ratio: "16 / 10", travel: 0.7, mobile: null },
    { left: 64, top: 68, width: 27, ratio: "16 / 10", travel: 1.3, mobile: { left: 50, top: 68 } },
  ],
  [
    { left: 6, top: 66, width: 28, ratio: "16 / 10", travel: 1.2, mobile: { left: 4, top: 8 } },
    { left: 63, top: 7, width: 30, ratio: "16 / 10", travel: 0.8, mobile: null },
    { left: 9, top: 6, width: 23, ratio: "16 / 10", travel: 1.4, mobile: { left: 50, top: 68 } },
  ],
  [
    { left: 66, top: 66, width: 28, ratio: "16 / 10", travel: 0.9, mobile: { left: 4, top: 8 } },
    { left: 6, top: 4, width: 26, ratio: "16 / 10", travel: 1.2, mobile: null },
    { left: 5, top: 68, width: 24, ratio: "16 / 10", travel: 1.4, mobile: { left: 50, top: 68 } },
  ],
];

type Status = "previous" | "current" | "next";

/**
 * Featured projects after irinamoi.com's work section: a blurred word comes into focus,
 * its letters fly apart to frame each project, and projects step through one per screen
 * while their images glide in and out.
 */
export function Featured({ projects }: { projects: FeaturedProject[] }) {
  const section = useRef<HTMLElement>(null);
  const cases = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [inside, setInside] = useState(false);
  /** True while a wheel step glides the page; scroll-driven updates wait until it lands. */
  const gliding = useRef(false);
  const total = projects.length;

  useGSAP(
    () => {
      // Which project is on screen, from scroll progress through the case area.
      ScrollTrigger.create({
        trigger: cases.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (gliding.current) return;
          setActive(Math.min(total - 1, Math.round(self.progress * (total - 1))));
          if (self.progress > 0) setInside(true);
        },
        onEnter: () => setInside(true),
        onLeaveBack: () => setInside(false),
      });

      // The word sharpens and its letters part as the section scrolls in.
      const mm = gsap.matchMedia();

      // Touch screens and reduced motion scroll natively: settle on the nearest project.
      mm.add("(pointer: coarse), (prefers-reduced-motion: reduce)", () => {
        ScrollTrigger.create({
          trigger: cases.current,
          start: "top top",
          end: "bottom bottom",
          snap: { snapTo: 1 / (total - 1), duration: { min: 0.3, max: 0.7 }, delay: 0.08, ease: "power2.inOut" },
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: section.current, start: "top 80%", end: "top 20%", scrub: 1 },
          })
          .fromTo("[data-word]", { filter: "blur(6px)" }, { filter: "blur(0px)" })
          .to("[data-letter]:nth-child(odd)", { y: -50 }, "<")
          .to("[data-letter]:nth-child(even)", { y: 50 }, "<");
      });
    },
    { scope: section },
  );

  // Wheel / trackpad: each gesture glides to exactly one project, so nothing is skipped
  // (irinamoi.com locks scrolling the same way). Outside the section, scrolling is normal.
  useEffect(() => {
    const lenis = window.__lenis;
    const el = cases.current;
    if (!lenis || !el || total < 2) return;

    let lastTime = 0;
    let lastMagnitude = 0;
    const geometry = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const step = (el.offsetHeight - window.innerHeight) / (total - 1);
      return { top, step, end: top + step * (total - 1) };
    };
    const glideTo = (index: number) => {
      // Show the new project right away; the page scroll catches up underneath.
      gliding.current = true;
      setInside(true);
      setActive(index);
      const { top, step } = geometry();
      // The first project lands 2px in so it counts as entered (progress > 0).
      lenis.scrollTo(top + index * step + (index === 0 ? 2 : 0), {
        duration: GLIDE,
        easing: easeInOutCubic,
        lock: true,
        onComplete: () => {
          gliding.current = false;
        },
      });
    };

    window.__scrollGuard = ({ deltaY, event }) => {
      if (event.type.includes("touch")) return true;

      // A new gesture starts after a pause or with a stronger push; trackpad momentum
      // (a stream of fading deltas) is not a new gesture.
      const now = performance.now();
      const magnitude = Math.abs(deltaY);
      const isNewGesture = now - lastTime > 160 || magnitude > lastMagnitude * 1.6 + 6;
      lastTime = now;
      lastMagnitude = magnitude;

      const consume = () => {
        if (event.cancelable) event.preventDefault();
        return false;
      };
      if (gliding.current) return consume();
      if (magnitude < 1) return true;

      const { top, step, end } = geometry();
      const y = window.scrollY;
      const dir = deltaY > 0 ? 1 : -1;
      const near = window.innerHeight * 0.6;
      const inSection = y >= top - 4 && y <= end + 4;
      const arriving = (dir > 0 && y < top - 4 && y > top - near) || (dir < 0 && y > end + 4 && y < end + near);

      if (!inSection && !arriving) return true;
      if (arriving) {
        glideTo(dir > 0 ? 0 : total - 1);
        return consume();
      }

      const next = Math.round((y - top) / step) + dir;
      if (!isNewGesture) return consume(); // momentum from the last swipe
      if (next < 0 || next >= total) return true; // a fresh scroll leaves the section normally
      glideTo(next);
      return consume();
    };

    return () => {
      delete window.__scrollGuard;
    };
  }, [total]);

  const statusOf = (i: number): Status => (!inside || i > active ? "next" : i === active ? "current" : "previous");
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      ref={section}
      id="featured"
      data-theme="dark"
      aria-labelledby="featured-title"
      className="featured relative"
      data-in={inside || undefined}
    >
      <h2 id="featured-title" className="sr-only">
        Featured projects
      </h2>
      {/* All projects for screen readers and keyboard users; the visual stepper is decorative. */}
      <ul className="sr-only">
        {projects.map((p) => (
          <li key={p.title.join(" ")}>
            {p.title.join(" ")}: {p.label}, {p.subtitle}
          </li>
        ))}
      </ul>

      {/* Sticky word */}
      <div aria-hidden="true" className="pointer-events-none sticky top-0 z-20 flex h-svh items-center justify-center">
        <p
          data-word
          className="featured-word flex gap-[2vw] text-[clamp(2.4rem,7vw,7rem)] font-medium uppercase leading-[0.72] opacity-80"
        >
          {[...WORD].map((letter, i) => {
            // Where each letter flies to (and fades out) once the first project appears.
            const dx = (i - (WORD.length - 1) / 2) * 4;
            const dy = i % 2 ? 60 : -60;
            return (
              <span
                key={i}
                data-letter
                className="block"
                style={{ "--dx": `${dx}vw`, "--dy": `${dy}svh`, "--rot": `${dx * 1.5}deg` } as CSSProperties}
              >
                <span className="featured-letter block">{letter}</span>
              </span>
            );
          })}
        </p>
      </div>

      {/* Steps: one screen per project */}
      {/* Starts half a screen after the word, then STEP svh of scrolling per project. */}
      <div ref={cases} className="relative -mt-[50svh]" style={{ height: `${100 + (total - 1) * STEP}svh` }}>
        <div className="sticky top-0 h-svh overflow-hidden">
          <p aria-hidden="true" className="featured-count text-label absolute left-1/2 top-[7%] z-20 -translate-x-1/2 text-fg-muted">
            Featured projects
          </p>
          <p aria-hidden="true" className="featured-count serif absolute left-[3vw] top-[38%] z-20 hidden text-3xl md:block">
            {pad(active + 1)}
          </p>
          <p aria-hidden="true" className="featured-count serif absolute right-[3vw] top-[58%] z-20 hidden text-3xl md:block">
            /{pad(total)}
          </p>

          {projects.map((project, i) => {
            const status = statusOf(i);
            const layout = LAYOUTS[i % LAYOUTS.length];
            const [first, ...rest] = project.title;
            return (
              <article
                key={project.title.join(" ")}
                data-status={status}
                aria-hidden={status !== "current" || undefined}
                inert={status !== "current"}
                className="featured-case absolute inset-0"
              >
                {project.images.slice(0, 3).map((src, s) => {
                  const slot = layout[s];
                  return (
                    <div
                      key={src}
                      className={`featured-img absolute ${slot.mobile ? "" : "hidden md:block"}`}
                      style={
                        {
                          "--l": `${slot.left}%`,
                          "--t": `${slot.top}%`,
                          "--ml": `${slot.mobile?.left ?? 0}%`,
                          "--mt": `${slot.mobile?.top ?? 0}%`,
                          "--w": `${slot.width}vw`,
                          "--f": slot.travel,
                          aspectRatio: slot.ratio,
                        } as CSSProperties
                      }
                    >
                      <Image src={src} alt="" fill sizes={`(min-width: 768px) ${slot.width}vw, 46vw`} className="object-cover" />
                    </div>
                  );
                })}

                <div className="featured-head absolute left-1/2 top-1/2 z-10 w-[min(88vw,56rem)] -translate-x-1/2 -translate-y-1/2">
                  <p className="featured-label text-label mb-5 md:mb-7">{project.label}</p>
                  <p className="featured-title block text-[clamp(2.6rem,7.6vw,8.5rem)] font-medium uppercase leading-[0.86] tracking-[-0.02em]">
                    <span className="block">{first}</span>
                    {rest.length > 0 && <span className="block pl-[14vw] md:pl-[16vw]">{rest.join(" ")}</span>}
                  </p>
                  <p className="featured-sub serif mt-4 pl-[22vw] text-2xl md:mt-6 md:pl-[24vw] md:text-3xl">{project.subtitle}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
