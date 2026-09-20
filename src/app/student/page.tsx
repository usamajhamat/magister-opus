"use client";

import { useState } from "react";

export default function StudentLoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [devLink, setDevLink] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    const response = await fetch("/api/student/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const json = (await response.json()) as { error?: string; devLink?: string };
    if (response.ok) {
      setDevLink(json.devLink || "");
      setMessage(
        json.devLink
          ? "SMTP is not configured locally. Use the portal link below."
          : "If that email has an application, a portal link is on its way. It expires in 24 hours.",
      );
    } else {
      setMessage(json.error || "Unable to send a portal link right now.");
    }
    setPending(false);
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-16">
      <p className="ornament text-[11px] text-gold-dark">Student portal</p>
      <h1 className="mt-2 font-display text-4xl text-navy">Sign in with email</h1>
      <p className="mt-3 leading-7 text-ink/80">
        Enter the email address on your application. We will send a one-time magic link. No password is required.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 border border-gold/30 bg-white p-6">
        <label className="block text-sm">
          <span className="font-medium text-navy">Email address</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full border border-navy/20 bg-cream px-3 py-2"
          />
        </label>
        <button
          disabled={pending}
          className="bg-navy px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white"
        >
          {pending ? "Sending…" : "Send magic link"}
        </button>
        {message && <p className="text-sm text-forest">{message}</p>}
        {devLink && (
          <a href={devLink} className="block text-sm underline">
            Open student portal
          </a>
        )}
      </form>
    </section>
  );
}
