import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'NZPMT - Radio Spice | Voice of Punjabis in New Zealand',
  description:
    'New Zealand Punjabi Multimedia Trust - Radio Spice. Breaking News, India News, International, Local NZ, Sports and Weather for the Punjabi community in New Zealand.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'NZPMT - Radio Spice',
    description: 'Voice of Punjabis in New Zealand',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
