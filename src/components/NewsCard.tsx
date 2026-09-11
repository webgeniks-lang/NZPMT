import Link from 'next/link'
import React from 'react'

export type NewsCardVariant = 'hero' | 'standard' | 'compact'

export interface NewsCardProps {
  title: string
  slug: string
  category: string
  categorySlug: string
  categoryColor?: string
  excerpt?: string
  publishedAt?: string | null
  imageUrl?: string | null
  isFeatured?: boolean
  variant?: NewsCardVariant
}

const colorClasses: Record<string, string> = {
  orange: 'bg-red-700 text-white',
  blue: 'bg-blue-600 text-white',
  green: 'bg-emerald-600 text-white',
  red: 'bg-red-800 text-white',
  purple: 'bg-purple-600 text-white',
  yellow: 'bg-yellow-500 text-slate-900',
}

function formatDate(iso?: string | null) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-NZ', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23f1f5f9"/><text x="300" y="205" font-family="sans-serif" font-size="24" fill="%2394a3b8" text-anchor="middle">NZPMT</text></svg>'

export default function NewsCard({
  title,
  slug,
  category,
  categorySlug,
  categoryColor = 'orange',
  excerpt,
  publishedAt,
  imageUrl,
  isFeatured,
  variant = 'standard',
}: NewsCardProps) {
  const href = `/${categorySlug}/${slug}`
  const badge = colorClasses[categoryColor] ?? colorClasses.orange
  const img = imageUrl || PLACEHOLDER

  if (variant === 'hero') {
    return (
      <Link
        href={href}
        className="group block relative overflow-hidden rounded-lg bg-slate-900 shadow-lg h-[400px] md:h-[500px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-block text-xs uppercase font-bold px-2.5 py-1 rounded ${badge}`}>
              {category}
            </span>
            {isFeatured && (
              <span className="inline-block text-xs uppercase font-bold px-2.5 py-1 rounded bg-white/20 backdrop-blur">
                Featured
              </span>
            )}
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold leading-tight group-hover:text-red-500 transition-colors">
            {title}
          </h2>
          {excerpt && (
            <p className="mt-3 text-sm md:text-base text-slate-200 line-clamp-2 max-w-3xl">
              {excerpt}
            </p>
          )}
          <p className="mt-3 text-xs text-slate-300">{formatDate(publishedAt)}</p>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={href} className="group flex gap-3 items-start py-3 border-b border-slate-100">
        <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className={`inline-block text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${badge}`}>
            {category}
          </span>
          <h3 className="mt-1 text-sm font-bold leading-snug text-slate-800 group-hover:text-red-800 line-clamp-2">
            {title}
          </h3>
          <p className="text-xs text-slate-500 mt-1">{formatDate(publishedAt)}</p>
        </div>
      </Link>
    )
  }

  // standard
  return (
    <Link
      href={href}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col h-full"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span
          className={`absolute top-3 left-3 text-xs uppercase font-bold px-2 py-1 rounded ${badge}`}
        >
          {category}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base md:text-lg font-bold leading-snug text-slate-800 group-hover:text-red-800 line-clamp-3">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 text-sm text-slate-600 line-clamp-2">{excerpt}</p>
        )}
        <p className="mt-auto pt-3 text-xs text-slate-500">{formatDate(publishedAt)}</p>
      </div>
    </Link>
  )
}
