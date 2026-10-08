/** Rotated amber band of scrolling keywords. */
export function Marquee({ words }: { words: string[] }) {
  const copy = (clone?: boolean) => (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={clone || undefined}
      data-marquee-clone={clone || undefined}
    >
      {words.map((word) => (
        <li key={word} className="flex items-center gap-[0.6em] pr-[0.6em] text-title font-medium uppercase">
          {word}
          <span aria-hidden="true" className="size-[0.22em] rounded-full bg-wine" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative z-10 overflow-x-clip py-6" role="region" aria-label="What I do">
      <div className="-mx-4 -rotate-2 bg-sun py-4 text-ink md:py-5">
        <div data-marquee data-duration="38" className="overflow-hidden">
          <div data-marquee-track style={{ "--marquee-duration": "38s" } as React.CSSProperties}>
            {copy()}
            {copy(true)}
          </div>
        </div>
      </div>
    </div>
  );
}
