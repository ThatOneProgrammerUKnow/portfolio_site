/**
 * "2026-11-06" (a Sanity date) → "6 November 2026".
 * Parsed as parts, not `new Date(string)`, so the day can't shift with the visitor's time zone.
 */
export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(year, month - 1, day)),
  );
}
