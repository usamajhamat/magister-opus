import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { magicLinkEmail } from "@/lib/email-templates";
import { appUrl, smtpConfigured } from "@/lib/env";
import { sendMail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string };
  const email = (body.email || "").trim().toLowerCase();
  if (!email.includes("@")) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const count = await prisma.application.count({ where: { email } });
  let devLink: string | undefined;
  if (count > 0) {
    const token = randomBytes(24).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await prisma.magicLink.create({ data: { email, token, expiresAt } });
    await sendMail(email, magicLinkEmail({ email, token }));
    if (!smtpConfigured()) {
      devLink = `${appUrl()}/student/magic?token=${token}`;
    }
  }

  return NextResponse.json({ ok: true, ...(devLink ? { devLink } : {}) });
}
