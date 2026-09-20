import type { Metadata } from "next";
import { Disclaimer, PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = { title: "FAQ" };

const FAQ = [
  {
    q: "What is Magister Opus?",
    a: "Magister Opus is an online school focused on advanced learning, professional development, lifelong education, and recognition of meaningful achievement.",
  },
  {
    q: "What does Magister Opus mean?",
    a: "Magister Opus means “Master Work.”",
  },
  {
    q: "Are the programs online?",
    a: "Program delivery depends on the specific program. Each program page should clearly state its learning format. The eight recognition courses are reviewed online from submitted documents.",
  },
  {
    q: "What is a master's program?",
    a: "A master's program is an advanced program of study designed to develop deeper knowledge and expertise in a particular field. Masteral catalog pages on this site are overview-only in this release.",
  },
  {
    q: "What is an honorary doctorate?",
    a: "An honorary doctorate is a recognition given to an individual for significant achievement or contribution. It is distinct from an earned doctoral degree.",
  },
  {
    q: "Can anyone receive an honorary doctorate?",
    a: "Recipients should meet the organization's established recognition criteria and undergo the appropriate nomination and evaluation process.",
  },
  {
    q: "May I use a doctoral title after recognition?",
    a: "Any title associated with Magister Opus recognition is honorary and privately conferred. It is not a state-accredited university degree. Recipients should represent it accurately and avoid implying an earned, accredited doctorate.",
  },
  {
    q: "How do I verify a certificate?",
    a: "Open the Verify tab and enter the certificate number (MO-YYYY-#####). The public record shows name, program, and date only.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero kicker="FAQ" title="Questions we are asked most often" />
      <div className="mx-auto max-w-3xl space-y-5 px-4 py-14">
        <Disclaimer />
        {FAQ.map((item) => (
          <article key={item.q} className="border border-gold/30 bg-white p-5">
            <h2 className="font-semibold text-navy">{item.q}</h2>
            <p className="mt-2 leading-7 text-ink/80">{item.a}</p>
          </article>
        ))}
      </div>
    </>
  );
}
