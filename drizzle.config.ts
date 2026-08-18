import type { Config } from 'drizzle-kit';

/**
 * drizzle-kit reads DATABASE_URL from the environment. It is loaded from
 * .env.local by the `dotenv` flag on the npm scripts, not by Next, because
 * drizzle-kit runs outside the Next runtime.
 */
export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
} satisfies Config;
