import { redirect } from "next/navigation";
import { StudentLogout } from "@/components/student/StudentLogout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getStudentSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function StudentDashboardPage() {
  const session = await getStudentSession();
  if (!session) redirect("/student");

  const applications = await prisma.application.findMany({
    where: { email: session.email },
    include: { course: true, certificate: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="mx-auto max-w-4xl space-y-8 px-4 py-12">
      <div className="flex items-end justify-between">
        <div>
          <p className="ornament text-[11px] text-gold-dark">Student portal</p>
          <h1 className="mt-2 font-display text-4xl text-navy">Your Magister Opus record</h1>
          <p className="mt-2 text-sm text-ink/70">{session.email}</p>
        </div>
        <StudentLogout />
      </div>
      {applications.length === 0 && <p>No applications are linked to this email yet.</p>}
      {applications.map((application) => (
        <article key={application.id} className="space-y-5 border border-gold/30 bg-white p-6">
          <section>
            <h2 className="text-xs uppercase tracking-[0.2em] text-gold-dark">My Application</h2>
            <p className="mt-2 font-display text-2xl text-navy">{application.number}</p>
            <p className="mt-1">Program: {application.course.title}</p>
            <div className="mt-2">
              <StatusBadge status={application.status} />
            </div>
          </section>
          <section>
            <h2 className="text-xs uppercase tracking-[0.2em] text-gold-dark">My Course</h2>
            <p className="mt-2">Status: {application.status.replaceAll("_", " ")}</p>
            <div className="mt-3 h-3 overflow-hidden bg-parchment">
              <div className="h-full bg-gold" style={{ width: `${application.progress}%` }} />
            </div>
            <p className="mt-2 text-sm">Progress: {application.progress}%</p>
          </section>
          <section>
            <h2 className="text-xs uppercase tracking-[0.2em] text-gold-dark">My Certificate</h2>
            {application.certificate ? (
              <div className="mt-2 space-y-2">
                <p>Certificate No.: {application.certificate.number}</p>
                <div className="flex gap-4 text-sm">
                  <a className="underline" href={`/api/certificates/${application.certificate.number}`}>
                    View / Download certificate
                  </a>
                  <a className="underline" href={`/verify?number=${application.certificate.number}`}>
                    Public verify
                  </a>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-sm text-ink/70">A certificate will appear here after it is issued.</p>
            )}
          </section>
        </article>
      ))}
    </section>
  );
}
