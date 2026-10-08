"use client";

import type { PointerEvent } from "react";

/** Letters that drift away from the cursor (irinamoi.com "move away" effect). Decorative. */
export function MoveAway({ text, className = "" }: { text: string; className?: string }) {
  const move = (e: PointerEvent<HTMLSpanElement>) => {
    if (e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    const dx = Math.round(((box.width / 2 - (e.clientX - box.left)) * 10) / (box.width / 2));
    const dy = Math.round(((box.height / 2 - (e.clientY - box.top)) * 10) / (box.height / 2));
    (e.currentTarget.firstChild as HTMLElement).style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const reset = (e: PointerEvent<HTMLSpanElement>) => {
    (e.currentTarget.firstChild as HTMLElement).style.transform = "";
  };

  return (
    <span aria-hidden="true" className={className}>
      {[...text].map((char, i) => (
        <span key={i} onPointerMove={move} onPointerLeave={reset} className={`inline-block ${i % 2 ? "self-start" : ""}`}>
          <span className="inline-block transition-transform duration-150 ease-linear">{char}</span>
        </span>
      ))}
    </span>
  );
}
