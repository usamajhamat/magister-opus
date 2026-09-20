import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { sendMail } from "@/lib/email";
import { certificateReadyEmail } from "@/lib/email-templates";
import { writeCertificatePdf } from "@/lib/pdf";
import { prisma } from "@/lib/prisma";
import { nextCertificateNumber } from "@/lib/sequences";

export const runtime = "nodejs";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const application = await prisma.application.findUnique({
    where: { id },
    include: { course: true, certificate: true },
  });
  if (!application) {
    return NextResponse.json({ error: "Application not found." }, { status: 404 });
  }
  if (application.status !== "COMPLETED") {
    return NextResponse.json({ error: "Mark the application Completed before issuing a certificate." }, { status: 400 });
  }
  if (application.certificate) {
    return NextResponse.json({ error: "A certificate has already been issued." }, { status: 400 });
  }

  const issuedAt = new Date();
  const number = await nextCertificateNumber(issuedAt.getFullYear());
  const title = "Certificate of Completion";
  const pdfPath = `certificates/${number}.pdf`;
  await writeCertificatePdf(pdfPath, {
    studentName: application.fullName,
    programName: application.course.title,
    certificateNumber: number,
    issuedAt,
    title,
  });

  await prisma.certificate.create({
    data: {
      number,
      title,
      issuedAt,
      pdfPath,
      applicationId: application.id,
    },
  });

  await sendMail(
    application.email,
    certificateReadyEmail({
      studentName: application.fullName,
      courseName: application.course.title,
      certificateNumber: number,
    }),
  );

  return NextResponse.json({ certificateNumber: number });
}
