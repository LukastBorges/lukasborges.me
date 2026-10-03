import type { Principle } from '@/types/content';

/** How I work — each principle is tied to where it shows up in the record. */
export const principles: readonly Principle[] = [
  {
    title: 'Modernize without stopping the product',
    body: 'Rebuild in stages, bridge old and new, and keep users unaffected while the foundation changes underneath them.',
    evidence: ['hostfully'],
  },
  {
    title: 'Quality is a system, not a phase',
    body: 'Test pyramids, static analysis, and CI gates make quality the default outcome instead of a late-stage check.',
    evidence: ['hostfully', 'cit'],
  },
  {
    title: 'Architecture that scales with the team',
    body: 'Modular boundaries, shared components, and clear contribution rules let more people work safely in one codebase.',
    evidence: ['hostfully', 'loadsmart'],
  },
  {
    title: 'UX is an engineering concern',
    body: 'Work alongside designers to find the best experience inside real constraints — mobile-first, responsive, and fast.',
    evidence: ['hostfully', 'loadsmart', 'cit', 'summary'],
  },
  {
    title: 'Plan first, then delegate',
    body: 'Give agents real context through MCP, a written plan, and reusable skills. Let them take the repetitive work, and keep tests and static analysis as the gate.',
    evidence: ['hostfully', 'education'],
  },
  {
    title: 'Raise the people around you',
    body: 'Mentor junior and mid-level engineers, share practices openly, and treat change as an opportunity to learn.',
    evidence: ['summary'],
  },
];
