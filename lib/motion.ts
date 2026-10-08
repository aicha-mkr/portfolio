"use client";

import type Lenis from "lenis";
import type { VirtualScrollData } from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
    __introReady?: boolean;
    /** Optional hook to take over wheel scrolling (return false to consume the event). */
    __scrollGuard?: (data: VirtualScrollData) => boolean;
  }
}

export const INTRO_EVENT = "am:intro";

/** Runs `callback` once the preloader has finished (or immediately if there is none). */
export function onIntroReady(callback: () => void): () => void {
  if (window.__introReady) {
    callback();
    return () => {};
  }
  window.addEventListener(INTRO_EVENT, callback, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, callback);
}

export function markIntroReady() {
  window.__introReady = true;
  window.dispatchEvent(new Event(INTRO_EVENT));
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Smooth-scrolls to an element or "#id" using Lenis when available. */
export function scrollToTarget(target: string | HTMLElement) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
}
