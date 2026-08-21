import { DEFAULT_CASE_STUDIES, DEFAULT_CONTENT } from '../config/content';

/**
 * Shapes, defaults and validation for editable page copy.
 *
 * CLIENT-SAFE by design, exactly like lib/leads-schema.ts and
 * lib/settings-schema.ts: no Firestore import anywhere in this graph, so a
 * client component can hold a PageContent value without dragging
 * firebase-admin — and node:crypto with it — into the browser bundle. The
 * storage half lives in lib/content.ts.
 *
 * config/content.ts stays the source of the defaults. Every value here is
 * either what an editor saved or the copy the site already shipped with.
 */

/**
 * The editable page documents, each a singleton at `content/{id}`.
 *
 * Singletons rather than a collection because a page is not a repeatable
 * thing: there is exactly one homepage, and modelling it as a collection would
 * invite a second one nobody renders. Case studies are the opposite — they are
 * added over time and need an order — so they get a real collection.
 */
export const PAGE_IDS = ['home', 'services', 'howItWorks', 'qualification', 'agra'] as const;
export type PageId = (typeof PAGE_IDS)[number];

/** Human labels for the admin panel's section list. */
export const PAGE_LABELS: Record<PageId, string> = {
  home: 'Home page',
  services: 'Services',
  howItWorks: 'How it works',
  qualification: 'Qualification',
  agra: 'Agra landing page',
};

/**
 * Each page's content is exactly the shape of its default. Deriving the type
 * from config/content.ts rather than declaring it twice means a field cannot
 * exist in the schema without shipping a default for it — which is what makes
 * the fallback total rather than partial.
 */
export type ContentShape = typeof DEFAULT_CONTENT;
export type PageContent<K extends PageId = PageId> = Editable<ContentShape[K]>;

/**
 * `as const` gives the defaults two properties this type does not want:
 * everything is `readonly`, and every string is narrowed to its own literal
 * type. Stored copy is neither — the whole point is that an editor replaces
 * it — so this strips the modifier *and* widens each literal back to its
 * primitive. Without the widening, `headline` would have the type
 * `'Scaling Revenue is Easy. Scaling'` and nothing else would ever be
 * assignable to it.
 */
type Editable<T> = T extends readonly (infer U)[]
  ? Editable<U>[]
  : T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : T extends object
          ? { -readonly [K in keyof T]: Editable<T[K]> }
          : T;

export type SiteContent = { [K in PageId]: PageContent<K> };

export const DEFAULT_SITE_CONTENT = DEFAULT_CONTENT as unknown as SiteContent;

// --- case studies -----------------------------------------------------------

export type CaseStudy = Editable<(typeof DEFAULT_CASE_STUDIES)[number]> & {
  /** Firestore document id. Absent on the defaults, which have no document. */
  id?: string;
};

export const DEFAULT_CASE_STUDY_LIST = DEFAULT_CASE_STUDIES as unknown as CaseStudy[];

// --- limits -----------------------------------------------------------------

/**
 * Per-field caps. Long enough for any real copy, short enough that a paste
 * accident cannot push a Firestore document toward its 1MB ceiling.
 */
export const CONTENT_LIMITS = {
  short: 120,
  line: 300,
  paragraph: 1200,
  /** Most list sections render a fixed grid; beyond this the layout breaks. */
  maxItems: 12,
} as const;

// --- normalisation ----------------------------------------------------------
//
// Every helper takes `unknown` and returns something renderable. A stored
// document is run through the same functions as a fresh save, so a value
// hand-edited in the Firebase console cannot reach a page if the admin form
// would have rejected it. Same contract as lib/settings-schema.ts.

function text(value: unknown, max: number, fallback: string): string {
  if (typeof value !== 'string') return fallback;
  // Collapse whitespace but keep the string intact otherwise: copy is prose,
  // and an editor's line breaks inside a paragraph are not meaningful here.
  const trimmed = value.trim().replace(/\s+/g, ' ');
  return trimmed ? trimmed.slice(0, max) : fallback;
}

function bool(value: unknown, fallback: boolean): boolean {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return fallback;
}

