import { Fragment } from "react";

/** Renders a headline line where *wrapped* words use the italic serif. */
export function Mixed({ line }: { line: string }) {
  return line.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <span key={i} className="serif">
        {part.slice(1, -1)}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Plain text version of a mixed line, for aria labels and metadata. */
export function plain(line: string) {
  return line.replace(/\*/g, "");
}

/** Text whose letters jump one after another on hover. */
export function JumpText({ text }: { text: string }) {
  return (
    <span data-jump>
      <span className="sr-only">{text}</span>
      {[...text].map((char, i) => (
        <span key={i} aria-hidden="true" style={{ "--i": i } as React.CSSProperties}>
          {char}
        </span>
      ))}
    </span>
  );
}

/** Small label above a section heading. */
export function Eyebrow({ label }: { label: string }) {
  return <p className="text-label text-fg-muted">{label}</p>;
}
