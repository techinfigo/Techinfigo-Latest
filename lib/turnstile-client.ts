/**
 * Cloudflare Turnstile, the invisible "are you human" check. BROWSER ONLY.
 *
 * Nothing happens until NEXT_PUBLIC_TURNSTILE_SITE_KEY is set. When it is,
 * getTurnstileToken() loads Cloudflare's script on first use, runs the check
 * in the background and returns a one-time token for the server to verify.
 * Real visitors normally see nothing; a small box appears only if Cloudflare
 * needs a quick click. It never throws: a failure returns undefined and the
 * server decides what to do.
 */

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  execute: (idOrEl: string | HTMLElement) => void;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
const SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let loading: Promise<Turnstile | null> | null = null;

function load(): Promise<Turnstile | null> {
  const w = window as unknown as { turnstile?: Turnstile };
  if (w.turnstile) return Promise.resolve(w.turnstile);
  if (loading) return loading;
  loading = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = SCRIPT;
    script.async = true;
    script.onload = () => resolve(w.turnstile ?? null);
    script.onerror = () => {
      loading = null;
      resolve(null);
    };
    document.head.appendChild(script);
  });
  return loading;
}

export async function getTurnstileToken(): Promise<string | undefined> {
  if (!SITE_KEY || typeof window === 'undefined') return undefined;
  const turnstile = await load();
  if (!turnstile) return undefined;

  return new Promise((resolve) => {
    const box = document.createElement('div');
    box.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:9999;';
    document.body.appendChild(box);

    let id = '';
    const finish = (token?: string) => {
      clearTimeout(timer);
      try {
        if (id) turnstile.remove(id);
      } catch {
        /* already gone */
      }
      box.remove();
      resolve(token);
    };
    const timer = setTimeout(() => finish(undefined), 20000);

    try {
      id = turnstile.render(box, {
        sitekey: SITE_KEY,
        appearance: 'interaction-only',
        callback: (token: string) => finish(token),
        'error-callback': () => finish(undefined),
        'expired-callback': () => finish(undefined),
      });
    } catch {
      finish(undefined);
    }
  });
}
