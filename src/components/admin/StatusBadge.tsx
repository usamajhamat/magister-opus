import { STATUS_LABELS, statusTone, type ApplicationStatus } from "@/lib/status";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
  const label = STATUS_LABELS[status as ApplicationStatus] || status;
  return (
    <span className={cn("inline-block rounded-sm border px-2 py-1 text-[11px] uppercase tracking-[0.14em]", statusTone(status))}>
      {label}
    </span>
  );
}
