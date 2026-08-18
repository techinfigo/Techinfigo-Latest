#!/usr/bin/env node
/**
 * Generates the two admin secrets. Usage:
 *
 *   npm run admin:hash -- "your-password-here"
 *
 * Prints the lines to paste into .env.local. Nothing is written to disk, and
 * the password itself is never stored — only the salted scrypt hash.
 */
import { randomBytes, scryptSync } from 'node:crypto';

const MIN_LENGTH = 12;
const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run admin:hash -- "your-password-here"');
  process.exit(1);
}

if (password.length < MIN_LENGTH) {
  console.error(
    `Password must be at least ${MIN_LENGTH} characters (got ${password.length}).`,
  );
  process.exit(1);
}

const salt = randomBytes(16).toString('hex');
const hash = scryptSync(password, salt, 64).toString('hex');

console.log('');
console.log('Add these to .env.local (never commit them):');
console.log('');
console.log(`ADMIN_PASSWORD_HASH=${salt}:${hash}`);
console.log(`ADMIN_SESSION_SECRET=${randomBytes(32).toString('hex')}`);
console.log('');
