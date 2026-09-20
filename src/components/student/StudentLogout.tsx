"use client";

import { useRouter } from "next/navigation";

export function StudentLogout() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/student/logout", { method: "POST" });
    router.push("/student");
    router.refresh();
  }
  return (
    <button onClick={logout} className="text-xs uppercase tracking-[0.16em] text-navy">
      Sign out
    </button>
  );
}
