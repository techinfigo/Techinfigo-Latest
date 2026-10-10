import { MetadataRoute } from 'next';
import { SITE } from '../config/site';
import { SERVICES } from '../lib/services';

/**
 * Every public page Google should index.
 *
 * `updated` is the date that page's content last changed. Bump a date only
 * when the page itself changes: a date that moves on every deploy teaches
 * Google to ignore it.
 *
 * Left out on purpose: /privacy, /terms, /sitemap and /case-studies (they are
 * noindex, the last until it holds real client work, so listing them would
 * send mixed signals), /admin, and old addresses that now
 * redirect (/system, /profit-breakdown, old service slugs).
 */
const SERVICES_UPDATED = '2026-10-07';

const ROUTES: { path: string; updated: string; priority: number }[] = [
  { path: '', updated: '2026-10-10', priority: 1 },
  { path: '/digital-marketing-agency-agra', updated: '2026-10-07', priority: 0.9 },
  { path: '/lead-capture', updated: '2026-10-07', priority: 0.9 },
  { path: '/website-design-agra', updated: '2026-10-09', priority: 0.9 },
  { path: '/services', updated: SERVICES_UPDATED, priority: 0.9 },
  ...SERVICES.map((s) => ({ path: `/services/${s.slug}`, updated: SERVICES_UPDATED, priority: 0.8 })),
  { path: '/contact', updated: '2026-10-10', priority: 0.8 },
  { path: '/how-it-works', updated: '2026-10-07', priority: 0.7 },
  { path: '/about', updated: '2026-10-07', priority: 0.7 },
  { path: '/qualification', updated: '2026-10-07', priority: 0.6 },
  { path: '/careers', updated: '2026-10-07', priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, updated, priority }) => ({
    url: `${SITE.url}${path}`,
    lastModified: updated,
    changeFrequency: 'monthly' as const,
    priority,
  }));
}
