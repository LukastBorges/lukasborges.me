import type { Project } from '@/types/content';

/**
 * Selected work. Professional case studies are written from the LinkedIn record only:
 * no invented metrics or outcomes. Add `outcomes` only when they can be backed up.
 */
export const projects: readonly Project[] = [
  {
    id: 'hostfully-guidebooks',
    kind: 'case-study',
    name: 'Digital Guidebooks',
    context: 'Hostfully',
    period: { start: '2024-04' },
    summary:
      'A staged rebuild of the Guidebook Host and Guest applications, delivered while the legacy product stayed live.',
    problem:
      'A legacy guidebook application needed a modern foundation without disrupting the hosts and guests using it every day.',
    approach: [
      'Stabilized the legacy UI and bridged old and new applications with micro-frontends and embedded frames.',
      'Replaced the Host and Guest apps in stages on a stack chosen for performance, compatibility, and a modern UI.',
      'Defined a modular architecture with contribution guidelines, static analysis, a full test pyramid, and monitoring.',
      'Automated parts of the workflow with AI tooling and semantic releases, improving CI/CD efficiency.',
    ],
    contribution:
      'Frontend engineering across architecture, migration strategy, quality tooling, and delivery automation.',
    outcomes: [],
    technologies: [
      'React',
      'TypeScript',
      'TanStack Query',
      'TanStack Router',
      'Zod',
      'OpenAPI',
      'Vitest',
      'Cypress',
    ],
    links: {},
    featured: true,
  },
  {
    id: 'loadsmart-design-system',
    kind: 'case-study',
    name: 'Design system components',
    context: 'Loadsmart',
    period: { start: '2021-08', end: '2023-12' },
    summary:
      'Web Components for Loadsmart’s design system, alongside internal and customer-facing logistics tools.',
    problem:
      'Improve internal and client-facing logistics tools — user experience, application maturity, and features — while contributing to the design system.',
    approach: [
      'Built Web Components for the design system.',
      'Improved user experience and application maturity across internal and client-facing tools.',
      'Delivered map and data-visualization features with Google Maps and Chart.js.',
    ],
    contribution: 'Senior frontend engineer on product and design-system work.',
    outcomes: [],
    technologies: ['Web Components', 'React', 'Redux', 'Angular', 'TypeScript', 'Cypress'],
    links: {},
    featured: true,
  },
  {
    id: 'invesco-portfolio-platform',
    kind: 'case-study',
    name: 'Investment & portfolio platform',
    context: 'CI&T for Invesco',
    period: { start: '2020-09', end: '2021-08' },
    summary:
      'Investment analysis, portfolio management, benefits analysis, and projections in one technically demanding tool.',
    problem:
      'An ambitious, technically challenging financial product spanning investments, portfolios, benefits analysis, and projections.',
    approach: [
      'Built data-heavy views with AG Grid and interactive projections with amCharts.',
      'Structured application state with Redux on a Material UI foundation.',
    ],
    contribution: 'Senior frontend engineer delivering client-facing features.',
    outcomes: [],
    technologies: ['React', 'Redux', 'Material UI', 'AG Grid', 'amCharts'],
    links: {},
    featured: true,
  },
  {
    id: 'google-internal-tooling',
    kind: 'case-study',
    name: 'Internal Google project',
    context: 'CI&T for Google',
    period: { start: '2018-03', end: '2020-09' },
    summary:
      'Contributed to an internal Google project as it matured toward reliability and a better user experience.',
    problem: 'An internal product needed to become more reliable and easier to use as it matured.',
    approach: [
      'Enforced quality gates in CI with SonarQube, JSHint, and ESLint.',
      'Worked across the stack on Python APIs, unit tests, and integration services.',
      'Expanded the use of Google Cloud: Cloud Functions, Pub/Sub, and Dataflow.',
    ],
    contribution: 'Frontend engineer contributing across frontend, APIs, and cloud integration.',
    outcomes: [],
    technologies: ['Python', 'Node.js', 'Google Cloud', 'SonarQube', 'ESLint'],
    links: {},
    featured: false,
  },
];
