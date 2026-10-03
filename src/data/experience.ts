import type { Experience, Location } from '@/types/content';

const BELO_HORIZONTE: Location = {
  city: 'Belo Horizonte',
  region: 'Minas Gerais',
  country: 'Brazil',
};

/** Most recent first. Source: LinkedIn profile export. */
export const experience: readonly Experience[] = [
  {
    company: {
      id: 'hostfully',
      name: 'Hostfully',
      description: 'Property management software for short-term and vacation rentals.',
      url: 'https://www.hostfully.com',
    },
    roles: [
      {
        title: 'Senior Frontend Engineer',
        period: { start: '2024-04' },
        location: BELO_HORIZONTE,
        workMode: 'remote',
        summary:
          'Modernizing the Digital Guidebooks product — the guides hosts build and guests use throughout their stay.',
        highlights: [
          'Rebuilding the Guidebook Host and Guest applications in stages on a new foundation focused on performance, compatibility, and a modern UI.',
          'Stabilized and adapted parts of the legacy UI, integrating applications through micro-frontends and embedded frames.',
          'Introduced a modular architecture with documentation and contribution guidelines, static analysis, a unit/component/E2E test pyramid, and proactive monitoring.',
          'Applied AI tooling to automate parts of the development workflow, shortening CI/CD cycles and producing release documentation through semantic releases.',
        ],
        technologies: [
          'React',
          'TypeScript',
          'TanStack Query',
          'TanStack Router',
          'Zod',
          'OpenAPI',
          'Vitest',
          'Cypress',
          'Google Cloud',
          'Google Maps Platform',
        ],
      },
    ],
  },
  {
    company: {
      id: 'loadsmart',
      name: 'Loadsmart',
      description: 'Freight and logistics technology company.',
      url: 'https://loadsmart.com',
    },
    roles: [
      {
        title: 'Senior Frontend Engineer',
        period: { start: '2021-08', end: '2023-12' },
        location: BELO_HORIZONTE,
        workMode: 'remote',
        summary:
          'Improved internal and customer-facing logistics tools across user experience, application maturity, and new features.',
        highlights: [
          'Built Web Components for the company design system.',
          'Shipped features across React/Redux and Angular codebases, including map-based and data-visualization interfaces.',
        ],
        technologies: [
          'React',
          'Redux',
          'Angular',
          'TypeScript',
          'Web Components',
          'Jest',
          'Testing Library',
          'Cypress',
          'Google Maps',
          'Chart.js',
        ],
      },
    ],
  },
  {
    company: {
      id: 'cit',
      name: 'CI&T',
      description: 'Global digital technology services company headquartered in Brazil.',
      url: 'https://ciandt.com',
    },
    roles: [
      {
        title: 'Senior Frontend Engineer',
        period: { start: '2020-09', end: '2021-08' },
        location: BELO_HORIZONTE,
        client: 'Invesco',
        summary:
          'Built a technically demanding platform for investment analysis, portfolio management, benefits analysis, and projections.',
        highlights: [
          'Developed data-dense financial interfaces with complex grids and interactive charts.',
        ],
        technologies: ['React', 'Redux', 'Material UI', 'AG Grid', 'amCharts'],
      },
      {
        title: 'Frontend Engineer',
        period: { start: '2018-03', end: '2020-09' },
        location: BELO_HORIZONTE,
        client: 'Google and an investments client',
        summary:
          'Contributed to an internal Google project focused on reliability and user experience, and delivered specialized frontend work for an investments client.',
        highlights: [
          'Enforced code quality in CI with SonarQube, JSHint, and ESLint.',
          'Worked beyond the frontend on Python APIs, unit tests, and integration services.',
          'Expanded use of Google Cloud: Cloud Functions (Node.js), Pub/Sub, and Dataflow.',
          'Delivered a React/Redux/Material UI frontend for an investments client that was praised as functional, modern, and reliable.',
        ],
        technologies: [
          'React',
          'Redux',
          'Material UI',
          'Python',
          'Node.js',
          'Google Cloud',
          'Jest',
          'Enzyme',
          'Nightwatch.js',
          'SonarQube',
        ],
      },
      {
        title: 'Junior Software Engineer',
        period: { start: '2017-03', end: '2018-03' },
        location: BELO_HORIZONTE,
        summary:
          'Frontend-focused development on Google Cloud Platform services within a Kanban process centered on CI metrics and quality assurance.',
        highlights: [
          'Built on BigQuery, App Engine, Search API, Cloud Storage, Cloud Endpoints, Datastore, and Firebase.',
        ],
        technologies: [
          'JavaScript (ES6)',
          'AngularJS',
          'AngularJS Material',
          'Karma',
          'Jasmine',
          'Python',
          'Java',
          'Google Cloud',
        ],
      },
      {
        title: 'Intern',
        period: { start: '2016-02', end: '2017-03' },
        location: BELO_HORIZONTE,
        summary:
          'Helped build an application for a major client with strict quality and security requirements.',
        highlights: ['Adopted an agile process with quality and feedback metrics enforced in CI.'],
        technologies: [
          'JavaScript',
          'Java',
          'Python',
          'AngularJS',
          'Jasmine',
          'Gulp',
          'Jenkins',
          'Google App Engine',
        ],
      },
    ],
  },
];
