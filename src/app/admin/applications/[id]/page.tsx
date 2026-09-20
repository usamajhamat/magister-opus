import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplicationActions } from "@/components/admin/ApplicationActions";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const application = await prisma.application.findUnique({
    where: { id },
    include: { course: true, certificate: true },
  });
  if (!application) notFound();

  return (
    <section className="mx-auto max-w-4xl space-y-6 px-4 py-12">
      <Link href="/admin" className="text-xs uppercase tracking-[0.16em] text-navy">
        Back to list
      </Link>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-4xl text-navy">{application.number}</h1>
        <StatusBadge status={application.status} />
      </div>
      <dl className="grid gap-4 border border-gold/30 bg-white p-6 sm:grid-cols-2">
        <Item label="Date applied" value={formatDateTime(application.createdAt)} />
        <Item label="Full name" value={application.fullName} />
        <Item label="Email" value={application.email} />
        <Item label="Phone" value={application.phone} />
        <Item label="Country" value={application.country} />
        <Item label="Course" value={application.course.title} />
        <Item label="Progress" value={`${application.progress}%`} />
        <Item
          label="Certificate"
          value={application.certificate?.number ?? "Not issued"}
        />
      </dl>
      {application.notes && (
        <div className="border border-gold/30 bg-white p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-gold-dark">Additional information</p>
          <p className="mt-2 leading-7">{application.notes}</p>
        </div>
      )}
      <div className="flex flex-wrap gap-4 text-sm">
        <a className="underline" href={`/api/admin/files/${application.id}/id`}>
          Download government ID
        </a>
        <a className="underline" href={`/api/admin/files/${application.id}/resume`}>
          Download resume / CV
        </a>
        {application.certificate && (
          <a className="underline" href={`/api/certificates/${application.certificate.number}`}>
            Download certificate PDF
          </a>
        )}
      </div>
      <ApplicationActions
        id={application.id}
        status={application.status}
        progress={application.progress}
        hasCertificate={Boolean(application.certificate)}
      />
    </section>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.16em] text-gold-dark">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}
