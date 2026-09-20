import type { Metadata } from "next";
import { Disclaimer, PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <>
      <PageHero kicker="Legal" title="Terms of Use" />
      <article className="mx-auto max-w-3xl space-y-4 px-4 py-14 leading-8">
        <Disclaimer />
        <p>
          Use of this website and of any certificate issued by Magister Opus is subject to accurate representation.
          Honorary recognition must not be presented as a state-accredited university degree.
        </p>
        <p>Applications must contain true and complete information.</p>
      </article>
    </>
  );
}
