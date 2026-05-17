"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ReviewActions({
  id,
  status
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function act(action: "approve" | "reject") {
    setBusy(true);
    await fetch(`/api/admin/reviews/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action })
    });
    router.refresh();
    setBusy(false);
  }

  return (
    <div className="mt-3 flex gap-2">
      {status !== "approved" && (
        <button
          type="button"
          onClick={() => act("approve")}
          disabled={busy}
          className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          Approve
        </button>
      )}
      {status !== "rejected" && (
        <button
          type="button"
          onClick={() => act("reject")}
          disabled={busy}
          className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          Reject
        </button>
      )}
    </div>
  );
}
