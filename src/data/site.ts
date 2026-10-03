import { yearsSince } from '@/lib/dates';
import { profile } from './profile';

export interface NavItem {
  /** Matches the `id` of the section element. */
  id: string;
  label: string;
}

export const navigation: readonly NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const seo = {
  title: `${profile.name} — ${profile.title}`,
  description: `${profile.name} is a ${profile.title} with ${yearsSince(profile.careerStart)}+ years of experience in React and TypeScript, modernizing product frontends through modular architecture, quality systems, and user-focused interfaces.`,
  locale: 'en_US',
  ogImage: 'og.png',
  ogImageAlt: `${profile.name} — ${profile.title}`,
} as const;
