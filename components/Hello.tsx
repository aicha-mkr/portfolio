/** "H E L L O" in a zig-zag, as in the irinamoi.com header and curtain. */
export function Hello({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex h-[1.7em] items-end gap-[0.85em] font-medium uppercase leading-none ${className}`}>
      {["H", "E", "L", "L", "O"].map((letter, i) => (
        <span key={i} data-hello-letter className={i % 2 ? "self-start" : undefined}>
          {letter}
        </span>
      ))}
    </span>
  );
}
