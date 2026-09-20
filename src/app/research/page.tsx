import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = { title: "Research" };

const ITEMS = [
  "Conduct research",
  "Develop scholarly work",
  "Explore new ideas",
  "Present their work",
  "Participate in academic discussions",
  "Contribute knowledge to their fields",
];

export default function ResearchPage() {
  return (
    <>
      <PageHero kicker="Research & Scholarship" title="Knowledge beyond the classroom" />
      <article className="mx-auto max-w-3xl space-y-6 px-4 py-14 leading-8">
        <p>Magister Opus encourages learners to:</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <li key={item} className="border border-gold/30 bg-white px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
