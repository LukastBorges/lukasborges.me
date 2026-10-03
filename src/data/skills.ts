import type { SkillGroup } from '@/types/content';

/**
 * Curated, evidence-backed expertise. Every skill lists where it was applied
 * (see `experience.ts`); data tests fail if a skill has no evidence.
 */
export const skillGroups: readonly SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'The core of my work for a decade: typed, component-driven interfaces.',
    skills: [
      { name: 'TypeScript', usedAt: ['hostfully', 'loadsmart'], core: true },
      { name: 'React', usedAt: ['hostfully', 'loadsmart', 'cit'], core: true },
      { name: 'JavaScript', usedAt: ['cit', 'summary'] },
      { name: 'HTML & CSS', usedAt: ['cit'] },
      { name: 'TanStack Query', usedAt: ['hostfully'], core: true },
      { name: 'TanStack Router', usedAt: ['hostfully'] },
      { name: 'Redux', usedAt: ['loadsmart', 'cit'] },
      { name: 'Angular', usedAt: ['loadsmart'] },
      { name: 'AngularJS', usedAt: ['cit'] },
      { name: 'Web Components', usedAt: ['loadsmart'] },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    description: 'Structures that keep large frontends changeable as teams and products grow.',
    skills: [
      { name: 'Modular frontend architecture', usedAt: ['hostfully'], core: true },
      { name: 'Micro-frontends', usedAt: ['hostfully'], core: true },
      { name: 'Design systems', usedAt: ['loadsmart'] },
      { name: 'Incremental legacy modernization', usedAt: ['hostfully'], core: true },
      { name: 'Schema validation (Zod)', usedAt: ['hostfully', 'summary'] },
      { name: 'API contracts (OpenAPI)', usedAt: ['hostfully'] },
      { name: 'Mobile-first, responsive UI', usedAt: ['summary'] },
      { name: 'Internationalization', usedAt: ['summary'] },
    ],
  },
  {
    id: 'quality',
    title: 'Quality',
    description: 'Testing and analysis built into the workflow rather than bolted on.',
    skills: [
      { name: 'Test pyramid strategy', usedAt: ['hostfully'], core: true },
      { name: 'Vitest', usedAt: ['hostfully'] },
      { name: 'Jest', usedAt: ['loadsmart', 'cit'] },
      { name: 'Testing Library', usedAt: ['loadsmart'] },
      { name: 'Cypress', usedAt: ['hostfully', 'loadsmart'] },
      { name: 'Static analysis (SonarQube, ESLint)', usedAt: ['hostfully', 'cit'] },
      { name: 'Monitoring & observability', usedAt: ['hostfully'] },
    ],
  },
  {
    id: 'data-ui',
    title: 'Data-rich interfaces',
    description: 'Grids, charts, and maps for finance, logistics, and hospitality.',
    skills: [
      { name: 'AG Grid', usedAt: ['cit'] },
      { name: 'amCharts', usedAt: ['cit'] },
      { name: 'Chart.js', usedAt: ['loadsmart'] },
      { name: 'Google Maps Platform', usedAt: ['hostfully', 'loadsmart'] },
      { name: 'Material UI', usedAt: ['cit'] },
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery & automation',
    description: 'Pipelines and tooling that make shipping routine.',
    skills: [
      { name: 'CI/CD', usedAt: ['hostfully', 'cit'] },
      { name: 'Semantic release', usedAt: ['hostfully'] },
      { name: 'AI-assisted development workflows', usedAt: ['hostfully', 'summary'], core: true },
      { name: 'Git', usedAt: ['cit'] },
    ],
  },
  {
    id: 'platform',
    title: 'Cloud & backend',
    description: 'Enough of the stack to own features end to end.',
    skills: [
      { name: 'Google Cloud Platform', usedAt: ['hostfully', 'cit'] },
      { name: 'Cloud Functions (Node.js)', usedAt: ['cit'] },
      { name: 'Pub/Sub & Dataflow', usedAt: ['cit'] },
      { name: 'BigQuery & Datastore', usedAt: ['cit'] },
      { name: 'Firebase', usedAt: ['cit'] },
      { name: 'Python', usedAt: ['cit'] },
      { name: 'Java', usedAt: ['cit'] },
    ],
  },
];
