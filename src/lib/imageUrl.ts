/**
 * Converts an absolute nzpmt.co.nz or nzpmt.org image URL into
 * a local path served from /public/wp-content/uploads/...
 * Falls back to the original URL if the domain doesn't match.
 */
export function localImg(url: string | undefined | null): string {
  if (!url) return ''
  return url
    .replace('https://nzpmt.co.nz', '')
    .replace('http://nzpmt.co.nz', '')
    .replace('https://nzpmt.org', '')
    .replace('http://nzpmt.org', '')
}
