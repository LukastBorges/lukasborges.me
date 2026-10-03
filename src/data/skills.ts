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
    id: 'ai',
    title: 'AI-native engineering',
    description: 'Agents in the daily workflow, with the context and guardrails to do real work.',
    skills: [
      { name: 'Agentic development workflows', usedAt: ['hostfully', 'summary'], core: true },
      { name: 'Model Context Protocol (MCP)', usedAt: ['hostfully', 'education'], core: true },
      { name: 'Autonomous agents', usedAt: ['hostfully', 'education'], core: true },
      { name: 'Prompt engineering', usedAt: ['hostfully', 'education'] },
      { name: 'Agent skills', usedAt: ['hostfully'] },
      { name: 'Plan-driven implementation', usedAt: ['hostfully'] },
      { name: 'Figma, Jira & MUI MCP servers', usedAt: ['hostfully'] },
      { name: 'LLM fundamentals', usedAt: ['education'] },
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
    title: 'Quality & delivery',
    description: 'Testing, analysis, and pipelines built into the workflow rather than bolted on.',
    skills: [
      { name: 'Test pyramid strategy', usedAt: ['hostfully'], core: true },
      { name: 'Vitest', usedAt: ['hostfully'] },
      { name: 'Jest', usedAt: ['loadsmart', 'cit'] },
      { name: 'Testing Library', usedAt: ['loadsmart'] },
      { name: 'Cypress', usedAt: ['hostfully', 'loadsmart'] },
      { name: 'Static analysis (SonarQube, ESLint)', usedAt: ['hostfully', 'cit'] },
      { name: 'Monitoring & observability', usedAt: ['hostfully'] },
      { name: 'CI/CD', usedAt: ['hostfully', 'cit'] },
      { name: 'Semantic release', usedAt: ['hostfully'] },
      { name: 'Git', usedAt: ['cit'] },
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
      { name: 'Material UI', usedAt: ['hostfully', 'cit'] },
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
