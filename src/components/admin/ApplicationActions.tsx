"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ApplicationActions({
  id,
  status,
  progress,
  hasCertificate,
}: {
  id: string;
  status: string;
  progress: number;
  hasCertificate: boolean;
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState("");
  const [progressValue, setProgressValue] = useState(progress);

  async function post(url: string, body?: unknown) {
    setMessage("");
    const response = await fetch(url, {
      method: "POST",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    const json = (await response.json()) as { error?: string; certificateNumber?: string };
    if (!response.ok) {
      setMessage(json.error || "The action could not be completed.");
      return false;
    }
    router.refresh();
    return json;
  }

  async function setStatus(next: string) {
    setPending(next);
    const result = await post(`/api/admin/applications/${id}/status`, { status: next });
    if (result) {
      setMessage(
        next === "QUALIFIED"
          ? "Marked Qualified. The student email was sent."
          : next === "NOT_QUALIFIED"
            ? "Marked Not Qualified. The student email was sent."
            : "Status updated.",
      );
    }
    setPending("");
  }

  async function saveProgress() {
    setPending("progress");
    const result = await post(`/api/admin/applications/${id}/progress`, { progress: progressValue });
    if (result) setMessage("Progress saved.");
    setPending("");
  }

  async function issueCertificate() {
    setPending("certificate");
    const result = await post(`/api/admin/applications/${id}/certificate`);
    if (result && result.certificateNumber) {
      setMessage(`Certificate ${result.certificateNumber} issued and emailed.`);
    }
    setPending("");
  }

  return (
    <div className="space-y-5 border border-gold/30 bg-white p-5">
      <h2 className="font-display text-2xl text-navy">Review actions</h2>
      <div className="flex flex-wrap gap-3">
        {status === "PENDING_REVIEW" && (
          <>
            <button
              disabled={Boolean(pending)}
              onClick={() => setStatus("QUALIFIED")}
              className="bg-forest px-4 py-2 text-xs uppercase tracking-[0.16em] text-white disabled:opacity-60"
            >
              {pending === "QUALIFIED" ? "Sending…" : "Mark as Qualified"}
            </button>
            <button
              disabled={Boolean(pending)}
              onClick={() => setStatus("NOT_QUALIFIED")}
              className="bg-burgundy px-4 py-2 text-xs uppercase tracking-[0.16em] text-white disabled:opacity-60"
            >
              {pending === "NOT_QUALIFIED" ? "Sending…" : "Mark as Not Qualified"}
            </button>
          </>
        )}
        {status === "QUALIFIED" && (
          <button
            disabled={Boolean(pending)}
            onClick={() => setStatus("COMPLETED")}
            className="bg-navy px-4 py-2 text-xs uppercase tracking-[0.16em] text-white disabled:opacity-60"
          >
            {pending === "COMPLETED" ? "Updating…" : "Mark Completed"}
          </button>
        )}
        {status === "COMPLETED" && !hasCertificate && (
          <button
            disabled={Boolean(pending)}
            onClick={issueCertificate}
            className="bg-gold px-4 py-2 text-xs uppercase tracking-[0.16em] text-navy-deep disabled:opacity-60"
          >
            {pending === "certificate" ? "Issuing…" : "Issue Certificate"}
          </button>
        )}
      </div>
      {(status === "QUALIFIED" || status === "COMPLETED") && (
        <div>
          <label className="text-sm font-medium text-navy">
            Course progress (admin-driven): {progressValue}%
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={progressValue}
            onChange={(event) => setProgressValue(Number(event.target.value))}
            className="mt-2 w-full"
          />
          <button
            disabled={Boolean(pending)}
            onClick={saveProgress}
            className="mt-2 text-xs uppercase tracking-[0.16em] text-burgundy"
          >
            {pending === "progress" ? "Saving…" : "Save progress"}
          </button>
        </div>
      )}
      {message && <p className="text-sm text-forest">{message}</p>}
    </div>
  );
}
