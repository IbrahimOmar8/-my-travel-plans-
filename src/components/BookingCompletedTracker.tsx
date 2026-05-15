"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function BookingCompletedTracker({
  sessionId
}: {
  sessionId: string | null;
}) {
  useEffect(() => {
    const key = `booking-tracked:${sessionId ?? "demo"}`;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    track("Booking Completed", { session: sessionId ?? "demo" });
  }, [sessionId]);

  return null;
}
