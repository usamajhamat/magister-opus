import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { sendMail } from "@/lib/email";
import { notQualifiedEmail, qualifiedEmail } from "@/lib/email-templates";
import { prisma } from "@/lib/prisma";
import { isApplicationStatus } from "@/lib/status";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = (await request.json()) as { status?: string };
  if (!body.status || !isApplicationStatus(body.status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const application = await prisma.application.findUnique({
    where: { id },
    include: { course: true },
  });
  if (!application) {
    return NextResponse.json({ error: "Application not found." }, { status: 404 });
  }

  if (body.status === "QUALIFIED" && application.status !== "PENDING_REVIEW") {
    return NextResponse.json({ error: "Only pending applications can be marked Qualified." }, { status: 400 });
  }
  if (body.status === "NOT_QUALIFIED" && application.status !== "PENDING_REVIEW") {
    return NextResponse.json({ error: "Only pending applications can be marked Not Qualified." }, { status: 400 });
  }
  if (body.status === "COMPLETED" && application.status !== "QUALIFIED") {
    return NextResponse.json({ error: "Only qualified applications can be marked Completed." }, { status: 400 });
  }

  const progress = body.status === "COMPLETED" ? 100 : application.progress;
  await prisma.application.update({
    where: { id },
    data: { status: body.status, progress },
  });

  if (body.status === "QUALIFIED") {
    await sendMail(
      application.email,
      qualifiedEmail({ studentName: application.fullName, courseName: application.course.title }),
    );
  }
  if (body.status === "NOT_QUALIFIED") {
    await sendMail(
      application.email,
      notQualifiedEmail({ studentName: application.fullName, courseName: application.course.title }),
    );
  }

  return NextResponse.json({ ok: true });
}
