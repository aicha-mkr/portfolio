"use client";

import { useEffect } from "react";

/**
 * Cross-fades the page to the theme of the section in the middle of the screen
 * (irinamoi.com). Sections opt in with data-theme="light" | "mud" | "dark" | "wine".
 */
export function ThemeObserver() {
  useEffect(() => {
    const html = document.documentElement;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const targets = document.querySelectorAll<HTMLElement>("body [data-theme]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          html.dataset.theme = (entry.target as HTMLElement).dataset.theme;
          if (meta) meta.content = getComputedStyle(entry.target).getPropertyValue("--bg") || meta.content;
        });
      },
      { rootMargin: "-55% 0% -44% 0%" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return null;
}
