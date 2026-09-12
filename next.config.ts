import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const R2_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || ''

const nextConfig: NextConfig = {
  devIndicators: false,
  async rewrites() {
    if (!R2_URL) return []
    return [
      {
        source: '/wp-content/uploads/:path*',
        destination: `${R2_URL}/:path*`,
      },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'nzpmt.co.nz' },
      { protocol: 'https', hostname: 'nzpmt.org' },
      { protocol: 'http', hostname: 'news.nzpmt.org' },
      { protocol: 'https', hostname: 'news.nzpmt.org' },
      { protocol: 'https', hostname: '**.myftpupload.com' },
      { protocol: 'https', hostname: 'pub-95ed881ed6cd420d83a10facc6131c54.r2.dev' },
      { protocol: 'https', hostname: '*.r2.cloudflarestorage.com' },
    ],
  },
}

export default withPayload(nextConfig)
