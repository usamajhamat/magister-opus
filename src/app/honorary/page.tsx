import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer, PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = { title: "Honorary Recognition" };

const REASONS = [
  "Professional achievement",
  "Academic contribution",
  "Research and scholarship",
  "Community leadership",
  "Humanitarian service",
  "Innovation",
  "Arts and culture",
  "Entrepreneurship",
  "Public or professional service",
  "Significant contribution to a field",
];

const STEPS = [
  { n: "01", t: "Nomination", d: "A candidate is nominated or submits the required information." },
  { n: "02", t: "Documentation", d: "Achievements and professional contributions are documented." },
  { n: "03", t: "Evaluation", d: "The candidate is reviewed according to established criteria." },
  { n: "04", t: "Recognition decision", d: "The appropriate committee or authority evaluates the nomination." },
  { n: "05", t: "Conferment", d: "Approved recipients receive their formal recognition." },
];

export default function HonoraryPage() {
  return (
    <>
      <PageHero
        kicker="Honorary Doctorate"
        title="Recognizing meaningful achievement"
        lede="An honorary doctorate is a distinction presented in recognition of significant achievement, contribution, leadership, scholarship, service, innovation, or impact."
      />
      <article className="mx-auto max-w-3xl space-y-8 px-4 py-14">
        <Disclaimer />
        <p className="leading-8">
          It is different from an earned doctoral degree and is not presented as completion of a conventional doctoral
          program. Recipients should treat any title usage as honorary and privately conferred.
        </p>
        <h2 className="font-display text-3xl text-navy">Candidates may be recognized for</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {REASONS.map((item) => (
            <li key={item} className="border border-gold/30 bg-white px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
        <h2 className="font-display text-3xl text-navy">Recognition process</h2>
        <ol className="space-y-4">
          {STEPS.map((step) => (
            <li key={step.n} className="border-l-2 border-gold pl-4">
              <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">
                {step.n} {step.t}
              </p>
              <p className="mt-1 leading-7">{step.d}</p>
            </li>
          ))}
        </ol>
        <Link
          href="/apply"
          className="inline-block rounded-sm bg-burgundy px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
        >
          Nominate a candidate
        </Link>
      </article>
    </>
  );
}
