import { CONTENT_LIMITS, type PageId } from './content-schema';

/**
 * What the admin panel shows for every editable field.
 *
 * CLIENT-SAFE — plain data, no Firestore import, so the editor form can hold
 * it directly. Declarative rather than hand-built forms: the editor renders
 * from this, so a field cannot be added to the content model and quietly ship
 * without a label explaining where it appears.
 *
 * Every entry has a label AND a `where` line. A label alone ("Eyebrow") tells
 * an editor nothing about what they are about to change on a live site; "the
 * small yellow line above the main headline" does.
 */

export type FieldKind = 'text' | 'textarea';

export type FieldSpec = {
  /** Dot path into the page content object. */
  path: string;
  label: string;
  /** Where this appears on the public site, in plain language. */
  where: string;
  kind: FieldKind;
  max: number;
};

/** A repeatable list of records, edited as rows. */
export type ListSpec = {
  path: string;
  label: string;
  where: string;
  /** Fields on each record. `key` is the property name within the record. */
  fields: { key: string; label: string; kind: FieldKind; max: number }[];
  /** Properties carried through untouched — routing and icon keys. */
  readOnlyKeys?: { key: string; label: string; note: string }[];
};

export type PageSpec = {
  /** Public route this page's copy appears on, for the "view page" link. */
  route: string;
  fields: FieldSpec[];
  lists: ListSpec[];
};


