/**
 * Reads a lead from whatever a third-party tool sends (JSON, form post, URL
 * parameters) and recognises the usual field names. Used by the universal
 * webhook at /api/hooks/in/<token>.
 */

/* ---------------------------- payload reading ---------------------------- */

export type Pair = { key: string; value: string };

const norm = (k: string) => k.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Turns any JSON shape into flat key/value pairs. */
function flatten(value: unknown, key: string, out: Pair[], depth = 0): void {
  if (depth > 6 || out.length > 200 || value == null) return;
  if (Array.isArray(value)) {
    // [{ name: 'phone', value: '98...' }] / [{ label, values: [...] }] lists
    const named = value.every(
      (v) => v && typeof v === 'object' && !Array.isArray(v) && ('name' in v || 'label' in v || 'key' in v || 'id' in v),
    );
    if (named && value.length) {
      for (const v of value as Record<string, unknown>[]) {
        const k = String(v.name ?? v.label ?? v.key ?? v.id ?? '');
        const val = v.value ?? v.values ?? v.answer ?? v.string_value;
        if (k) flatten(Array.isArray(val) ? val.join(', ') : val, k, out, depth + 1);
      }
      return;
    }
    if (value.every((v) => typeof v !== 'object')) {
      flatten(value.join(', '), key, out, depth + 1);
      return;
    }
    value.forEach((v, i) => flatten(v, `${key}${i}`, out, depth + 1));
    return;
  }
  if (typeof value === 'object') {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) flatten(v, k, out, depth + 1);
    return;
  }
  const text = String(value).trim();
  if (key && text && text.length <= 2000) out.push({ key, value: text });
}

export async function readPayload(request: Request): Promise<Pair[]> {
  const pairs: Pair[] = [];
  const url = new URL(request.url);
  url.searchParams.forEach((v, k) => flatten(v, k, pairs));
  if (request.method !== 'POST') return pairs;

  const type = request.headers.get('content-type') ?? '';
  const raw = await request.text();
  if (!raw) return pairs;
  if (type.includes('application/x-www-form-urlencoded')) {
    new URLSearchParams(raw).forEach((v, k) => {
      // Elementor style: fields[phone][value]
      const m = k.match(/^fields\[([^\]]+)\]\[(value|raw_value)\]$/);
      if (m) flatten(v, m[1], pairs);
      else if (!/^fields\[/.test(k)) flatten(v, k, pairs);
    });
    return pairs;
  }
  if (type.includes('multipart/form-data')) {
    const form = await new Response(raw, { headers: { 'content-type': type } }).formData().catch(() => null);
    form?.forEach((v, k) => typeof v === 'string' && flatten(v, k, pairs));
    return pairs;
  }
  try {
    flatten(JSON.parse(raw), '', pairs);
  } catch {
    flatten(raw, 'message', pairs);
  }
  return pairs;
}

/* ----------------------------- field matching ---------------------------- */

const ALIASES = {
  name: ['name', 'fullname', 'yourname', 'customername', 'sendername', 'contactname', 'leadname', 'clientname'],
  firstName: ['firstname', 'fname', 'givenname'],
  lastName: ['lastname', 'lname', 'surname', 'familyname'],
  phone: [
    'phone', 'phonenumber', 'phoneno', 'mobile', 'mobilenumber', 'mobileno', 'contact', 'contactnumber', 'contactno',
    'whatsapp', 'whatsappnumber', 'sendermobile', 'senderphone', 'tel', 'telephone', 'cell', 'number',
  ],
  email: ['email', 'emailaddress', 'youremail', 'senderemail', 'workemail', 'mail', 'emailid'],
  company: ['company', 'companyname', 'business', 'businessname', 'brand', 'brandname', 'organisation', 'organization', 'sendercompany', 'firm', 'shopname', 'storename'],
  city: ['city', 'sendercity', 'location', 'town'],
  website: ['website', 'websiteurl', 'site', 'yourwebsite'],
  message: [
    'message', 'yourmessage', 'msg', 'query', 'querymessage', 'comments', 'comment', 'requirement', 'requirements',
    'enquiry', 'inquiry', 'description', 'notes', 'note', 'details',
  ],
} as const;

/** Technical fields tools add that are not about the person. */
const IGNORE = new Set([
  'token', 'key', 'googlekey', 'apikey', 'secret', 'code', 'status', 'formid', 'postid', 'formname', 'pageurl',
  'referer', 'referrer', 'useragent', 'remoteip', 'ip', 'time', 'date', 'timestamp', 'createdat', 'id', 'uniqueid',
  'istest', 'test', 'credit', 'uniquequeryid', 'querytype', 'querytime', 'gotcha', 'honeypot', 'recaptcha', 'grecaptcharesponse', 'action', 'nonce',
]);

type Kind = keyof typeof ALIASES;

export function pick(pairs: Pair[]) {
  const found: Partial<Record<Kind, string>> = {};
  const used = new Set<Pair>();
  for (const kind of Object.keys(ALIASES) as Kind[]) {
    const names: readonly string[] = ALIASES[kind];
    const hit = pairs.find((p) => !used.has(p) && names.includes(norm(p.key)));
    if (hit) {
      found[kind] = hit.value;
      used.add(hit);
    }
  }
  // A phone that is only digits/+/spaces; "Contact: email@x" is not a phone.
  if (found.phone && !/^[+\d][\d\s\-()]{6,}$/.test(found.phone)) found.phone = undefined;

  const isTest = pairs.some((p) => ['istest', 'test'].includes(norm(p.key)) && /^(1|true|yes)$/i.test(p.value));
  const answers = pairs
    .filter((p) => !used.has(p) && !IGNORE.has(norm(p.key)))
    .slice(0, 30)
    .map((p) => `${p.key.replace(/[_-]+/g, ' ').trim()}: ${p.value}`);

  const name =
    found.name ?? ([found.firstName, found.lastName].filter(Boolean).join(' ') || found.email || found.phone || 'Unknown');
  return { found, name, answers, isTest };
}
