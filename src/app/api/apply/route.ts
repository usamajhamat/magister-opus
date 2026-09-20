import { NextResponse } from "next/server";
import {
  adminNewApplicationEmail,
  applicationReceivedEmail,
} from "@/lib/email-templates";
import { adminNotifyEmail } from "@/lib/env";
import { sendMail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { saveUpload, validateUpload } from "@/lib/storage";
import { nextApplicationNumber } from "@/lib/sequences";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const fullName = String(form.get("fullName") || "").trim();
    const email = String(form.get("email") || "").trim().toLowerCase();
    const phone = String(form.get("phone") || "").trim();
    const country = String(form.get("country") || "").trim();
    const courseSlug = String(form.get("courseSlug") || "").trim();
    const notes = String(form.get("notes") || "").trim();
    const truthful = String(form.get("truthful") || "");
    const idDocument = form.get("idDocument");
    const resume = form.get("resume");

    if (!fullName || !email || !phone || !country || !courseSlug) {
      return NextResponse.json({ error: "Please complete every required field." }, { status: 400 });
    }
    if (!email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (truthful !== "yes") {
      return NextResponse.json(
        { error: "Please confirm that the information is true and complete." },
        { status: 400 },
      );
    }
    if (!(idDocument instanceof File) || !(resume instanceof File)) {
      return NextResponse.json({ error: "Both ID and resume uploads are required." }, { status: 400 });
    }
    const idError = validateUpload("id", idDocument);
    const resumeError = validateUpload("resume", resume);
    if (idError || resumeError) {
      return NextResponse.json({ error: idError || resumeError }, { status: 400 });
    }

    const course = await prisma.course.findUnique({ where: { slug: courseSlug } });
    if (!course) {
      return NextResponse.json({ error: "Please select a valid recognition course." }, { status: 400 });
    }

    const idDocumentPath = await saveUpload("id", idDocument);
    const resumePath = await saveUpload("resume", resume);
    const number = await nextApplicationNumber();

    const application = await prisma.application.create({
      data: {
        number,
        fullName,
        email,
        phone,
        country,
        notes: notes || null,
        status: "PENDING_REVIEW",
        progress: 0,
        idDocumentPath,
        resumePath,
        courseId: course.id,
      },
    });

    await sendMail(email, applicationReceivedEmail({ studentName: fullName, courseName: course.title }));
    await sendMail(
      adminNotifyEmail(),
      adminNewApplicationEmail({
        number: application.number,
        studentName: fullName,
        email,
        phone,
        country,
        courseName: course.title,
      }),
    );

    return NextResponse.json({ number: application.number });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to submit the application." }, { status: 500 });
  }
}
