import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

type Sql = ReturnType<typeof postgres>;
type Db = ReturnType<typeof drizzle<typeof schema>>;

/**
 * In dev, Next hot-reload re-evaluates modules and would open a fresh pool on
 * every edit. Parking the client on globalThis keeps exactly one alive.
 */
const globalForDb = globalThis as unknown as {
  __techinfigoSql?: Sql;
  __techinfigoDb?: Db;
};

let sqlClient: Sql | undefined = globalForDb.__techinfigoSql;
let dbClient: Db | undefined = globalForDb.__techinfigoDb;

/** True when a database is wired up. Lets callers degrade instead of throwing. */
export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Lazy singleton. Deliberately does NOT connect at module load: `next build`
 * imports every route module, so a top-level connection would make the build
 * fail on any machine without DATABASE_URL — including CI and preview
 * deploys that never touch the admin panel.
 */
export function getDb(): Db {
  if (dbClient) return dbClient;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Copy .env.example to .env.local and point it at your Postgres instance.',
    );
  }

  // prepare:false is required by Supabase's transaction pooler, which cannot
  // support prepared statements; on Neon it costs nothing. max:1 keeps the
  // footprint sane on serverless, where each instance holds its own pool.
  sqlClient = postgres(url, { prepare: false, max: 1 });
  dbClient = drizzle(sqlClient, { schema });

  if (process.env.NODE_ENV !== 'production') {
    globalForDb.__techinfigoSql = sqlClient;
    globalForDb.__techinfigoDb = dbClient;
  }

  return dbClient;
}

export { schema };
