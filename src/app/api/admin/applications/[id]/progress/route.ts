import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = (await request.json()) as { progress?: number };
  const progress = Number(body.progress);
  if (!Number.isFinite(progress) || progress < 0 || progress > 100) {
    return NextResponse.json({ error: "Progress must be between 0 and 100." }, { status: 400 });
  }
  await prisma.application.update({
    where: { id },
    data: { progress: Math.round(progress) },
  });
  return NextResponse.json({ ok: true });
}