export const PAGE_SPECS: Record<PageId, PageSpec> = {
  home: {
    route: '/',
    fields: [
      {
        path: 'hero.eyebrow',
        label: 'Hero eyebrow',
        where: 'The small yellow line in the pill above the main headline.',
        kind: 'text',
        max: CONTENT_LIMITS.short,
      },
      {
        path: 'hero.headline',
        label: 'Hero headline',
        where:
          'The huge headline, first part. The last few words are the yellow italic field below — the line breaks are automatic, do not type them.',
        kind: 'textarea',
        max: CONTENT_LIMITS.line,
      },
      {
        path: 'hero.headlineAccent',
        label: 'Hero headline — yellow tail',
        where: 'The italic yellow words that finish the headline.',
        kind: 'text',
        max: CONTENT_LIMITS.short,
      },
      {
        path: 'hero.subhead',
        label: 'Hero sub-headline',
        where: 'The paragraph under the headline, above the button.',
        kind: 'textarea',
        max: CONTENT_LIMITS.paragraph,
      },
      {
        path: 'hero.ctaLabel',
        label: 'Hero button label',
        where: 'The yellow button in the hero.',
        kind: 'text',
        max: CONTENT_LIMITS.short,
      },
      {
        path: 'hero.ctaNote',
        label: 'Hero button note',
        where: 'The small line with a shield icon under the hero button.',
        kind: 'text',
        max: CONTENT_LIMITS.line,
      },
      {
        path: 'marquee.onboarding',
        label: 'Scrolling strip — first phrase',
        where: 'The yellow scrolling bar under the hero.',
        kind: 'text',
        max: CONTENT_LIMITS.line,
      },
      {
        path: 'marquee.capacityOff',
        label: 'Scrolling strip — second phrase',
        where:
          'The middle phrase in the yellow bar. Only shown while the scarcity counter in Settings is OFF; when it is on, the slot count replaces it.',
        kind: 'text',
        max: CONTENT_LIMITS.line,
      },
      {
        path: 'marquee.offer',
        label: 'Scrolling strip — third phrase',
        where: 'The last phrase in the yellow scrolling bar.',
        kind: 'text',
        max: CONTENT_LIMITS.line,
      },
      {
        path: 'insightsIntro',
        label: 'Insights intro',
        where:
          'The paragraph introducing the dark "What Founders Say" section, under its heading.',
        kind: 'textarea',
        max: CONTENT_LIMITS.paragraph,
      },
    ],
    lists: [
      {
        path: 'painPoints',
        label: 'Pain points',
        where: 'The "Where Most Brands Lose Profit" list in the diagnostic section.',
        fields: [
          { key: 'title', label: 'Title', kind: 'text', max: CONTENT_LIMITS.line },
          { key: 'desc', label: 'Description', kind: 'textarea', max: CONTENT_LIMITS.paragraph },
        ],
        readOnlyKeys: [
          { key: 'icon', label: 'Icon', note: 'Set in code — changing icons is a developer change.' },
        ],
      },
      {
        path: 'profitLeaks',
        label: 'Profit leak checkboxes',
        where: 'The selectable list in the growth lifecycle section.',
        fields: [{ key: 'text', label: 'Label', kind: 'text', max: CONTENT_LIMITS.line }],
      },
      {
        path: 'protocolSteps',
        label: 'Protocol steps',
        where: 'The numbered steps beside the profit-leak list. Numbering is automatic.',
        fields: [{ key: 'label', label: 'Step name', kind: 'text', max: CONTENT_LIMITS.short }],
      },
      {
        path: 'criteria',
        label: 'Qualification criteria',
        where: 'The five selectable cards in the "do we work together" section.',
        fields: [
          { key: 'label', label: 'Title', kind: 'text', max: CONTENT_LIMITS.short },
          {
            key: 'description',
            label: 'Description',
            kind: 'textarea',
            max: CONTENT_LIMITS.paragraph,
          },
        ],
        readOnlyKeys: [
          { key: 'icon', label: 'Icon', note: 'Set in code — changing icons is a developer change.' },
        ],
      },
      {
        path: 'insights',
        label: 'Insight cards',
        where:
          'The four dark cards in the "What Founders Say" section. These are deliberately not client quotes — the section says so above them.',
        fields: [
          { key: 'label', label: 'Card label', kind: 'text', max: CONTENT_LIMITS.short },
          { key: 'text', label: 'Card text', kind: 'textarea', max: CONTENT_LIMITS.paragraph },
        ],
      },
    ],
  },

  services: {
    route: '/services',
    fields: [],
    lists: [
      {
        path: 'pillars',
        label: 'Service cards',
        where: 'The grid of service cards on /services.',
        fields: [
          { key: 'title', label: 'Service name', kind: 'text', max: CONTENT_LIMITS.line },
          { key: 'desc', label: 'One-line description', kind: 'textarea', max: CONTENT_LIMITS.paragraph },
        ],
        readOnlyKeys: [
          {
            key: 'slug',
            label: 'Links to',
            note: 'This is the page the card opens. Changing it would break the link, so it is set in code.',
          },
        ],
      },
    ],
  },

  howItWorks: {
    route: '/how-it-works',
    fields: [],
    lists: [
      {
        path: 'steps',
        label: 'Process steps',
        where: 'The numbered lifecycle steps on /how-it-works.',
        fields: [
          { key: 'num', label: 'Number', kind: 'text', max: 4 },
          { key: 'title', label: 'Step name', kind: 'text', max: CONTENT_LIMITS.short },
          { key: 'desc', label: 'Description', kind: 'textarea', max: CONTENT_LIMITS.paragraph },
        ],
      },
    ],
  },

  qualification: {
    route: '/qualification',
    fields: [],
    lists: [
      {
        path: 'greenLights',
        label: 'Green lights — who we work with',
        where: 'The left column of /qualification.',
        fields: [
          { key: 'title', label: 'Title', kind: 'text', max: CONTENT_LIMITS.short },
          { key: 'desc', label: 'Description', kind: 'textarea', max: CONTENT_LIMITS.paragraph },
        ],
      },
      {
        path: 'redFlags',
        label: 'Red flags — who we turn down',
        where: 'The right column of /qualification.',
        fields: [
          { key: 'title', label: 'Title', kind: 'text', max: CONTENT_LIMITS.short },
          { key: 'desc', label: 'Description', kind: 'textarea', max: CONTENT_LIMITS.paragraph },
        ],
      },
    ],
  },

  agra: {
    route: '/digital-marketing-agency-agra',
    fields: [],
    lists: [
      {
        path: 'faqs',
        label: 'Frequently asked questions',
        where:
          'The FAQ accordion on the Agra landing page. These also feed the FAQ structured data Google reads.',
        fields: [
          { key: 'q', label: 'Question', kind: 'text', max: CONTENT_LIMITS.line },
          { key: 'a', label: 'Answer', kind: 'textarea', max: CONTENT_LIMITS.paragraph },
        ],
      },
    ],
  },
};

/** Read a dot path out of a content object. */
export function getPath(obj: unknown, path: string): string {
  return path.split('.').reduce<unknown>((acc, key) => (acc as Record<string, unknown>)?.[key], obj) as string;
}

/** Write a dot path, returning a new object — the form never mutates its prop. */
export function setPath<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.');
  const next = { ...(obj as Record<string, unknown>) };
  let cursor = next;
  for (let i = 0; i < keys.length - 1; i++) {
    cursor[keys[i]] = { ...(cursor[keys[i]] as Record<string, unknown>) };
    cursor = cursor[keys[i]] as Record<string, unknown>;
  }
  cursor[keys[keys.length - 1]] = value;
  return next as T;
}
