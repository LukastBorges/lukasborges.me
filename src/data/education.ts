import type { Certification, Course, Education, Honor } from '@/types/content';

/** Most recent first. */
export const education: readonly Education[] = [
  {
    id: 'unipds-postgrad',
    institution: 'UNIPDS',
    credential: 'Postgraduate degree',
    field: 'Software Engineering',
    period: { start: '2026-02', end: '2027-02' },
  },
  {
    id: 'pucminas-graduate',
    institution: 'Pontifícia Universidade Católica de Minas Gerais',
    shortName: 'PUC Minas',
    credential: 'Graduate degree',
    field: 'Software Engineering',
    period: { start: '2015-03', end: '2016-09' },
  },
  {
    id: 'indiana-tech-exchange',
    institution: 'Indiana Institute of Technology',
    shortName: 'Indiana Tech',
    credential: 'Bachelor of Engineering coursework',
    field: 'Energy Management and Planning, production technology, and business',
    period: { start: '2012-01', end: '2013-12' },
    note: 'Exchange program',
  },
  {
    id: 'pucminas-be',
    institution: 'Pontifícia Universidade Católica de Minas Gerais',
    shortName: 'PUC Minas',
    credential: 'Bachelor of Engineering',
    field: 'Energy Management and Planning',
    period: { start: '2008-01', end: '2013-12' },
  },
];

/** Add certifications and courses here as they are earned; empty lists are hidden in the UI. */
export const certifications: readonly Certification[] = [];

export const courses: readonly Course[] = [];

export const honors: readonly Honor[] = [
  { title: 'Young Researcher' },
  { title: 'Student Leader' },
  { title: 'Participant', context: '3rd World Congress of Engineers' },
];
