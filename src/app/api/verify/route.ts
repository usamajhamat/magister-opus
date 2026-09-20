import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const number = (searchParams.get("number") || "").trim().toUpperCase();
  if (!number) {
    return NextResponse.json({ error: "Enter a certificate number." }, { status: 400 });
  }

  const certificate = await prisma.certificate.findUnique({
    where: { number },
    include: { application: { include: { course: true } } },
  });
  if (!certificate) {
    return NextResponse.json({ valid: false });
  }

  return NextResponse.json({
    valid: true,
    number: certificate.number,
    name: certificate.application.fullName,
    program: certificate.application.course.title,
    date: certificate.issuedAt,
    title: certificate.title,
  });
}
