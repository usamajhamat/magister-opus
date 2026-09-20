import { NextResponse } from "next/server";
import { getAdminSession, getStudentSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { contentTypeFor, readUpload } from "@/lib/storage";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ number: string }> },
) {
  const { number } = await params;
  const certificate = await prisma.certificate.findUnique({
    where: { number },
    include: { application: true },
  });
  if (!certificate) {
    return NextResponse.json({ error: "Certificate not found." }, { status: 404 });
  }

  const admin = await getAdminSession();
  const student = await getStudentSession();
  const allowed =
    Boolean(admin) || (student && student.email === certificate.application.email.toLowerCase());
  if (!allowed) {
    return NextResponse.json({ error: "Sign in to download this certificate." }, { status: 401 });
  }

  const buffer = await readUpload(certificate.pdfPath);
  const filename = `${certificate.number}.pdf`;
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": contentTypeFor(filename),
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
