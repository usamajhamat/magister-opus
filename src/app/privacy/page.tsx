import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero kicker="Legal" title="Privacy Policy" />
      <article className="mx-auto max-w-3xl space-y-4 px-4 py-14 leading-8">
        <p>
          Magister Opus collects the information you submit on the application form, including identity documents and
          a resume, in order to review honorary recognition requests and to issue certificates.
        </p>
        <p>
          Identity documents and resumes are stored privately and are available to authorized staff. Public certificate
          verification shows only name, program, date, and certificate number.
        </p>
        <p>Questions: info@magisteropus.site.</p>
      </article>
    </>
  );
}
