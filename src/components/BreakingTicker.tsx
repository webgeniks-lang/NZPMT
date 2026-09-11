'use client'

import Link from 'next/link'
import React from 'react'

export interface TickerItem {
  title: string
  slug: string
  categorySlug: string
}

export default function BreakingTicker({ items }: { items: TickerItem[] }) {
  if (!items?.length) return null

  // Duplicate the list so the CSS animation seamlessly loops.
  const loop = [...items, ...items]

  return (
    <div className="bg-red-700 text-white overflow-hidden border-b border-red-800">
      <div className="max-w-7xl mx-auto flex items-stretch">
        <div className="bg-navy-900 text-white text-xs md:text-sm font-extrabold uppercase px-3 md:px-4 py-2 flex items-center whitespace-nowrap tracking-wider">
          <span className="hidden md:inline">Breaking News</span>
          <span className="md:hidden">Breaking</span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="ticker-track flex whitespace-nowrap py-2 gap-8 will-change-transform">
            {loop.map((item, idx) => (
              <Link
                key={`${item.slug}-${idx}`}
                href={`/${item.categorySlug}/${item.slug}`}
                className="text-sm font-medium hover:underline"
              >
                <span className="mr-2">•</span>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
