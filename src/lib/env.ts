function read(name: string, fallback = ""): string {
  return process.env[name]?.trim() || fallback;
}

export function appUrl(): string {
  return read("APP_URL", "http://localhost:3000").replace(/\/$/, "");
}

export function authSecret(): string {
  const secret = read("AUTH_SECRET");
  if (!secret) {
    throw new Error("AUTH_SECRET is required.");
  }
  return secret;
}

export function adminEmail(): string {
  return read("ADMIN_EMAIL").toLowerCase();
}

export function adminPassword(): string {
  return read("ADMIN_PASSWORD");
}

export function adminNotifyEmail(): string {
  return read("ADMIN_NOTIFY_EMAIL") || adminEmail();
}

export function emailFrom(): string {
  return read("EMAIL_FROM", "admissions@magisteropus.site");
}

export function qualifiedNextSteps(): string {
  return read(
    "QUALIFIED_NEXT_STEPS",
    "Please sign in to your student portal with the email address on your application. Your program status will appear there. The admissions team will write if any further documentation is needed.",
  );
}

export function smtpConfigured(): boolean {
  return Boolean(read("EMAIL_HOST") && read("EMAIL_USER") && read("EMAIL_PASS"));
}
