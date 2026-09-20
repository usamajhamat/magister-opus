import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer, PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = { title: "Admissions" };

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        kicker="Admissions"
        title="Submit your application and required documents"
        lede="Recognition applications are reviewed by Magister Opus staff. Qualified applicants receive next-step instructions by email."
      />
      <article className="mx-auto max-w-3xl space-y-6 px-4 py-14 leading-8">
        <Disclaimer />
        <p>Required information:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Country</li>
          <li>Valid Government-Issued ID (file upload)</li>
          <li>Resume/CV (file upload)</li>
          <li>Course/Program (one of the eight recognition courses)</li>
          <li>Additional Information (optional)</li>
        </ul>
        <p>You must confirm that the information you provide is true and complete.</p>
        <p>
          After you submit, you receive an application number in the form MO-00001 and a confirmation email. Status
          begins at Pending Review.
        </p>
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
