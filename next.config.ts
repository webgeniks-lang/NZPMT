import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'nzpmt.co.nz' },
      { protocol: 'https', hostname: 'nzpmt.org' },
      { protocol: 'http', hostname: 'news.nzpmt.org' },
      { protocol: 'https', hostname: 'news.nzpmt.org' },
      { protocol: 'https', hostname: '**.myftpupload.com' },
    ],
  },
}

export default withPayload(nextConfig)
