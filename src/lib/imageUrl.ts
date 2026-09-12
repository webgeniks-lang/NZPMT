const R2 = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || ''

/**
 * Converts a /wp-content/uploads/... path to R2 URL in production,
 * or keeps it as a relative path for local development.
 */
export function wpImg(path: string | undefined | null): string {
  if (!path) return ''
  // Already absolute (R2 or external)
  if (path.startsWith('http')) return path
  // Local path — prefix with R2 in production, serve locally otherwise
  if (R2 && path.startsWith('/wp-content/uploads/')) {
    return `${R2}${path.replace('/wp-content/uploads', '')}`
  }
  return path
}

/** @deprecated use wpImg */
export const localImg = wpImg
export const r2Img = wpImg
