import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero kicker="Contact Magister Opus" title="Begin your next chapter" />
      <article className="mx-auto max-w-2xl space-y-6 px-4 py-14 text-center leading-8">
        <p className="font-display text-3xl text-navy">Magister Opus</p>
        <p>Master Work. Master Knowledge. Make an Impact.</p>
        <p>
          Email:{" "}
          <a className="underline" href="mailto:info@magisteropus.site">
            info@magisteropus.site
          </a>
        </p>
        <p>Website: www.magisteropus.site</p>
        <Link
          href="/apply"
          className="inline-block rounded-sm bg-burgundy px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
        >
          Apply Now
        </Link>
      </article>
    </>
  );
}
