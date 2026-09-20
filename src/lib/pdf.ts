import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import path from "path";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { appUrl } from "@/lib/env";
import { formatDate } from "@/lib/utils";

export type CertificatePdfInput = {
  studentName: string;
  programName: string;
  certificateNumber: string;
  issuedAt: Date;
  title?: string;
};

function drawDoubleBorder(doc: PDFKit.PDFDocument, inset: number, color: string, width: number) {
  doc.save();
  doc.lineWidth(width).strokeColor(color);
  doc.rect(inset, inset, doc.page.width - inset * 2, doc.page.height - inset * 2).stroke();
  doc.restore();
}

export async function writeCertificatePdf(
  relativePath: string,
  input: CertificatePdfInput,
): Promise<string> {
  const fullPath = path.join(process.cwd(), "uploads", relativePath);
  await mkdir(path.dirname(fullPath), { recursive: true });

  const verifyUrl = `${appUrl()}/verify?number=${encodeURIComponent(input.certificateNumber)}`;
  const qrPng = await QRCode.toBuffer(verifyUrl, {
    type: "png",
    margin: 1,
    width: 220,
    color: { dark: "#122033", light: "#FBF7EF" },
  });

  const title = input.title ?? "Certificate of Completion";
  const dateLabel = formatDate(input.issuedAt);

  await new Promise<void>((resolve, reject) => {
    const doc = new PDFDocument({
      size: "LETTER",
      layout: "landscape",
      margin: 0,
      info: {
        Title: `${title} — ${input.studentName}`,
        Author: "Magister Opus",
        Subject: "Honorary recognition certificate",
      },
    });
    const stream = createWriteStream(fullPath);
    doc.pipe(stream);
    stream.on("finish", () => resolve());
    stream.on("error", reject);
    doc.on("error", reject);

    const w = doc.page.width;
    const h = doc.page.height;

    doc.rect(0, 0, w, h).fill("#FBF7EF");
    doc.rect(0, 0, w, 18).fill("#1B3654");
    doc.rect(0, h - 18, w, 18).fill("#1B3654");

    drawDoubleBorder(doc, 28, "#B8954A", 2.2);
    drawDoubleBorder(doc, 36, "#1B3654", 0.8);

    doc.fillColor("#B8954A").font("Times-Bold").fontSize(11);
    doc.text("MAGISTER OPUS", 60, 56, { align: "center", width: w - 120, characterSpacing: 4 });

    doc.fillColor("#1B3654").font("Times-Roman").fontSize(10);
    doc.text("MASTER WORK. MASTER KNOWLEDGE. MAKE AN IMPACT.", 60, 76, {
      align: "center",
      width: w - 120,
    });

    doc.moveTo(220, 98).lineTo(w - 220, 98).lineWidth(0.8).strokeColor("#B8954A").stroke();

    doc.fillColor("#6E2F3C").font("Times-Bold").fontSize(28);
    doc.text(title.toUpperCase(), 70, 118, { align: "center", width: w - 140 });

    doc.fillColor("#122033").font("Times-Italic").fontSize(13);
    doc.text("This certificate is presented to", 70, 168, { align: "center", width: w - 140 });

    doc.fillColor("#1B3654").font("Times-Bold").fontSize(30);
    doc.text(input.studentName, 70, 194, { align: "center", width: w - 140 });

    doc.fillColor("#122033").font("Times-Italic").fontSize(13);
    doc.text("for successfully completing", 70, 242, { align: "center", width: w - 140 });

    doc.fillColor("#1B3654").font("Times-Bold").fontSize(18);
    doc.text(input.programName, 80, 266, { align: "center", width: w - 160 });

    doc.font("Times-Roman").fontSize(11).fillColor("#122033");
    doc.text(
      "This is a privately conferred honorary recognition of professional distinction. It is not a state-accredited university degree and is not presented as completion of a conventional doctoral program.",
      110,
      310,
      { align: "center", width: w - 220 },
    );

    const footerY = 372;
    doc.font("Times-Bold").fontSize(11).fillColor("#1B3654");
    doc.text(`Certificate No.: ${input.certificateNumber}`, 70, footerY, {
      width: 260,
    });
    doc.font("Times-Roman").text(`Date: ${dateLabel}`, 70, footerY + 18, { width: 260 });

    doc.image(qrPng, w / 2 - 36, footerY - 8, { width: 72, height: 72 });
    doc.fontSize(8).fillColor("#6E2F3C").text("Verify", w / 2 - 40, footerY + 66, {
      width: 80,
      align: "center",
    });

    const sigX = w - 300;
    doc.moveTo(sigX, footerY + 28).lineTo(sigX + 210, footerY + 28).strokeColor("#1B3654").stroke();
    doc.font("Times-Italic").fontSize(10).fillColor("#122033");
    doc.text("Authorized signature", sigX, footerY + 34, { width: 210, align: "center" });
    doc.font("Times-Roman").fontSize(9).text("Magister Opus Admissions", sigX, footerY + 48, {
      width: 210,
      align: "center",
    });

    doc.save();
    doc.circle(w - 92, 78, 26).lineWidth(1.6).strokeColor("#B8954A").stroke();
    doc.circle(w - 92, 78, 20).lineWidth(0.8).stroke();
    doc.font("Times-Bold").fontSize(7).fillColor("#1B3654");
    doc.text("SEAL", w - 116, 74, { width: 48, align: "center" });
    doc.restore();

    doc.end();
  });

  return relativePath;
}
