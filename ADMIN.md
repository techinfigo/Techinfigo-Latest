# Admin panel

`/admin` is password-gated and has two tabs:

- **Leads** — every form submission, with the attribution formsubmit.co used to
  throw away.
- **Settings** (`/admin/settings`) — founder and contact details, positioning,
  the hero's headline figures, the scarcity toggle, and the logo and favicon.
  See [Editable site settings](#5-editable-site-settings) below.

Storage for both is **Firestore**, via `firebase-admin` running server-side only.

Everything here is optional. With no Firebase credentials set the site builds and
serves normally, every form keeps working, every submission is still mirrored to
the inbox, and every page renders the `config/site.ts` defaults — only the
queryable pipeline and the settings editor are unavailable.

---

## 1. Firestore

1. Create (or open) the Firebase project at <https://console.firebase.google.com>.
2. **Build → Firestore Database → Create database**. Pick a region and choose
   **production mode** — the app never reads Firestore from a browser, so the
   deny-all rules in `firestore.rules` are correct. Test mode would leave lead
   PII world-readable for 30 days.
3. **Project settings → Service accounts → Generate new private key**. This
   downloads a JSON key file.
4. Copy three values out of that file into `.env.local`, then **delete the JSON
   file** — it is a live credential, and `.gitignore` blocks it precisely so it
   is never committed:

   ```
   FIREBASE_PROJECT_ID=<project_id>
   FIREBASE_CLIENT_EMAIL=<client_email>
   FIREBASE_PRIVATE_KEY="<private_key, literal \n escapes intact>"
   ```

   Keep the quotes and the literal `\n` escapes exactly as they appear in the
   JSON. `lib/firestore.ts` unescapes them at runtime.

There is no migration step. Firestore creates `leads` and each lead's `notes`
subcollection on first write.

## 2. Admin password

```bash
npm run admin:hash -- "your-password-here"
```

Prints `ADMIN_PASSWORD_HASH` (scrypt `salt:hash`) and a suggested
`ADMIN_SESSION_SECRET`. Put both in `.env.local`. The password itself is never
stored, and changing the session secret invalidates every live session.

Auth is deliberately **not** Firebase Auth: `jose` signs the session JWT
(`lib/auth.ts`, Edge-safe for middleware) and `node:crypto` scrypt verifies the
password (`lib/auth-node.ts`, Node-only).

## 3. Composite indexes

Firestore needs a declared composite index for each equality-filter + `orderBy`
combination. The pipeline filters on `status`, `sourceForm` and a trailing date
window, always ordered by `createdAt` descending, which needs three:

| Query | Index |
| --- | --- |
| `?status=` | `status ASC, createdAt DESC` |
| `?source=` | `sourceForm ASC, createdAt DESC` |
| `?status=&source=` | `status ASC, sourceForm ASC, createdAt DESC` |

`?days=` needs nothing extra. A range filter on the same field the query orders
by is absorbed by the automatic single-field index, so every `?days=` variant is
covered by the row above it. Unfiltered views and the notes subcollection are
automatic too.

All three live in `firestore.indexes.json`.

### Deploy them — CLI

```bash
npm i -g firebase-tools     # once
firebase login              # once
firebase use <project_id>   # once, or pass --project <project_id> below
npm run db:indexes          # firebase deploy --only firestore:indexes
```

`firebase.json` points the CLI at `firestore.indexes.json`. To deploy the
deny-all security rules as well, drop the `--only` filter or use
`firebase deploy --only firestore`.

### Deploy them — console

Firebase console → **Firestore Database → Indexes → Composite → Add index**,
then for each row in the table above: collection ID `leads`, query scope
*Collection*, the fields in the listed order with the listed sort direction.

Building takes a few minutes per index on a small collection.

### Current state: deliberately not deployed

**The three indexes above are not live, by choice.** The pipeline runs on the
in-memory fallback described below, which is a supported configuration at this
volume — not an outstanding bug.

So this in the server log is expected, not a fault:

    [leads] composite index missing for this filter combination;
    falling back to in-memory filtering. Deploy firestore.indexes.json to remove this.

Two things to know if you decide to deploy them later:

- The `firebase-adminsdk-*` service account can read and write documents but
  **cannot create indexes** — that needs `datastore.indexes.create`, from a
  separate role (`roles/datastore.indexAdmin`) it does not carry by default.
  Grant that role, or deploy as a human via `firebase login`.
- `npm run db:indexes` needs the firebase CLI on PATH (`npm i -g firebase-tools`).
  It is not a dependency of this project.

### How the fallback works

`queryLeads()` catches the `FAILED_PRECONDITION` a missing index produces, logs the
warning above, and falls back to one ordered fetch filtered in memory. The panel
keeps working rather than returning a 500. At current volume — well under 500
leads — that fallback is genuinely cheap; the indexes matter once the collection
grows past what a single 500-document fetch should carry. That threshold is the
signal to revisit this.

## 4. Run it

```bash
npm run build && npm start
```

Then visit `/admin`, sign in, and the pipeline is at `/admin` with per-lead
detail at `/admin/leads/<document-id>`.

## 5. Editable site settings

`/admin/settings` edits one Firestore document, `settings/site`. Each field on
that page says where it appears on the public site; nothing there needs a code
change or a redeploy.

### It cannot break the public site

`config/site.ts` stays the source of the defaults and is **not** deleted. If the
settings document is missing, empty, or Firestore is unreachable,
`getSiteSettings()` falls back to those hardcoded values field by field — the
same reliability floor the inbox mirror gives lead capture. A half-filled
document degrades only where it is actually broken.

Validation runs server-side in `normalizeSettings()`, and stored documents go
through the same function as fresh saves. So a value hand-edited in the Firebase
console cannot reach a page if the form would have rejected it — a
`javascript:` LinkedIn URL is dropped, a slot count of 9999 is clamped to 99.

### Marketing pages stay static

This is the constraint the design is built around. Pages must not read Firestore
per request, or every one of them turns from prerendered (`○`) into
server-rendered (`ƒ`).

- `getSiteSettings()` reads through `unstable_cache`, tagged `site-settings`.
  Pages are prerendered against the cached value at build time.
- Saving calls `revalidateSiteSettings()`, which drops that tag and marks every
  page that consumed it for regeneration.
- So pages regenerate **on save**, not on traffic. `x-nextjs-prerender: 1` and
  `x-nextjs-cache: HIT` on `/` after a save is the proof this is working.

`revalidateTag` is called with `{ expire: 0 }` — Next 16 added a required
profile argument, and the named profiles all keep serving the old value for a
while, which is wrong when someone has just pressed Save. `updateTag` is not an
option: it only works inside a Server Action, and this runs in a route handler.

### Brand assets, without Firebase Storage

Storage is deliberately not used — it is another console to configure. The logo
and favicon are stored base64 **inside the settings document** and served by
`/api/brand/logo` and `/api/brand/favicon`.

That puts a hard ceiling on size: a Firestore document caps at 1 MB and base64
costs a further ~33%, so uploads over **200 KB** are rejected with an error
naming the actual size. Format is identified from the file's bytes, not its
name or its browser-reported type — renaming `payload.html` to `logo.png` is one
keystroke. PNG, JPEG, SVG and WebP are accepted.

Caching resolves an apparent conflict — cache hard, but pick up a new upload
immediately — with the content hash. Pages link to `/api/brand/logo?v=<hash>`,
which changes on every upload, so the hashed URL is safe to serve `immutable`
for a year and no browser can answer the new URL with the old image. An
unversioned request gets `max-age=60` plus an ETag, so it revalidates with a 304
rather than re-downloading. With nothing uploaded, both routes redirect to the
file in `public/`, which is also what every page links to directly.

An uploaded SVG is markup and could carry a `<script>`. Only a signed-in admin
can upload one, but it would be served from our own origin, so the routes send
`X-Content-Type-Options: nosniff` and a `sandbox` CSP.

No new environment variables, and no new indexes — reading one document by id
needs none.

---

## Shape notes

- A lead `id` is a Firestore **document id** — an opaque string, not an integer.
  Routes validate it with `isValidLeadId()` rather than `Number()`.
- `createdAt` / `updatedAt` are stored as Firestore `Timestamp`s and converted to
  JS `Date` in `lib/firestore.ts`, so nothing downstream ever holds a
  non-serialisable value.
- Types and `LEAD_STATUSES` live in `lib/leads-schema.ts`, not
  `lib/firestore.ts`. Client components import from there — importing the value
  `LEAD_STATUSES` from the storage module would drag `firebase-admin`, and
  `node:crypto` with it, into the browser bundle.
- `firebase-admin` is Node-only and must never become reachable from
  `middleware.ts`; a single `node:` specifier in that module graph breaks the
  Edge bundle. The same rule already applies to `lib/auth-node.ts`,
  `lib/settings.ts` and `lib/brand-assets.ts`.
- Notes are append-only: there is no PATCH or DELETE route, by design.
- `lib/settings-schema.ts` is the client-safe half of the settings, exactly as
  `lib/leads-schema.ts` is for leads. Client components read the values from
  `components/SiteSettingsProvider.tsx`, which the root layout hands the settings
  to **as a prop** — that prop is the boundary, and only plain serialisable data
  crosses it. Nothing under `components/` may import `lib/settings.ts`.
- `CAPACITY.currentBatch` and `nextBatch` stayed in `config/site.ts` rather than
  becoming editable. They are derived from today's date, and a hand-typed batch
  label is exactly the thing that went stale before. Only `showScarcity` and
  `slotsOpen` moved into the settings document.
- Route group `app/admin/(panel)/` is the set of pages past the auth gate; it
  renders the header nav and sign-out. `/admin/login` sits outside it, since it
  is the one `/admin` page you reach without a session.
