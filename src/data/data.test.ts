import { describe, expect, it } from 'vitest';
import { monthsInPeriod, parseYearMonth } from '@/lib/dates';
import type { Evidence, Period } from '@/types/content';
import { principles } from './approach';
import { education, honors } from './education';
import { experience } from './experience';
import { getFacts } from './facts';
import { profile } from './profile';
import { projects } from './projects';
import { navigation } from './site';
import { skillGroups } from './skills';

const OCT_2026 = new Date(Date.UTC(2026, 9, 3));
const companyIds = new Set(experience.map((entry) => entry.company.id));
const isKnownEvidence = (id: Evidence) => id === 'summary' || companyIds.has(id);

function expectValidPeriod(period: Period) {
  expect(() => parseYearMonth(period.start)).not.toThrow();
  if (period.end) expect(() => monthsInPeriod(period)).not.toThrow();
}

describe('experience', () => {
  it('has unique companies', () => {
    expect(companyIds.size).toBe(experience.length);
  });

  it('has valid periods, most recent first', () => {
    const starts = experience.flatMap((entry) => entry.roles.map((role) => role.period.start));
    starts.forEach((start, i) => {
      const next = starts[i + 1];
      if (next) expect(start >= next).toBe(true);
    });
    for (const role of experience.flatMap((entry) => entry.roles)) expectValidPeriod(role.period);
  });

  it('only has one ongoing role', () => {
    const ongoing = experience.flatMap((entry) => entry.roles).filter((role) => !role.period.end);
    expect(ongoing).toHaveLength(1);
  });

  it('matches LinkedIn durations', () => {
    const [hostfully, loadsmart] = experience;
    expect(monthsInPeriod(hostfully?.roles[0]?.period ?? { start: '2000-01' }, OCT_2026)).toBe(31);
    expect(monthsInPeriod(loadsmart?.roles[0]?.period ?? { start: '2000-01' })).toBe(29);
  });

  it('every role has content', () => {
    for (const role of experience.flatMap((entry) => entry.roles)) {
      expect(role.summary.length).toBeGreaterThan(0);
      expect(role.highlights.length).toBeGreaterThan(0);
      expect(role.technologies.length).toBeGreaterThan(0);
    }
  });
});

describe('evidence', () => {
  it('every skill is backed by at least one known source', () => {
    for (const skill of skillGroups.flatMap((group) => group.skills)) {
      expect(skill.usedAt.length, skill.name).toBeGreaterThan(0);
      expect(skill.usedAt.every(isKnownEvidence), skill.name).toBe(true);
    }
  });

  it('every principle is backed by at least one known source', () => {
    for (const principle of principles) {
      expect(principle.evidence.length, principle.title).toBeGreaterThan(0);
      expect(principle.evidence.every(isKnownEvidence), principle.title).toBe(true);
    }
  });

  it('has no duplicate skills', () => {
    const names = skillGroups.flatMap((group) => group.skills.map((skill) => skill.name));
    expect(new Set(names).size).toBe(names.length);
  });
});

describe('projects', () => {
  it('has unique ids, valid periods and https links', () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length);
    for (const project of projects) {
      expectValidPeriod(project.period);
      for (const href of Object.values(project.links)) expect(href).toMatch(/^https:\/\//);
    }
  });

  it('open-source projects link to their repository', () => {
    for (const project of projects.filter((p) => p.kind === 'open-source')) {
      expect(project.links.repository, project.id).toBeDefined();
    }
  });
});

describe('education', () => {
  it('has unique ids and valid periods', () => {
    expect(new Set(education.map((e) => e.id)).size).toBe(education.length);
    for (const entry of education) expectValidPeriod(entry.period);
  });

  it('has honors', () => {
    expect(honors.length).toBeGreaterThan(0);
  });
});

describe('site', () => {
  it('has unique navigation ids', () => {
    expect(new Set(navigation.map((n) => n.id)).size).toBe(navigation.length);
  });

  it('derives facts from data', () => {
    const facts = getFacts(OCT_2026);
    expect(facts[0]?.value).toBe('10+ years');
    expect(facts[1]?.value).toBe('Since 2021');
  });
});

describe('privacy', () => {
  const everything = JSON.stringify({
    profile,
    experience,
    skillGroups,
    projects,
    education,
    principles,
  });

  it('never publishes a phone number', () => {
    expect(everything).not.toMatch(/\+?\d{2}\s?\(?\d{2}\)?\s?\d{4,5}-?\d{4}/);
  });

  it('only publishes the approved email address', () => {
    const emails = new Set(everything.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) ?? []);
    expect([...emails]).toEqual(['lukasborges@outlook.com']);
  });

  it('only uses https links', () => {
    const urls = everything.match(/\b[a-z]+:\/\/[^\s"']+/g) ?? [];
    for (const url of urls) expect(url).toMatch(/^https:\/\//);
  });
});
