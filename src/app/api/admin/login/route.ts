import { NextResponse } from "next/server";
import { setAdminSession, verifyAdminCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };
  const ok = await verifyAdminCredentials(body.email || "", body.password || "");
  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  await setAdminSession((body.email || "").trim().toLowerCase());
  return NextResponse.json({ ok: true });
}
