/**
 * The admin panel's sections, in sidebar order.
 *
 * Adding a section is one entry here: the fixed sidebar and the mobile drawer
 * both render from this array, so there is no second list to keep in sync.
 * Deliberately plain data with no imports — the client nav holds it without
 * dragging anything server-only across the boundary.
 */
export type AdminSection = {
  href: string;
  label: string;
  /**
   * Extra route prefixes this section owns. A lead's detail page lives at
   * /admin/leads/<id> but belongs to Pipeline, and the sidebar has to stay lit
   * while you are down there — otherwise the panel looks like it lost its place
   * the moment you open a lead.
   */
  subtree?: readonly string[];
};

export const ADMIN_SECTIONS: readonly AdminSection[] = [
  { href: '/admin', label: 'Pipeline', subtree: ['/admin/leads'] },
  { href: '/admin/analytics', label: 'Analytics' },
  { href: '/admin/settings', label: 'Settings' },
];

/**
 * Whether `pathname` sits inside a section.
 *
 * /admin is a prefix of every other admin route, so it never matches by prefix
 * — it is active on an exact match or inside one of its declared subtrees.
 * Every other section owns its own subtree, matched on a path boundary so that
 * a future /admin/settings-archive cannot light up /admin/settings.
 */
export function isSectionActive(pathname: string, section: AdminSection): boolean {
  if (pathname === section.href) return true;
  const owned =
    section.href === '/admin'
      ? section.subtree ?? []
      : [section.href, ...(section.subtree ?? [])];
  return owned.some((base) => pathname === base || pathname.startsWith(`${base}/`));
}
