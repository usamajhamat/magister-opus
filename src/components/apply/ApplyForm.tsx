"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { COUNTRIES } from "@/lib/countries";

type CourseOption = { id: string; slug: string; title: string };

export function ApplyForm({
  courses,
  defaultCourse,
}: {
  courses: CourseOption[];
  defaultCourse?: string;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch("/api/apply", { method: "POST", body: data });
      const json = (await response.json()) as { error?: string; number?: string };
      if (!response.ok) {
        setError(json.error || "Unable to submit the application.");
        setPending(false);
        return;
      }
      router.push(`/apply/success?number=${encodeURIComponent(json.number || "")}`);
    } catch {
      setError("Unable to submit the application.");
      setPending(false);
    }
  }

  const selected =
    defaultCourse && courses.some((course) => course.slug === defaultCourse) ? defaultCourse : "";

  return (
    <form onSubmit={onSubmit} className="space-y-5 border border-gold/30 bg-white p-6 shadow-card">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="fullName" required />
        <Field label="Email Address" name="email" type="email" required />
        <Field label="Phone Number" name="phone" required />
        <label className="block text-sm">
          <span className="font-medium text-navy">Country</span>
          <select
            name="country"
            required
            defaultValue=""
            className="mt-1 w-full border border-navy/20 bg-cream px-3 py-2"
          >
            <option value="" disabled>
              Select country
            </option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm">
        <span className="font-medium text-navy">Course / Program</span>
        <select
          name="courseSlug"
          required
          defaultValue={selected}
          className="mt-1 w-full border border-navy/20 bg-cream px-3 py-2"
        >
          <option value="" disabled>
            Select a recognition course
          </option>
          {courses.map((course) => (
            <option key={course.id} value={course.slug}>
              {course.title}
            </option>
          ))}
        </select>
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-navy">Valid Government-Issued ID</span>
          <input
            type="file"
            name="idDocument"
            required
            accept=".pdf,image/*"
            className="mt-1 w-full text-sm"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-navy">Resume / CV</span>
          <input
            type="file"
            name="resume"
            required
            accept=".pdf,.doc,.docx"
            className="mt-1 w-full text-sm"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="font-medium text-navy">Additional Information (optional)</span>
        <textarea name="notes" rows={4} className="mt-1 w-full border border-navy/20 bg-cream px-3 py-2" />
      </label>
      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="truthful" value="yes" required className="mt-1" />
        <span>I confirm that the information I have provided is true and complete.</span>
      </label>
      {error && <p className="text-sm text-burgundy">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-sm bg-burgundy px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-navy">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full border border-navy/20 bg-cream px-3 py-2"
      />
    </label>
  );
}
