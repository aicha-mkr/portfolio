"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { onIntroReady } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Declarative scroll animations. Server components opt in with data attributes:
 *   data-split        reveal text line by line from a mask
 *   data-chars        reveal text character by character
 *   data-fade         fade + rise when scrolled into view
 *   data-stagger      fade + rise each child in sequence
 *   data-speed="0.2"  parallax (positive = moves up faster)
 *   data-count        count up the number inside, keeping any suffix ("25+")
 *   data-marquee      infinite horizontal loop that speeds up with scroll velocity
 *   data-magnetic     element follows the pointer slightly (fine pointers only)
 * Everything is skipped when the visitor prefers reduced motion.
 */
export function Animations() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", (ctx) => {
      const disposers: (() => void)[] = [];

      const heroIntro = ctx.add("heroIntro", () => {
        // Sequence after irinamoi.com: label, headline lines one by one, images, captions, text.
        const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
        const images = gsap.utils.toArray<HTMLElement>("[data-hero-image]");
        const fades = gsap.utils.toArray<HTMLElement>("[data-hero-fade]");
        gsap.set(lines, { autoAlpha: 0, y: 18 });
        gsap.set(images, { autoAlpha: 0, y: 40 });
        gsap.set(fades, { autoAlpha: 0, y: 20 });
        gsap.set("[data-pill-nav]", { yPercent: 160 });
        gsap.set("[data-intro]", { visibility: "visible" });

        gsap
          .timeline({ defaults: { ease: "power2.out" } })
          .to(fades[0], { autoAlpha: 1, y: 0, duration: 0.5 })
          .to(lines, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.2 })
          .to(images, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 }, "-=0.75")
          .to(fades.slice(1), { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 }, "-=0.6")
          .to("[data-pill-nav]", { yPercent: 0, duration: 1, ease: "expo.out" }, "-=0.5");
      });

      const scrollEffects = ctx.add("scrollEffects", () => {
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.3,
                ease: "expo.out",
                stagger: 0.08,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-chars]").forEach((el) => {
          SplitText.create(el, {
            type: "chars",
            mask: "chars",
            onSplit: (self) =>
              gsap.from(self.chars, {
                yPercent: 105,
                duration: 1.2,
                ease: "expo.out",
                stagger: 0.035,
                scrollTrigger: { trigger: el, start: "top 95%", once: true },
              }),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
          gsap.from(el, {
            y: 48,
            autoAlpha: 0,
            duration: 1.3,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
          gsap.from(el.children, {
            y: 36,
            autoAlpha: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.07,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
          const speed = Number(el.dataset.speed) || 0;
          gsap.to(el, {
            yPercent: -100 * speed,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          // Cache the original text: re-runs (e.g. React strict mode) must not read a mid-animation value.
          el.dataset.countValue ??= el.textContent ?? "";
          const match = el.dataset.countValue.match(/^(\D*)(\d+)(.*)$/);
          if (!match) return;
          const [, prefix, digits, suffix] = match;
          const counter = { value: 0 };
          gsap.to(counter, {
            value: Number(digits),
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-marquee]").forEach((el) => {
          const track = el.querySelector<HTMLElement>("[data-marquee-track]");
          if (!track) return;
          el.classList.add("gsap-marquee");
          const base = el.hasAttribute("data-reverse") ? -1 : 1;
          const loop = gsap.fromTo(
            track,
            { xPercent: 0 },
            { xPercent: -50, duration: Number(el.dataset.duration) || 40, ease: "none", repeat: -1 },
          );
          // Start deep into the loop so reversing never hits the beginning.
          loop.totalTime(loop.duration() * 500);
          loop.timeScale(base);

          let paused = false;
          const pause = () => {
            paused = true;
            gsap.to(loop, { timeScale: 0, duration: 0.6, overwrite: true });
          };
          const resume = () => {
            paused = false;
            gsap.to(loop, { timeScale: base, duration: 0.6, overwrite: true });
          };
          if (el.hasAttribute("data-pausable")) {
            el.addEventListener("mouseenter", pause);
            el.addEventListener("mouseleave", resume);
            el.addEventListener("focusin", pause);
            el.addEventListener("focusout", resume);
          }

          ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              if (paused) return;
              const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 6);
              const direction = base * self.direction;
              gsap.to(loop, {
                timeScale: direction * boost,
                duration: 0.25,
                overwrite: true,
                onComplete: () => {
                  gsap.to(loop, { timeScale: direction, duration: 1.2 });
                },
              });
            },
          });

          disposers.push(() => {
            el.removeEventListener("mouseenter", pause);
            el.removeEventListener("mouseleave", resume);
            el.removeEventListener("focusin", pause);
            el.removeEventListener("focusout", resume);
            el.classList.remove("gsap-marquee");
          });
        });

        ScrollTrigger.refresh();
      });

      let active = true;
      const stopWaiting = onIntroReady(() => heroIntro());
      document.fonts.ready.then(() => active && scrollEffects());

      return () => {
        active = false;
        stopWaiting();
        disposers.forEach((fn) => fn());
      };
    });

    mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      const cleanups = gsap.utils.toArray<HTMLElement>("[data-magnetic]").map((el) => {
        const strength = Number(el.dataset.magnetic) || 0.35;
        const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * strength);
          yTo((e.clientY - (r.top + r.height / 2)) * strength);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });
      return () => cleanups.forEach((fn) => fn());
    });
  });

  return null;
}
