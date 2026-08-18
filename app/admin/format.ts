/**
 * Rendered on the server, so a locale-aware formatter would produce a string
 * that depends on the server's locale and disagree with the client on
 * re-render. ISO-derived and explicit avoids that entirely.
 */
export function formatTimestamp(value: Date): string {
  return value.toISOString().slice(0, 16).replace('T', ' ');
}
