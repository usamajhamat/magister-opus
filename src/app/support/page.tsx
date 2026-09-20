import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = { title: "Student Support" };

const ITEMS = [
  "Academic guidance",
  "Student assistance",
  "Program orientation",
  "Learning resources",
  "Online support",
  "Administrative assistance",
  "Communication channels for inquiries",
];

export default function SupportPage() {
  return (
    <>
      <PageHero kicker="Student Support" title="You are not learning alone" />
      <article className="mx-auto max-w-3xl space-y-6 px-4 py-14 leading-8">
        <p>Our learning community can provide:</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <li key={item} className="border border-gold/30 bg-white px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
        <p>
          Write to{" "}
          <a className="underline" href="mailto:info@magisteropus.site">
            info@magisteropus.site
          </a>{" "}
          for administrative assistance.
        </p>
      </article>
    </>
  );
}
