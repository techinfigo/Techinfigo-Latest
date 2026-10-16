import { after } from 'next/server';
import { isCrmConfigured } from '../../../lib/crm';
import { isProposalId, loadProposal, recordView } from '../../../lib/proposals';
import { renderProposalHtml } from '../../../lib/proposal-design';

/**
 * The page a client opens from WhatsApp: www.techinfigo.com/p/<id>.
 * Served as a plain HTML page (no site header/footer) in the fixed Techinfigo
 * proposal design. Not indexed by search engines.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const page = (status: number, title: string, text: string) =>
  new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title></head><body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#0b2226;color:#fff;font-family:Poppins,system-ui,sans-serif;text-align:center;padding:24px"><div><h1 style="font-size:22px">${title}</h1><p style="color:#a9bfc2">${text}</p><p><a style="color:#f6b324" href="https://www.techinfigo.com">techinfigo.com</a></p></div></body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' } },
  );

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isProposalId(id) || !isCrmConfigured()) return page(404, 'Proposal not found', 'Please check the link, or ask us for a fresh one.');

  let data;
  try {
    data = await loadProposal(id);
  } catch (error) {
    console.error('[proposal page] load failed:', error);
    return page(500, 'Please try again', 'We could not open this proposal right now.');
  }
  if (!data) return page(404, 'Proposal not found', 'Please check the link, or ask us for a fresh one.');

  const ua = request.headers.get('user-agent') || '';
  after(() => recordView(id, ua).catch((e) => console.error('[proposal page] view:', e)));

  const html = renderProposalHtml(data, { logoSrc: '/proposal-logo.png', pdfButton: true });
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'private, no-store',
      'Referrer-Policy': 'no-referrer',
    },
  });
}
