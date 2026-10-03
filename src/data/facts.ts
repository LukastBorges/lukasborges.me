import { yearsSince } from '@/lib/dates';
import type { Fact } from '@/types/content';
import { experience } from './experience';
import { profile } from './profile';

/**
 * At-a-glance facts, all derived from the data above — nothing here is a free-floating claim.
 * Recomputed on every build.
 */
export function getFacts(now: Date = new Date()): readonly Fact[] {
  const remoteRoles = experience
    .flatMap((entry) => entry.roles)
    .filter((role) => role.workMode === 'remote');
  const remoteSince = Math.min(...remoteRoles.map((role) => Number(role.period.start.slice(0, 4))));

  return [
    { value: `${yearsSince(profile.careerStart, now)}+ years`, label: 'building for the web' },
    { value: `Since ${remoteSince}`, label: 'remote with US product teams' },
    {
      value: profile.location.utcOffsetLabel,
      label: `${profile.location.city}, Brazil`,
      timeZone: profile.location.timeZone,
    },
    { value: 'EN · PT', label: 'native / bilingual' },
  ];
}
