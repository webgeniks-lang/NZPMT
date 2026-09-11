import Link from 'next/link'
import { notFound } from 'next/navigation'
import NewsCard from '@/components/NewsCard'
import {
  CATEGORY_ORDER,
  fetchCategoryBySlug,
  fetchPublishedPosts,
  toCardProps,
} from '@/lib/posts'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Props {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string }>
}

const accentBar: Record<string, string> = {
  orange: 'bg-red-700',
  blue: 'bg-blue-600',
  green: 'bg-emerald-600',
  red: 'bg-red-800',
  purple: 'bg-purple-600',
  yellow: 'bg-yellow-500',
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params
  const cat = await fetchCategoryBySlug(category)
  if (!cat) return { title: 'Not found' }
  return {
    title: `${cat.name} — NZPMT Radio Spice`,
    description: cat.description || `Latest ${cat.name} from NZPMT Radio Spice.`,
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params
  const sp = await searchParams
  const page = Math.max(1, Number(sp?.page || 1))

  const cat = await fetchCategoryBySlug(category)
  if (!cat) {
    // Fall back to canonical list if the DB doesn't yet have this category
    const canonical = CATEGORY_ORDER.find((c) => c.slug === category)
    if (!canonical) notFound()
  }

  const displayName =
    cat?.name || CATEGORY_ORDER.find((c) => c.slug === category)?.name || 'Category'
  const color = cat?.color || CATEGORY_ORDER.find((c) => c.slug === category)?.color || 'orange'

  const res = await fetchPublishedPosts({
    categorySlug: category,
    limit: 12,
    page,
  })
  const posts = res.docs.map(toCardProps)
  const bar = accentBar[color] ?? accentBar.orange

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:text-red-800">
          Home
        </Link>{' '}
        / <span className="text-slate-800">{displayName}</span>
      </nav>

      <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-8">
        <span className={`inline-block w-1.5 h-8 rounded ${bar}`} />
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
          {displayName}
        </h1>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <p className="text-lg">No stories in this category yet.</p>
          <Link href="/" className="mt-4 inline-block text-red-800 hover:underline">
            ← Back to home
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <NewsCard key={p.slug} {...p} variant="standard" />
            ))}
          </div>

          {res.totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              {page > 1 && (
                <Link
                  href={`/${category}?page=${page - 1}`}
                  className="px-4 py-2 border border-slate-300 rounded hover:bg-slate-100 text-sm font-semibold"
                >
                  ← Previous
                </Link>
              )}
              <span className="px-4 py-2 text-sm text-slate-600">
                Page {page} of {res.totalPages}
              </span>
              {page < res.totalPages && (
                <Link
                  href={`/${category}?page=${page + 1}`}
                  className="px-4 py-2 border border-slate-300 rounded hover:bg-slate-100 text-sm font-semibold"
                >
                  Next →
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
