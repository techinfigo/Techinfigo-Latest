import { MetadataRoute } from 'next';
import { SITE } from '../config/site';

/**
 * Every public, indexable page.
 *
 * `updated` is the date the page's own content last changed. Keep it honest:
 * bump a date only when that page's content changes. A date that changes on
 * every deploy teaches Google to ignore it.
 *
 * Left out on purpose: /privacy, /terms and /sitemap (they are noindex, so
 * listing them would send Google mixed signals) and /admin.
 */
const ROUTES: { path: string; updated: string; priority: number }[] = [
  { path: '', updated: '2026-09-29', priority: 1 },
  { path: '/digital-marketing-agency-agra', updated: '2026-09-29', priority: 0.9 },
  { path: '/lead-capture', updated: '2026-09-29', priority: 0.9 },
  { path: '/services', updated: '2026-08-21', priority: 0.8 },
  { path: '/services/performance-ads', updated: '2026-08-21', priority: 0.8 },
  { path: '/services/cro', updated: '2026-08-21', priority: 0.8 },
  { path: '/services/seo', updated: '2026-08-21', priority: 0.8 },
  { path: '/services/retention', updated: '2026-08-21', priority: 0.8 },
  { path: '/contact', updated: '2026-09-29', priority: 0.8 },
  { path: '/about', updated: '2026-08-21', priority: 0.7 },
  { path: '/system', updated: '2026-08-21', priority: 0.7 },
  { path: '/how-it-works', updated: '2026-08-21', priority: 0.7 },
  { path: '/case-studies', updated: '2026-08-21', priority: 0.7 },
  { path: '/profit-breakdown', updated: '2026-08-21', priority: 0.7 },
  { path: '/qualification', updated: '2026-08-21', priority: 0.6 },
  { path: '/careers', updated: '2026-08-21', priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, updated, priority }) => ({
    url: `${SITE.url}${path}`,
    lastModified: updated,
    changeFrequency: 'monthly' as const,
    priority,
  }));
}
