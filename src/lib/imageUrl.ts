const R2 = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 'https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev'

/**
 * Converts a /wp-content/uploads/... relative path or nzpmt domain URL
 * into the Cloudflare R2 public URL.
 */
export function r2Img(url: string | undefined | null): string {
  if (!url) return ''
  // Already an R2 URL
  if (url.includes('r2.dev') || url.includes('r2.cloudflarestorage.com')) return url
  // Strip known domains to get the path
  const path = url
    .replace(/https?:\/\/(www\.)?(nzpmt\.co\.nz|nzpmt\.org|news\.nzpmt\.org)/, '')
  // If it's a /wp-content/ relative path, prepend R2
  if (path.startsWith('/wp-content/uploads/')) {
    return `${R2}${path.replace('/wp-content/uploads/', '/')}`
  }
  return url
}

/** @deprecated use r2Img */
export const localImg = r2Img
