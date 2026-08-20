'use client';

import { createContext, useContext } from 'react';
import { DEFAULT_SETTINGS, type SiteSettings } from '../lib/settings-schema';

/**
 * Carries the editable settings to the client components that render them.
 *
 * The value is read on the server, in app/layout.tsx, and handed to this
 * provider as an ordinary prop. That prop is the boundary: firebase-admin —
 * and node:crypto with it — stays entirely on the server side of it, and only
 * plain serialisable data crosses. Nothing under components/ may import
 * lib/settings.ts.
 *
 * A provider rather than threading props through fourteen page components: the
 * footer alone appears on every page, so a prop chain would touch every route
 * to deliver one string. The layout is already the single place all of them
 * share.
 */
const SiteSettingsContext = createContext<SiteSettings>(DEFAULT_SETTINGS);

export function SiteSettingsProvider({
  value,
  children,
}: {
  value: SiteSettings;
  children: React.ReactNode;
}) {
  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

/**
 * Defaults to the config/site.ts values, so a component rendered outside the
 * provider still shows real copy rather than blanks — the same reliability
 * floor getSiteSettings() gives the server.
 */
export function useSiteSettings(): SiteSettings {
  return useContext(SiteSettingsContext);
}
