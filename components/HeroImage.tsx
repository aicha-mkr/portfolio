"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type HeroImageProps = {
  images: string[];
  /** CSS object-position for cropping, e.g. "50% 30%". */
  position?: string;
  sizes: string;
  /** Alt text for the first image; the rest are decorative. */
  alt?: string;
  /** Blur until hovered (default true). */
  blur?: boolean;
  className?: string;
};

/**
 * Blurred image block that flips through its images every 500ms (irinamoi.com):
 * on hover with a mouse, or while on screen on touch devices.
 */
export function HeroImage({ images, sizes, position, alt = "", blur = true, className = "" }: HeroImageProps) {
  const [index, setIndex] = useState(0);
  const [cycling, setCycling] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cycling || images.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % images.length), 500);
    return () => window.clearInterval(id);
  }, [cycling, images.length]);

  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches || !root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setCycling(entry.isIntersecting), {
      rootMargin: "-10% 0%",
    });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={root}
      onPointerEnter={(e) => e.pointerType === "mouse" && setCycling(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setCycling(false)}
      className={`group relative overflow-hidden ${className}`}
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          fill
          sizes={sizes}
          priority={i === 0}
          style={position ? { objectPosition: position } : undefined}
          className={`object-cover object-top ${blur ? "blur-[3px] transition-[filter] duration-500 group-hover:blur-none" : ""} ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {blur && <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink/20 transition-opacity duration-500 group-hover:opacity-0" />}
    </div>
  );
}
