#!/usr/bin/env node
/**
 * check_api_keys – Verify required API keys are set in the environment.
 * Run: npm run check_api_keys
 * Or with env file: node --env-file=.env.local scripts/check_api_keys.js
 */

const required = [
  { name: 'NEXT_PUBLIC_YAHOO_API_KEY', usage: 'Client-side Yahoo Finance requests (price pages, etc.)' },
  { name: 'YAHOO2_API_KEY', usage: 'Server-side /api/quotes route authorization' },
];

let missing = 0;
console.log('Checking API keys...\n');

for (const { name, usage } of required) {
  const value = process.env[name];
  const set = value && value.length > 0 && value !== 'your-super-secret-key-202665465465' && value !== 'your-yahoo-api-key';
  if (set) {
    console.log(`  \u2713 ${name}`);
  } else {
    console.log(`  \u2717 ${name} – missing or placeholder`);
    console.log(`    (${usage})`);
    missing++;
  }
}

console.log('');
if (missing > 0) {
  console.error(`Failed: ${missing} key(s) missing or not configured. Set them in .env.local or your deployment environment.`);
  process.exit(1);
}
console.log('All required API keys are set.');
process.exit(0);
