import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Disclaimer, PageHero } from "@/components/site/PageHero";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  return { title: course?.title ?? "Program" };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) notFound();

  return (
    <>
      <PageHero kicker={`Recognition course 0${course.sortOrder}`} title={course.title} />
      <article className="mx-auto max-w-3xl space-y-6 px-4 py-14">
        <Disclaimer />
        <p className="text-lg leading-8">{course.description}</p>
        <p className="leading-8 text-ink/80">
          This course is a private honorary recognition of professional distinction. Format is documentary review
          rather than a conventional classroom degree. Successful recipients receive a certificate that can be verified
          on the public Verify page.
        </p>
        <Link
          href={`/apply?course=${course.slug}`}
          className="inline-block rounded-sm bg-burgundy px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
        >
          Apply Now
        </Link>
      </article>
    </>
  );
}