function integer(value: unknown, fallback: number): number {
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

/**
 * A list of records, normalised against the default record shape.
 *
 * An empty or missing list falls back to the defaults in full rather than
 * rendering nothing — a section with its heading and no items looks broken in
 * a way that a section with the shipped copy does not. A list that *does* have
 * items is trusted for its length, so an editor can genuinely delete one.
 */
function list<T extends Record<string, unknown>>(
  value: unknown,
  defaults: T[],
  normaliseItem: (item: unknown, fallback: T) => T,
): T[] {
  if (!Array.isArray(value) || value.length === 0) return defaults.map((d) => ({ ...d }));
  const template = defaults[0];
  return value
    .slice(0, CONTENT_LIMITS.maxItems)
    .map((item, i) => normaliseItem(item, defaults[i] ?? template));
}

function obj(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

/** Icon keys are chosen in code, never typed by an editor — an unknown key falls back. */
function iconKey(value: unknown, fallback: string): string {
  return typeof value === 'string' && /^[a-z][a-z0-9-]{0,30}$/.test(value) ? value : fallback;
}

function normaliseHome(input: unknown): SiteContent['home'] {
  const d = DEFAULT_SITE_CONTENT.home;
  const v = obj(input);
  const hero = obj(v.hero);
  const marquee = obj(v.marquee);

  return {
    hero: {
      eyebrow: text(hero.eyebrow, CONTENT_LIMITS.short, d.hero.eyebrow),
      headline: text(hero.headline, CONTENT_LIMITS.line, d.hero.headline),
      headlineAccent: text(hero.headlineAccent, CONTENT_LIMITS.short, d.hero.headlineAccent),
      subhead: text(hero.subhead, CONTENT_LIMITS.paragraph, d.hero.subhead),
      ctaLabel: text(hero.ctaLabel, CONTENT_LIMITS.short, d.hero.ctaLabel),
      ctaNote: text(hero.ctaNote, CONTENT_LIMITS.line, d.hero.ctaNote),
    },
    marquee: {
      onboarding: text(marquee.onboarding, CONTENT_LIMITS.line, d.marquee.onboarding),
      capacityOff: text(marquee.capacityOff, CONTENT_LIMITS.line, d.marquee.capacityOff),
      offer: text(marquee.offer, CONTENT_LIMITS.line, d.marquee.offer),
    },
    painPoints: list(v.painPoints, d.painPoints, (item, f) => {
      const i = obj(item);
      return {
        icon: iconKey(i.icon, f.icon),
        title: text(i.title, CONTENT_LIMITS.line, f.title),
        desc: text(i.desc, CONTENT_LIMITS.paragraph, f.desc),
      };
    }),
    profitLeaks: list(v.profitLeaks, d.profitLeaks, (item, f) => ({
      text: text(obj(item).text, CONTENT_LIMITS.line, f.text),
    })),
    protocolSteps: list(v.protocolSteps, d.protocolSteps, (item, f) => ({
      label: text(obj(item).label, CONTENT_LIMITS.short, f.label),
    })),
    criteria: list(v.criteria, d.criteria, (item, f) => {
      const i = obj(item);
      return {
        icon: iconKey(i.icon, f.icon),
        label: text(i.label, CONTENT_LIMITS.short, f.label),
        description: text(i.description, CONTENT_LIMITS.paragraph, f.description),
      };
    }),
    insightsIntro: text(v.insightsIntro, CONTENT_LIMITS.paragraph, d.insightsIntro),
    insights: list(v.insights, d.insights, (item, f) => {
      const i = obj(item);
      return {
        label: text(i.label, CONTENT_LIMITS.short, f.label),
        text: text(i.text, CONTENT_LIMITS.paragraph, f.text),
      };
    }),
  };
}

function normaliseServices(input: unknown): SiteContent['services'] {
  const d = DEFAULT_SITE_CONTENT.services;
  const v = obj(input);
  return {
    pillars: list(v.pillars, d.pillars, (item, f) => {
      const i = obj(item);
      return {
        // The slug is a route, not copy. It is carried through unchanged from
        // the default so an edit cannot point a card at a page that does not
        // exist — see the note in config/content.ts about nav and routing.
        slug: f.slug,
        title: text(i.title, CONTENT_LIMITS.line, f.title),
        desc: text(i.desc, CONTENT_LIMITS.paragraph, f.desc),
      };
    }),
  };
}

function normaliseHowItWorks(input: unknown): SiteContent['howItWorks'] {
  const d = DEFAULT_SITE_CONTENT.howItWorks;
  const v = obj(input);
  return {
    steps: list(v.steps, d.steps, (item, f) => {
      const i = obj(item);
      return {
        num: text(i.num, 4, f.num),
        title: text(i.title, CONTENT_LIMITS.short, f.title),
        desc: text(i.desc, CONTENT_LIMITS.paragraph, f.desc),
      };
    }),
  };
}

function normaliseQualification(input: unknown): SiteContent['qualification'] {
  const d = DEFAULT_SITE_CONTENT.qualification;
  const v = obj(input);
  const pair = (value: unknown, defaults: typeof d.greenLights) =>
    list(value, defaults, (item, f) => {
      const i = obj(item);
      return {
        title: text(i.title, CONTENT_LIMITS.short, f.title),
        desc: text(i.desc, CONTENT_LIMITS.paragraph, f.desc),
      };
    });
  return {
    greenLights: pair(v.greenLights, d.greenLights),
    redFlags: pair(v.redFlags, d.redFlags),
  };
}

function normaliseAgra(input: unknown): SiteContent['agra'] {
  const d = DEFAULT_SITE_CONTENT.agra;
  const v = obj(input);
  return {
    faqs: list(v.faqs, d.faqs, (item, f) => {
      const i = obj(item);
      return {
        q: text(i.q, CONTENT_LIMITS.line, f.q),
        a: text(i.a, CONTENT_LIMITS.paragraph, f.a),
      };
    }),
  };
}

const NORMALISERS: { [K in PageId]: (input: unknown) => SiteContent[K] } = {
  home: normaliseHome,
  services: normaliseServices,
  howItWorks: normaliseHowItWorks,
  qualification: normaliseQualification,
  agra: normaliseAgra,
};

/**
 * Anything → complete, renderable content for one page.
 *
 * Never throws and never returns a partial object: a field that is missing,
 * the wrong type or over-length falls back to its config/content.ts default
 * field by field, so a half-filled document degrades only where it is actually
 * broken rather than blanking the page.
 */
export function normalisePage<K extends PageId>(page: K, input: unknown): SiteContent[K] {
  return NORMALISERS[page](input);
}

/** One normalised case study. `id` is the Firestore document id when there is one. */
export function normaliseCaseStudy(input: unknown, id?: string): CaseStudy {
  const v = obj(input);
  const f = DEFAULT_CASE_STUDY_LIST[0];
  const before = obj(v.before);
  const after = obj(v.after);
  const details = obj(v.details);
  const overview = obj(details.overview);
  const results = obj(details.results);

  const lines = (value: unknown, fallback: string[]): string[] =>
    Array.isArray(value) && value.length
      ? value
          .slice(0, CONTENT_LIMITS.maxItems)
          .map((s) => text(s, CONTENT_LIMITS.line, ''))
          .filter(Boolean)
      : fallback;

  return {
    id,
    slug: text(v.slug, CONTENT_LIMITS.short, f.slug),
    brand: text(v.brand, CONTENT_LIMITS.short, f.brand),
    category: text(v.category, CONTENT_LIMITS.short, f.category),
    before: {
      spend: text(before.spend, CONTENT_LIMITS.short, f.before.spend),
      roas: text(before.roas, CONTENT_LIMITS.short, f.before.roas),
      profit: text(before.profit, CONTENT_LIMITS.short, f.before.profit),
      pain: text(before.pain, CONTENT_LIMITS.line, f.before.pain),
    },
    after: {
      spend: text(after.spend, CONTENT_LIMITS.short, f.after.spend),
      profit: text(after.profit, CONTENT_LIMITS.short, f.after.profit),
      cacReduction: text(after.cacReduction, CONTENT_LIMITS.short, f.after.cacReduction),
      gain: text(after.gain, CONTENT_LIMITS.short, f.after.gain),
    },
    highlight: text(v.highlight, CONTENT_LIMITS.line, f.highlight),
    details: {
      overview: {
        industry: text(overview.industry, CONTENT_LIMITS.short, f.details.overview.industry),
        revenue: text(overview.revenue, CONTENT_LIMITS.short, f.details.overview.revenue),
        spend: text(overview.spend, CONTENT_LIMITS.short, f.details.overview.spend),
      },
      problem: text(details.problem, CONTENT_LIMITS.paragraph, f.details.problem),
      diagnosis: lines(details.diagnosis, f.details.diagnosis),
      solution: lines(details.solution, f.details.solution),
      results: {
        profitBefore: text(results.profitBefore, CONTENT_LIMITS.short, f.details.results.profitBefore),
        profitAfter: text(results.profitAfter, CONTENT_LIMITS.short, f.details.results.profitAfter),
        cacImprovement: text(
          results.cacImprovement,
          CONTENT_LIMITS.short,
          f.details.results.cacImprovement,
        ),
        timeline: text(results.timeline, CONTENT_LIMITS.short, f.details.results.timeline),
      },
      quote: text(details.quote, CONTENT_LIMITS.paragraph, f.details.quote),
    },
    // Unpublished is the safe default for anything whose flag is missing or
    // malformed: a draft that fails to appear is a smaller problem than a draft
    // that appears.
    published: bool(v.published, false),
    order: integer(v.order, 0),
  };
}

/** Published only, in display order. The public site never calls anything else. */
export function publishedCaseStudies(studies: CaseStudy[]): CaseStudy[] {
  return studies
    .filter((study) => study.published)
    .sort((a, b) => a.order - b.order || a.brand.localeCompare(b.brand));
}
