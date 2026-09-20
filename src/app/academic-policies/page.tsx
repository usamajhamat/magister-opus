import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = { title: "Academic Policies" };

const ITEMS = [
  "Original academic work",
  "Proper citation",
  "Research ethics",
  "Honest assessment",
  "Respect for intellectual property",
  "Responsible use of technology",
  "Professional conduct",
];

export default function PoliciesPage() {
  return (
    <>
      <PageHero kicker="Academic Integrity" title="Learning with integrity" />
      <article className="mx-auto max-w-3xl space-y-6 px-4 py-14 leading-8">
        <p>We promote:</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <li key={item} className="border border-gold/30 bg-white px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
        <p>Academic achievement means more when it is pursued with integrity.</p>
      </article>
    </>
  );
}
