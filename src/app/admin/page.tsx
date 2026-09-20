import Link from "next/link";
import { AdminLogout } from "@/components/admin/AdminLogout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const applications = await prisma.application.findMany({
    where: status ? { status } : undefined,
    include: { course: true, certificate: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="ornament text-[11px] text-gold-dark">Staff</p>
          <h1 className="mt-2 font-display text-4xl text-navy">Applications</h1>
        </div>
        <AdminLogout />
      </div>
      <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em]">
        {[
          ["", "All"],
          ["PENDING_REVIEW", "Pending Review"],
          ["QUALIFIED", "Qualified"],
          ["NOT_QUALIFIED", "Not Qualified"],
          ["COMPLETED", "Completed"],
        ].map(([value, label]) => (
          <Link
            key={label}
            href={value ? `/admin?status=${value}` : "/admin"}
            className={`border px-3 py-1 ${status === value || (!status && !value) ? "border-navy bg-navy text-white" : "border-gold/40"}`}
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="mt-6 overflow-x-auto border border-gold/30 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-parchment text-xs uppercase tracking-[0.12em] text-navy">
            <tr>
              <th className="px-3 py-3">Application No.</th>
              <th className="px-3 py-3">Date</th>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Phone</th>
              <th className="px-3 py-3">Country</th>
              <th className="px-3 py-3">Course</th>
              <th className="px-3 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 && (
              <tr>
                <td className="px-3 py-8 text-center text-ink/60" colSpan={8}>
                  No applications yet.
                </td>
              </tr>
            )}
            {applications.map((application) => (
              <tr key={application.id} className="border-t border-gold/20">
                <td className="px-3 py-3">
                  <Link href={`/admin/applications/${application.id}`} className="font-semibold text-burgundy">
                    {application.number}
                  </Link>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">{formatDateTime(application.createdAt)}</td>
                <td className="px-3 py-3">{application.fullName}</td>
                <td className="px-3 py-3">{application.email}</td>
                <td className="px-3 py-3">{application.phone}</td>
                <td className="px-3 py-3">{application.country}</td>
                <td className="px-3 py-3">{application.course.title}</td>
                <td className="px-3 py-3">
                  <StatusBadge status={application.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
