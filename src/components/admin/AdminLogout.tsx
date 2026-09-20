"use client";

import { useRouter } from "next/navigation";

export function AdminLogout() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button onClick={logout} className="text-xs uppercase tracking-[0.16em] text-navy">
      Sign out
    </button>
  );
}
