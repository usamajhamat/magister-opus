import { randomBytes } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { safeFileName } from "@/lib/utils";

const UPLOAD_ROOT = path.join(process.cwd(), "uploads");

const KIND_DIRS = {
  id: "ids",
  resume: "resumes",
  certificate: "certificates",
} as const;

export type UploadKind = keyof typeof KIND_DIRS;

const ID_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
]);

const RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const MAX_BYTES = 8 * 1024 * 1024;

export function validateUpload(kind: "id" | "resume", file: File): string | null {
  if (!file || file.size === 0) {
    return kind === "id" ? "Government-issued ID is required." : "Resume/CV is required.";
  }
  if (file.size > MAX_BYTES) {
    return "Each file must be 8 MB or smaller.";
  }
  const allowed = kind === "id" ? ID_TYPES : RESUME_TYPES;
  if (file.type && !allowed.has(file.type)) {
    return kind === "id"
      ? "ID must be a PDF or image file."
      : "Resume/CV must be a PDF or Word document.";
  }
  return null;
}

export async function saveUpload(kind: UploadKind, file: File): Promise<string> {
  const dir = path.join(UPLOAD_ROOT, KIND_DIRS[kind]);
  await mkdir(dir, { recursive: true });
  const ext = path.extname(file.name || "").toLowerCase() || (kind === "certificate" ? ".pdf" : "");
  const filename = `${Date.now()}-${randomBytes(6).toString("hex")}-${safeFileName(path.basename(file.name || "file", ext))}${ext}`;
  const full = path.join(dir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(full, buffer);
  return path.join(KIND_DIRS[kind], filename);
}

export async function saveBuffer(kind: UploadKind, filename: string, data: Buffer): Promise<string> {
  const dir = path.join(UPLOAD_ROOT, KIND_DIRS[kind]);
  await mkdir(dir, { recursive: true });
  const stored = `${safeFileName(filename)}`;
  await writeFile(path.join(dir, stored), data);
  return path.join(KIND_DIRS[kind], stored);
}

export function resolveUpload(relativePath: string): string {
  const normalized = path.normalize(relativePath).replace(/^(\.\.(\/|\\|$))+/, "");
  return path.join(UPLOAD_ROOT, normalized);
}

export async function readUpload(relativePath: string): Promise<Buffer> {
  return readFile(resolveUpload(relativePath));
}

export function contentTypeFor(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case ".pdf":
      return "application/pdf";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".doc":
      return "application/msword";
    case ".docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    default:
      return "application/octet-stream";
  }
}
