"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    if (!response.ok) {
      setError("Those staff credentials were not accepted.");
      setPending(false);
      return;
    }
    router.push(params.get("next") || "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-8 max-w-md space-y-4 border border-gold/30 bg-white p-6">
      <label className="block text-sm">
        <span className="font-medium text-navy">Email</span>
        <input name="email" type="email" required className="mt-1 w-full border border-navy/20 px-3 py-2" />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-navy">Password</span>
        <input name="password" type="password" required className="mt-1 w-full border border-navy/20 px-3 py-2" />
      </label>
      {error && <p className="text-sm text-burgundy">{error}</p>}
      <button
        disabled={pending}
        className="w-full bg-navy py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <p className="ornament text-[11px] text-gold-dark">Staff</p>
      <h1 className="mt-2 font-display text-4xl text-navy">Admin dashboard</h1>
      <p className="mt-3 text-sm text-ink/70">Authorized Magister Opus staff only.</p>
      <Suspense>
        <LoginForm />
      </Suspense>
    </section>
  );
}
