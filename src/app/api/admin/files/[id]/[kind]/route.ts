import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { contentTypeFor, readUpload } from "@/lib/storage";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string; kind: string }> },
) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, kind } = await params;
  const application = await prisma.application.findUnique({ where: { id } });
  if (!application) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const relative = kind === "resume" ? application.resumePath : kind === "id" ? application.idDocumentPath : null;
  if (!relative) {
    return NextResponse.json({ error: "Unknown file kind." }, { status: 400 });
  }
  const buffer = await readUpload(relative);
  const filename = relative.split("/").pop() || "download";
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": contentTypeFor(filename),
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
