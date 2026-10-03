import { describe, expect, it } from 'vitest';
import {
  formatDuration,
  formatPeriod,
  formatYearMonth,
  formatYearSpan,
  isOngoing,
  monthsInPeriod,
  parseYearMonth,
  yearsSince,
} from './dates';

const OCT_2026 = new Date(Date.UTC(2026, 9, 3));

describe('parseYearMonth', () => {
  it('parses valid values', () => {
    expect(parseYearMonth('2024-04')).toEqual({ year: 2024, month: 4 });
  });

  it('rejects malformed values', () => {
    // @ts-expect-error — invalid month is also a type error
    expect(() => parseYearMonth('2024-13')).toThrow(RangeError);
    // @ts-expect-error — wrong shape
    expect(() => parseYearMonth('24-1')).toThrow(RangeError);
  });
});

describe('monthsInPeriod', () => {
  it('counts both ends, matching LinkedIn', () => {
    expect(monthsInPeriod({ start: '2021-08', end: '2023-12' })).toBe(29); // 2 yrs 5 mos
    expect(monthsInPeriod({ start: '2020-09', end: '2021-08' })).toBe(12); // 1 yr
    expect(monthsInPeriod({ start: '2024-04', end: '2024-04' })).toBe(1);
  });

  it('uses "now" for ongoing periods', () => {
    expect(monthsInPeriod({ start: '2024-04' }, OCT_2026)).toBe(31); // 2 yrs 7 mos
  });

  it('rejects inverted periods', () => {
    expect(() => monthsInPeriod({ start: '2024-04', end: '2023-01' })).toThrow(RangeError);
  });
});

describe('formatting', () => {
  it('formats durations', () => {
    expect(formatDuration(29)).toBe('2 yrs 5 mos');
    expect(formatDuration(12)).toBe('1 yr');
    expect(formatDuration(13)).toBe('1 yr 1 mo');
    expect(formatDuration(8)).toBe('8 mos');
  });

  it('formats months and periods', () => {
    expect(formatYearMonth('2024-04')).toBe('Apr 2024');
    expect(formatPeriod({ start: '2024-04' })).toBe('Apr 2024 – Present');
    expect(formatPeriod({ start: '2021-08', end: '2023-12' })).toBe('Aug 2021 – Dec 2023');
  });

  it('formats year spans', () => {
    expect(formatYearSpan({ start: '2008-01', end: '2013-12' })).toBe('2008 – 2013');
    expect(formatYearSpan({ start: '2016-02', end: '2016-09' })).toBe('2016');
  });
});

describe('isOngoing / yearsSince', () => {
  it('treats open and future-ending periods as ongoing', () => {
    expect(isOngoing({ start: '2024-04' }, OCT_2026)).toBe(true);
    expect(isOngoing({ start: '2026-02', end: '2027-02' }, OCT_2026)).toBe(true);
    expect(isOngoing({ start: '2021-08', end: '2023-12' }, OCT_2026)).toBe(false);
  });

  it('counts whole years', () => {
    expect(yearsSince('2016-02', OCT_2026)).toBe(10);
    expect(yearsSince('2016-11', OCT_2026)).toBe(9);
  });
});
