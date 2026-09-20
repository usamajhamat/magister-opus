import nodemailer from "nodemailer";
import { emailFrom, smtpConfigured } from "@/lib/env";
import type { MailContent } from "@/lib/email-templates";

function transporter() {
  const port = Number(process.env.EMAIL_PORT || 465);
  const secure =
    process.env.EMAIL_SECURE === "true" ||
    process.env.EMAIL_SECURE === "1" ||
    port === 465;
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port,
    secure,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export async function sendMail(to: string, content: MailContent): Promise<void> {
  if (!to) return;
  if (!smtpConfigured()) {
    console.info("[email:dev]", {
      to,
      subject: content.subject,
      text: content.text,
    });
    return;
  }
  await transporter().sendMail({
    from: emailFrom(),
    to,
    subject: content.subject,
    text: content.text,
    html: content.html,
  });
}
