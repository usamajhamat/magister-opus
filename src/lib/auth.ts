import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { adminEmail, adminPassword, authSecret } from "@/lib/env";

const ADMIN_COOKIE = "mo_admin";
const STUDENT_COOKIE = "mo_student";
const WEEK = 60 * 60 * 24 * 7;

type AdminClaims = { role: "admin"; email: string };
type StudentClaims = { role: "student"; email: string };

function secretKey() {
  return new TextEncoder().encode(authSecret());
}

async function sign(payload: AdminClaims | StudentClaims, days = 7): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${days}d`)
    .sign(secretKey());
}

async function readToken<T>(name: string): Promise<T | null> {
  const jar = await cookies();
  const token = jar.get(name)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload as T;
  } catch {
    return null;
  }
}

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  return email.trim().toLowerCase() === adminEmail() && password === adminPassword() && Boolean(adminEmail() && adminPassword());
}

export async function setAdminSession(email: string) {
  const token = await sign({ role: "admin", email });
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: WEEK,
  });
}

export async function setStudentSession(email: string) {
  const token = await sign({ role: "student", email: email.trim().toLowerCase() });
  const jar = await cookies();
  jar.set(STUDENT_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: WEEK,
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
}

export async function clearStudentSession() {
  const jar = await cookies();
  jar.delete(STUDENT_COOKIE);
}

export async function getAdminSession(): Promise<AdminClaims | null> {
  const claims = await readToken<AdminClaims>(ADMIN_COOKIE);
  if (!claims || claims.role !== "admin") return null;
  return claims;
}

export async function getStudentSession(): Promise<StudentClaims | null> {
  const claims = await readToken<StudentClaims>(STUDENT_COOKIE);
  if (!claims || claims.role !== "student" || !claims.email) return null;
  return claims;
}

export async function requireAdmin(): Promise<AdminClaims> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("UNAUTHORIZED_ADMIN");
  }
  return session;
}
