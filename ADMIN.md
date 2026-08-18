# Admin lead pipeline

`/admin` is a password-gated view of every form submission, with the attribution
that formsubmit.co used to throw away. Storage is **Firestore**, via
`firebase-admin` running server-side only.

Everything here is optional. With no Firebase credentials set the site builds and
serves normally, every form keeps working, and every submission is still mirrored
to the inbox — only the queryable pipeline is unavailable.

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

### If you skip this step

`queryLeads()` catches the `FAILED_PRECONDITION` a missing index produces, logs a
warning, and falls back to one ordered fetch filtered in memory. The panel keeps
working rather than returning a 500. At current volume — well under 500 leads —
that fallback is genuinely cheap; the indexes matter once the collection grows
past what a single 500-document fetch should carry.

## 4. Run it

```bash
npm run build && npm start
```

Then visit `/admin`, sign in, and the pipeline is at `/admin` with per-lead
detail at `/admin/leads/<document-id>`.

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
  Edge bundle. The same rule already applies to `lib/auth-node.ts`.
- Notes are append-only: there is no PATCH or DELETE route, by design.
