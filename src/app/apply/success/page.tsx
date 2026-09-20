import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = { title: "Application received" };

export default async function ApplySuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ number?: string }>;
}) {
  const { number } = await searchParams;
  return (
    <>
      <PageHero kicker="Application received" title="Thank you for applying to Magister Opus" />
      <div className="mx-auto max-w-2xl space-y-5 px-4 py-14 leading-8">
        <p>
          We have successfully received your application
          {number ? (
            <>
              {" "}
              <strong>{number}</strong>
            </>
          ) : null}
          . Your submitted information and documents are now subject to review.
        </p>
        <p>
          We will contact you through your registered email address regarding the status of your application. You can
          also open the student portal with a magic link sent to that same address.
        </p>
        <div className="flex gap-4 text-sm uppercase tracking-[0.16em]">
          <Link href="/student" className="text-burgundy">
            Student portal
          </Link>
          <Link href="/programs" className="text-navy">
            Back to programs
          </Link>
        </div>
      </div>
    </>
  );
}
