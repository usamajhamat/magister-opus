import type { Metadata } from "next";
import { ApplyForm } from "@/components/apply/ApplyForm";
import { Disclaimer, PageHero } from "@/components/site/PageHero";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Apply" };
export const dynamic = "force-dynamic";

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course } = await searchParams;
  const courses = await prisma.course.findMany({
    orderBy: { sortOrder: "asc" },
    select: { id: true, slug: true, title: true },
  });

  return (
    <>
      <PageHero
        kicker="Application"
        title="Apply for honorary recognition"
        lede="Complete the form below. You will receive an application number and a confirmation email."
      />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-14">
        <Disclaimer />
        {courses.length === 0 ? (
          <p className="text-burgundy">
            Recognition courses have not been seeded yet. Run <code>npm run db:setup</code>.
          </p>
        ) : (
          <ApplyForm courses={courses} defaultCourse={course} />
        )}
      </div>
    </>
  );
}
