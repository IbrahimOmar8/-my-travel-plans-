declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, string | number | boolean> }
    ) => void;
  }
}

export type ConversionEvent =
  | "Inquiry Submitted"
  | "Booking Started"
  | "Booking Completed"
  | "Booking Cancelled"
  | "Tour Viewed"
  | "Destination Viewed";

export function track(
  event: ConversionEvent,
  props?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(event, props ? { props } : undefined);
  } catch {
    // Analytics failures must never break a flow.
  }
}
