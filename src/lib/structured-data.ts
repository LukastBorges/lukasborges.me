import { education } from '@/data/education';
import { experience } from '@/data/experience';
import { profile } from '@/data/profile';
import { seo } from '@/data/site';
import { skillGroups } from '@/data/skills';

/** schema.org ProfilePage + Person, rendered as JSON-LD in the document head. */
export function profilePageSchema(pageUrl: string, imageUrl: string) {
  const current = experience.find((entry) => entry.roles.some((role) => !role.period.end));
  const institutions = [...new Set(education.map((entry) => entry.institution))];
  const knowsAbout = skillGroups.flatMap((group) =>
    group.skills.filter((skill) => skill.core).map((skill) => skill.name),
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: pageUrl,
    name: seo.title,
    description: seo.description,
    inLanguage: 'en',
    mainEntity: {
      '@type': 'Person',
      '@id': `${pageUrl}#person`,
      name: profile.name,
      jobTitle: profile.title,
      description: profile.headline,
      url: pageUrl,
      image: imageUrl,
      email: `mailto:${profile.email}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: profile.location.city,
        addressRegion: profile.location.region,
        addressCountry: 'BR',
      },
      sameAs: profile.socials.filter((s) => s.id !== 'email').map((s) => s.href),
      knowsLanguage: profile.languages.map((language) => language.name),
      knowsAbout,
      ...(current && {
        worksFor: { '@type': 'Organization', name: current.company.name, url: current.company.url },
      }),
      alumniOf: institutions.map((name) => ({ '@type': 'CollegeOrUniversity', name })),
    },
  };
}
