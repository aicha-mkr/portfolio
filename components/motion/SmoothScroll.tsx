"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** Lenis smooth scrolling synced with GSAP's ticker, plus smooth in-page anchor links. */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      // Lets sections (e.g. Featured) step through content one gesture at a time.
      virtualScroll: (data) => window.__scrollGuard?.(data) ?? true,
    });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || link.dataset.native !== undefined || e.metaKey || e.ctrlKey) return;
      const hash = link.getAttribute("href")!;
      const target = hash === "#top" ? document.body : document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(hash === "#top" ? 0 : target, { duration: 1.4 });
      history.replaceState(null, "", hash);
      // Move keyboard focus with the scroll, like a native anchor jump.
      if (hash !== "#top") {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
