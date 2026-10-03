import type { Period, YearMonth } from '@/types/content';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

interface ParsedMonth {
  year: number;
  /** 1–12 */
  month: number;
}

export function parseYearMonth(value: YearMonth): ParsedMonth {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  const year = Number(match?.[1]);
  const month = Number(match?.[2]);
  if (!match || month < 1 || month > 12) {
    throw new RangeError(`Invalid YearMonth: "${value}"`);
  }
  return { year, month };
}

export function toYearMonth(date: Date): YearMonth {
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${date.getUTCFullYear()}-${month}` as YearMonth;
}

/**
 * Number of calendar months covered by a period, counting both ends
 * (LinkedIn convention: Apr 2024 → Apr 2024 is 1 month).
 */
export function monthsInPeriod(period: Period, now: Date = new Date()): number {
  const start = parseYearMonth(period.start);
  const end = parseYearMonth(period.end ?? toYearMonth(now));
  const months = (end.year - start.year) * 12 + (end.month - start.month) + 1;
  if (months < 1) {
    throw new RangeError(`Period ends before it starts: ${period.start} → ${period.end}`);
  }
  return months;
}

/** "2 yrs 7 mos", "1 yr", "8 mos". */
export function formatDuration(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'mo' : 'mos'}`);
  return parts.join(' ');
}

/** "Apr 2024" */
export function formatYearMonth(value: YearMonth): string {
  const { year, month } = parseYearMonth(value);
  return `${MONTHS[month - 1]} ${year}`;
}

/** "Apr 2024 – Present", "Aug 2021 – Dec 2023". */
export function formatPeriod(period: Period): string {
  const end = period.end ? formatYearMonth(period.end) : 'Present';
  return `${formatYearMonth(period.start)} – ${end}`;
}

/** "2008 – 2013"; collapses to a single year when start and end match. */
export function formatYearSpan(period: Period): string {
  const start = parseYearMonth(period.start).year;
  if (!period.end) return `${start} – Present`;
  const end = parseYearMonth(period.end).year;
  return start === end ? `${start}` : `${start} – ${end}`;
}

export function isOngoing(period: Period, now: Date = new Date()): boolean {
  if (!period.end) return true;
  const end = parseYearMonth(period.end);
  const current = parseYearMonth(toYearMonth(now));
  return end.year > current.year || (end.year === current.year && end.month >= current.month);
}

/** Whole years elapsed since `start`. */
export function yearsSince(start: YearMonth, now: Date = new Date()): number {
  return Math.floor((monthsInPeriod({ start }, now) - 1) / 12);
}
