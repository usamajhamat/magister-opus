import type { Metadata } from "next";
import { VerifyLookup } from "@/components/verify/VerifyLookup";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = { title: "Verify" };

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ number?: string }>;
}) {
  const { number } = await searchParams;
  return (
    <>
      <PageHero
        kicker="Verify"
        title="Confirm a Magister Opus certificate"
        lede="Enter a certificate number (MO-YYYY-#####). Public verification shows name, program, and date only."
      />
      <div className="mx-auto max-w-2xl px-4 py-14">
        <VerifyLookup initialNumber={number || ""} />
      </div>
    </>
  );
}
