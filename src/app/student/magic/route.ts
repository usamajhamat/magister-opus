import { NextResponse } from "next/server";
import { setStudentSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") || "";
  const fallback = new URL("/student", request.url);
  if (!token) {
    return NextResponse.redirect(fallback);
  }

  const link = await prisma.magicLink.findUnique({ where: { token } });
  if (!link || link.usedAt || link.expiresAt < new Date()) {
    fallback.searchParams.set("error", "expired");
    return NextResponse.redirect(fallback);
  }

  await prisma.magicLink.update({
    where: { id: link.id },
    data: { usedAt: new Date() },
  });
  await setStudentSession(link.email);
  return NextResponse.redirect(new URL("/student/dashboard", request.url));
}
