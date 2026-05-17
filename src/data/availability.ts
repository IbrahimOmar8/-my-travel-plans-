/**
 * Static seed of departure dates per tour. In production this would live
 * in a CMS or an availability service. Format: ISO date (YYYY-MM-DD)
 * with the count of remaining seats per departure.
 */

type Availability = { date: string; seatsLeft: number };

function nextMonths(months: number, anchorDay: number): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let m = 0; m < months; m++) {
    const d = new Date(now.getFullYear(), now.getMonth() + m, anchorDay);
    if (d > now) out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

function pattern(
  months: number,
  daysOfMonth: number[],
  seats: number
): Availability[] {
  const result: Availability[] = [];
  for (const day of daysOfMonth) {
    for (const date of nextMonths(months, day)) {
      result.push({ date, seatsLeft: seats });
    }
  }
  return result.sort((a, b) => (a.date < b.date ? -1 : 1));
}

const availability: Record<string, Availability[]> = {
  "classic-egypt-8-days": pattern(8, [5, 12, 19, 26], 8),
  "nile-cruise-5-days": pattern(8, [3, 10, 17, 24], 6),
  "red-sea-7-days": pattern(8, [7, 21], 10),
  "egypt-family-10-days": pattern(8, [1, 15], 6),
  "egypt-jordan-12-days": pattern(8, [4, 18], 8),
  "white-desert-4-days": pattern(8, [6, 13, 20, 27], 4)
};

export function getAvailability(tourSlug: string): Availability[] {
  return availability[tourSlug] ?? [];
}

export function nextDeparture(tourSlug: string): Availability | null {
  const list = availability[tourSlug];
  if (!list || list.length === 0) return null;
  return list[0];
}
