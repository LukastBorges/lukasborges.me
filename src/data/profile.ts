import type { Profile } from '@/types/content';

const LINKEDIN = 'https://www.linkedin.com/in/lukasborges';
const GITHUB = 'https://github.com/LukastBorges';
const EMAIL = 'lukasborges@outlook.com';

export const profile: Profile = {
  name: 'Lucas Borges',
  initials: 'LB',
  title: 'Senior Frontend Engineer',
  headline:
    'I modernize product frontends — the architecture, the quality systems around it, and the interfaces people actually use.',
  intro:
    'From internal Google tooling and investment platforms to the hospitality products I build today with a US team, fully remote from Brazil.',
  summary: [
    'I’m a frontend engineer working mostly in React and TypeScript. Over the past decade I’ve built investment and portfolio tools, logistics platforms, internal Google tooling, and hospitality products — for consultancies, for clients, and for product teams in the US.',
    'The thread through all of it is sustainability: modular architecture, test strategy, static analysis, and automation that let a team move quickly without accumulating risk. At Hostfully, I’m rebuilding the Digital Guidebooks product in stages while keeping the legacy application stable for the people who rely on it.',
    'I work closely with designers to find the best experience within real technical constraints, and I enjoy mentoring junior and mid-level engineers.',
    'I came to software from engineering: a B.E. in Energy Management and Planning, with an exchange at Indiana Institute of Technology, followed by a graduate degree in Software Engineering. I’m currently completing a postgraduate degree in Software Engineering.',
  ],
  location: {
    city: 'Belo Horizonte',
    region: 'Minas Gerais',
    country: 'Brazil',
    timeZone: 'America/Sao_Paulo',
    utcOffsetLabel: 'UTC−3',
  },
  careerStart: '2016-02',
  languages: [
    { name: 'Portuguese', proficiency: 'Native' },
    { name: 'English', proficiency: 'Native or bilingual' },
  ],
  email: EMAIL,
  socials: [
    { id: 'linkedin', label: 'LinkedIn', handle: 'in/lukasborges', href: LINKEDIN },
    { id: 'github', label: 'GitHub', handle: 'LukastBorges', href: GITHUB },
    { id: 'email', label: 'Email', handle: EMAIL, href: `mailto:${EMAIL}` },
  ],
  resumeHref: LINKEDIN,
};
