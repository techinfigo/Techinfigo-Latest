/**
 * What a "Fill your logins" link can ask for. Pure data, shared by the form
 * page (browser) and lib/cred-requests.ts (server).
 */

export type CredItemKey = 'instagram' | 'facebook' | 'gbp' | 'website' | 'hosting' | 'domain' | 'gmail' | 'youtube' | 'ads' | 'analytics' | 'other';

export type CredItem = {
  key: CredItemKey;
  emoji: string;
  label: string;
  /** Ask for a URL too (admin page address). */
  url?: boolean;
  /** Steps to give access by invite instead of sharing a password ({email} is filled in). */
  invite?: string[];
};

export const CRED_ITEMS: CredItem[] = [
  { key: 'instagram', emoji: '📸', label: 'Instagram' },
  {
    key: 'facebook',
    emoji: '👍',
    label: 'Facebook Page',
    invite: ['Facebook pe apna Page kholiye', 'Settings → Page setup → Page access', '"Add new" dabaiye aur ye email daaliye: {email}', '"Full control" chuniye aur Give access dabaiye'],
  },
  {
    key: 'gbp',
    emoji: '📍',
    label: 'Google Business Profile (Google Maps)',
    invite: ['Google Maps app ya google.com pe apna business profile kholiye', '⋮ (3 dots) → Business Profile settings → People and access', '"Add" dabaiye aur ye email daaliye: {email}', '"Manager" chuniye aur Invite dabaiye'],
  },
  { key: 'website', emoji: '🌐', label: 'Website admin (WordPress / Shopify / Wix)', url: true },
  { key: 'hosting', emoji: '🖥️', label: 'Hosting (GoDaddy / Hostinger etc.)', url: true },
  { key: 'domain', emoji: '🔗', label: 'Domain (jahan se domain liya)', url: true },
  { key: 'gmail', emoji: '✉️', label: 'Business Gmail' },
  { key: 'youtube', emoji: '▶️', label: 'YouTube channel' },
  {
    key: 'ads',
    emoji: '📢',
    label: 'Google Ads',
    invite: ['ads.google.com kholiye', 'Admin (tool icon) → Access and security', '"+" dabaiye aur ye email daaliye: {email}', '"Admin" access chuniye aur Send invitation dabaiye'],
  },
  {
    key: 'analytics',
    emoji: '📊',
    label: 'Google Analytics',
    invite: ['analytics.google.com kholiye', 'Admin → Account access management', '"+" → Add users → ye email daaliye: {email}', '"Editor" chuniye aur Add dabaiye'],
  },
  { key: 'other', emoji: '➕', label: 'Kuch aur', url: true },
];

export const itemOf = (k: string) => CRED_ITEMS.find((i) => i.key === k);
