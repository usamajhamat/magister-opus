import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = { title: "Faculty" };

export default function FacultyPage() {
  return (
    <>
      <PageHero kicker="Our Faculty" title="Meet our educators" />
      <article className="mx-auto max-w-3xl space-y-5 px-4 py-14 leading-8">
        <p>
          Faculty profiles will present photo, name, academic background, professional experience, area of expertise,
          and research interests. This section helps prospective students understand the people behind the programs.
        </p>
        <p className="text-sm text-ink/70">
          Individual educator pages are not published in this first release. Inquiries may be sent to
          info@magisteropus.site.
        </p>
      </article>
    </>
  );
}
