/**
 * Utility to generate absolute URLs for OpenGraph and Twitter card images
 * Falls back to production URL if env var is not set
 */
export function getOgImage(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co';
  return `${baseUrl}${path}`;
}

/**
 * Get the site base URL
 */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co';
}
