/**
 * Content models for the portfolio. All professional content lives in `src/data/*`
 * and is typed against these interfaces, so components never hardcode copy.
 */

type Month = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';

/** Calendar month in `YYYY-MM` form, e.g. `'2024-04'`. */
export type YearMonth = `${number}-${Month}`;

/** A date span. A missing `end` means the item is ongoing ("Present"). */
export interface Period {
  start: YearMonth;
  end?: YearMonth;
}

export type WorkMode = 'remote' | 'hybrid' | 'onsite';

export interface Location {
  city: string;
  region: string;
  country: string;
}

/* ------------------------------------------------------------------------- */
/* Profile                                                                    */
/* ------------------------------------------------------------------------- */

export type SocialId = 'linkedin' | 'github' | 'email';

export interface SocialLink {
  id: SocialId;
  label: string;
  /** Human-readable handle or address shown next to the label. */
  handle: string;
  href: string;
}

export interface SpokenLanguage {
  name: string;
  proficiency: string;
}

/** A short fact derived from the profile data (never a made-up metric). */
export interface Fact {
  value: string;
  label: string;
  /** IANA time zone; when set, the UI appends the live local time to the label. */
  timeZone?: string;
}

export interface Profile {
  name: string;
  /** Name used professionally, shown in the site header and the browser tab title. */
  professionalName: string;
  title: string;
  /** One-line positioning statement for the hero. */
  headline: string;
  /** Supporting line under the headline. */
  intro: string;
  /** About section paragraphs. */
  summary: readonly string[];
  location: Location & {
    /** IANA time zone, used to render the visitor-facing local time. */
    timeZone: string;
    utcOffsetLabel: string;
  };
  /** First professional engineering role; drives "years of experience". */
  careerStart: YearMonth;
  languages: readonly SpokenLanguage[];
  email: string;
  socials: readonly SocialLink[];
  /** Where "Résumé" CTAs point. */
  resumeHref: string;
}

/* ------------------------------------------------------------------------- */
/* Experience                                                                 */
/* ------------------------------------------------------------------------- */

export type CompanyId = 'hostfully' | 'loadsmart' | 'cit';

/**
 * Where a claim comes from: a company in `experience.ts`, the LinkedIn summary for
 * cross-cutting practices, or formal study (`education.ts`).
 */
export type Evidence = CompanyId | 'summary' | 'education';

export interface Company {
  id: CompanyId;
  name: string;
  /** One-line, publicly verifiable description of what the company does. */
  description: string;
  url: string;
}

export interface Role {
  title: string;
  period: Period;
  location: Location;
  workMode?: WorkMode;
  /** Client the work was delivered for (consultancy engagements). */
  client?: string;
  /** One or two sentences of context. */
  summary: string;
  /** Concrete contributions, impact first. */
  highlights: readonly string[];
  technologies: readonly string[];
}

export interface Experience {
  company: Company;
  /** Most recent first. */
  roles: readonly Role[];
}

/* ------------------------------------------------------------------------- */
/* Skills                                                                     */
/* ------------------------------------------------------------------------- */

export interface Skill {
  name: string;
  /** Where this skill was applied — keeps every skill evidence-backed. */
  usedAt: readonly Evidence[];
  /** Highlighted as a core strength. */
  core?: boolean;
}

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  skills: readonly Skill[];
}

/* ------------------------------------------------------------------------- */
/* Work / projects                                                            */
/* ------------------------------------------------------------------------- */

export type ProjectKind = 'case-study' | 'open-source';

export interface ProjectLinks {
  repository?: string;
  live?: string;
}

export interface Project {
  id: string;
  kind: ProjectKind;
  name: string;
  /** Company or client context, e.g. "Hostfully" or "CI&T for Invesco". */
  context: string;
  /** Omitted when the work has no well-defined start (e.g. an evolving practice). */
  period?: Period;
  summary: string;
  problem: string;
  approach: readonly string[];
  /** What Lucas personally owned or delivered. */
  contribution: string;
  /** Only outcomes stated in the source material — never invented. */
  outcomes: readonly string[];
  technologies: readonly string[];
  links: ProjectLinks;
  featured: boolean;
}

/* ------------------------------------------------------------------------- */
/* Education & learning                                                       */
/* ------------------------------------------------------------------------- */

export interface Education {
  id: string;
  institution: string;
  shortName?: string;
  credential: string;
  field: string;
  period: Period;
  note?: string;
  /** One or two sentences about the program. */
  description?: string;
  /** Curriculum highlights, shown as tags. */
  topics?: readonly string[];
  url?: string;
}

export interface Certification {
  name: string;
  issuer?: string;
  url?: string;
}

export interface Course {
  name: string;
  provider: string;
  year?: number;
  url?: string;
}

export interface Honor {
  title: string;
  context?: string;
}

/* ------------------------------------------------------------------------- */
/* Approach                                                                   */
/* ------------------------------------------------------------------------- */

export interface Principle {
  title: string;
  body: string;
  /** Where this principle shows up in the record. */
  evidence: readonly Evidence[];
}
