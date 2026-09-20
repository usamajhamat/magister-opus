"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

type Result =
  | { valid: true; number: string; name: string; program: string; date: string; title: string }
  | { valid: false }
  | null;

export function VerifyLookup({ initialNumber }: { initialNumber: string }) {
  const [number, setNumber] = useState(initialNumber);
  const [result, setResult] = useState<Result>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function lookup(value: string) {
    const query = value.trim().toUpperCase();
    if (!query) {
      setError("Enter a certificate number.");
      return;
    }
    setPending(true);
    setError("");
    setResult(null);
    const response = await fetch(`/api/verify?number=${encodeURIComponent(query)}`);
    const json = (await response.json()) as Result & { error?: string };
    if (!response.ok) {
      setError(json.error || "Unable to verify that number.");
    } else {
      setResult(json);
    }
    setPending(false);
  }

  useEffect(() => {
    if (initialNumber) {
      void lookup(initialNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialNumber]);

  return (
    <div className="space-y-6">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void lookup(number);
        }}
        className="border border-gold/30 bg-white p-6"
      >
        <label className="block text-sm">
          <span className="font-medium text-navy">Certificate number</span>
          <input
            value={number}
            onChange={(event) => setNumber(event.target.value)}
            placeholder="MO-2026-00001"
            className="mt-1 w-full border border-navy/20 bg-cream px-3 py-2 uppercase"
          />
        </label>
        <button
          disabled={pending}
          className="mt-4 bg-navy px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white"
        >
          {pending ? "Checking…" : "Verify"}
        </button>
        {error && <p className="mt-3 text-sm text-burgundy">{error}</p>}
      </form>
      {result && result.valid && (
        <div className="border border-forest/30 bg-white p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-forest">Valid certificate</p>
          <h2 className="mt-2 font-display text-3xl text-navy">{result.name}</h2>
          <p className="mt-3 leading-7">
            {result.title}
            <br />
            Program: {result.program}
            <br />
            Date: {formatDate(result.date)}
            <br />
            Certificate No.: {result.number}
          </p>
          <p className="mt-4 text-sm text-ink/70">
            This is a privately conferred honorary recognition. It is not a state-accredited university degree.
          </p>
        </div>
      )}
      {result && !result.valid && (
        <div className="border border-burgundy/30 bg-white p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-burgundy">Not found</p>
          <p className="mt-2">That certificate number is not in the Magister Opus register.</p>
        </div>
      )}
    </div>
  );
}
