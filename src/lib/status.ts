export const APPLICATION_STATUSES = [
  "PENDING_REVIEW",
  "QUALIFIED",
  "NOT_QUALIFIED",
  "COMPLETED",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  PENDING_REVIEW: "Pending Review",
  QUALIFIED: "Qualified",
  NOT_QUALIFIED: "Not Qualified",
  COMPLETED: "Completed",
};

export function isApplicationStatus(value: string): value is ApplicationStatus {
  return (APPLICATION_STATUSES as readonly string[]).includes(value);
}

export function statusTone(status: string): string {
  switch (status) {
    case "QUALIFIED":
      return "bg-emerald-50 text-forest border-emerald-200";
    case "NOT_QUALIFIED":
      return "bg-rose-50 text-burgundy border-rose-200";
    case "COMPLETED":
      return "bg-gold-light/60 text-gold-dark border-gold/40";
    default:
      return "bg-amber-50 text-amber-900 border-amber-200";
  }
}
