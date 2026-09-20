import { appUrl, qualifiedNextSteps } from "@/lib/env";

function wrap(body: string): string {
  const escaped = body
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const htmlBody = escaped.replace(/\n/g, "<br />");
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:32px;background:#F6F0E4;font-family:Georgia,serif;color:#122033;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#FBF7EF;border:1px solid #E8D5A3;">
      <tr>
        <td style="padding:28px 32px 8px;border-bottom:2px solid #B8954A;">
          <div style="letter-spacing:0.28em;font-size:12px;color:#B8954A;">MAGISTER OPUS</div>
          <div style="font-size:13px;color:#1B3654;margin-top:6px;">Master Work. Master Knowledge. Make an Impact.</div>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 32px 36px;font-size:16px;line-height:1.7;">${htmlBody}</td>
      </tr>
    </table>
  </body>
</html>`;
}

export type MailContent = {
  subject: string;
  text: string;
  html: string;
};

function mail(subject: string, text: string): MailContent {
  return { subject, text, html: wrap(text) };
}

export function applicationReceivedEmail(input: {
  studentName: string;
  courseName: string;
}): MailContent {
  const text = `Dear ${input.studentName},

Thank you for applying to Magister Opus.

We have successfully received your application for:

Program: ${input.courseName}

Your submitted information and documents have been received and are now subject to review.

We will contact you through your registered email address regarding the status of your application.

Thank you for choosing Magister Opus.

Magister Opus Admissions Team`;
  return mail("Magister Opus — Application Received", text);
}

export function adminNewApplicationEmail(input: {
  number: string;
  studentName: string;
  email: string;
  phone: string;
  country: string;
  courseName: string;
}): MailContent {
  const text = `A new Magister Opus application has been submitted.

Application No.: ${input.number}
Full Name: ${input.studentName}
Email: ${input.email}
Phone: ${input.phone}
Country: ${input.country}
Program: ${input.courseName}

Review it in the admin dashboard:
${appUrl()}/admin`;
  return mail(`Magister Opus — New Application ${input.number}`, text);
}

export function qualifiedEmail(input: {
  studentName: string;
  courseName: string;
}): MailContent {
  const text = `Dear ${input.studentName},

We are pleased to inform you that your application for ${input.courseName} has been reviewed and you have been qualified for the program.

Your next steps are:
${qualifiedNextSteps()}

Welcome to Magister Opus.

Master Work. Master Knowledge. Make an Impact.`;
  return mail("Magister Opus — You Are Qualified", text);
}

export function notQualifiedEmail(input: {
  studentName: string;
  courseName: string;
}): MailContent {
  const text = `Dear ${input.studentName},

Thank you for applying to Magister Opus and for the care you took with your application for ${input.courseName}.

After careful review of the information and documents you submitted, we are unable to qualify your application at this time.

We appreciate your interest in Magister Opus and wish you continued success in your professional and scholarly work.

Magister Opus Admissions Team
Master Work. Master Knowledge. Make an Impact.`;
  return mail("Magister Opus — Application Update", text);
}

export function certificateReadyEmail(input: {
  studentName: string;
  courseName: string;
  certificateNumber: string;
}): MailContent {
  const viewUrl = `${appUrl()}/student`;
  const verifyUrl = `${appUrl()}/verify?number=${encodeURIComponent(input.certificateNumber)}`;
  const text = `Dear ${input.studentName},

Congratulations!

You have successfully completed ${input.courseName}.

Your certificate is now available through your Magister Opus account.

[VIEW / DOWNLOAD CERTIFICATE]
${viewUrl}

Certificate No.: ${input.certificateNumber}
Public verification: ${verifyUrl}

Congratulations on your achievement.

Magister Opus
Master Work. Master Knowledge. Make an Impact.`;
  return mail("Magister Opus — Your Certificate Is Ready", text);
}

export function magicLinkEmail(input: { email: string; token: string }): MailContent {
  const url = `${appUrl()}/student/magic?token=${encodeURIComponent(input.token)}`;
  const text = `Dear applicant,

Use this private link to open your Magister Opus student portal. It expires in 24 hours and can be used once.

${url}

If you did not request this link, you may ignore this message.

Magister Opus Admissions Team`;
  return mail("Magister Opus — Your student portal link", text);
}
