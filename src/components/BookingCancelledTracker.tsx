"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function BookingCancelledTracker() {
  useEffect(() => {
    track("Booking Cancelled");
  }, []);
  return null;
}
