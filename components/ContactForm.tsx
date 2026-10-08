"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "./Icons";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "error"; message: string; fallback?: string };

const fieldClass =
  "peer mt-1 block w-full border-0 border-b border-fg/30 bg-transparent px-0 py-3 text-xl text-fg placeholder:text-fg/40 transition-colors focus:border-sun focus:outline-none focus:ring-0";

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  /**
   * Fallback delivery when the server has no Resend key: FormSubmit relays the message to
   * the inbox (free, no key). The very first message triggers a one-time activation email.
   */
  async function sendViaFormSubmit(data: Record<string, string>) {
    const res = await fetch(`https://formsubmit.co/ajax/${email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
        _subject: `Portfolio message from ${data.name}`,
        _template: "table",
        _captcha: "false",
        _honey: data.company ?? "",
      }),
    });
    const body = (await res.json().catch(() => ({}))) as { success?: string | boolean };
    return res.ok && String(body.success) === "true";
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus({ state: "sending" });

    const fail = () =>
      setStatus({
        state: "error",
        message: "Sorry, your message couldn't be sent.",
        fallback: `mailto:${email}?subject=${encodeURIComponent(
          `Portfolio enquiry from ${data.name ?? ""}`,
        )}&body=${encodeURIComponent(data.message ?? "")}`,
      });

    try {
      // The server validates the fields and sends with Resend when it's configured.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string; code?: string };

      let sent = res.ok;
      if (!sent && body.code === "not_configured") sent = await sendViaFormSubmit(data);

      if (sent) {
        form.reset();
        setStatus({ state: "sent" });
      } else if (res.status === 422 && body.error) {
        setStatus({ state: "error", message: body.error });
      } else {
        fail();
      }
    } catch {
      fail();
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-label text-fg-muted">
            Your name
          </label>
          <input id="name" name="name" type="text" required maxLength={100} autoComplete="name" placeholder="Jane Doe" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className="text-label text-fg-muted">
            Email
          </label>
          <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" placeholder="jane@company.com" className={fieldClass} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="text-label text-fg-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={4}
          placeholder="Tell me about your project or role…"
          className={`${fieldClass} resize-none`}
        />
      </div>

      {/* Honeypot: hidden from people, often filled in by bots. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          data-magnetic
          disabled={status.state === "sending"}
          className="text-label group inline-flex items-center gap-3 rounded-full bg-sun px-8 py-5 font-semibold text-ink transition-colors hover:bg-burgundy hover:text-bone disabled:opacity-60"
        >
          {status.state === "sending" ? "Sending…" : "Send message"}
          <ArrowUpRight className="text-base transition-transform duration-500 group-hover:rotate-45" />
        </button>

        <p role="status" aria-live="polite" className="text-sm">
          {status.state === "sent" && <span className="text-sun">Thanks! Your message has been sent.</span>}
          {status.state === "error" && (
            <span>
              {status.message}{" "}
              {status.fallback && (
                <a href={status.fallback} className="font-semibold underline underline-offset-4 transition-colors hover:text-link">
                  Email me at {email}
                </a>
              )}
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
