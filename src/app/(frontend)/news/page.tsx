import BreakingTicker from '@/components/BreakingTicker'
import NewsCard from '@/components/NewsCard'
import CategorySection from '@/components/CategorySection'
import { CATEGORY_ORDER, fetchPublishedPosts, toCardProps } from '@/lib/posts'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'News — NZPMT Radio Spice',
  description: 'Latest Punjabi community news from New Zealand and around the world — NZPMT Radio Spice.',
}

export default async function NewsPage() {
  const latest = await fetchPublishedPosts({ limit: 7 })
  const latestCards = latest.docs.map(toCardProps)

  const breaking = await fetchPublishedPosts({ categorySlug: 'breaking-news', limit: 10 })
  const tickerItems = breaking.docs.map((p) => {
    const cat = typeof p.category === 'object' && p.category ? (p.category as any) : null
    return { title: p.title, slug: p.slug, categorySlug: cat?.slug || 'breaking-news' }
  })

  const sections = await Promise.all(
    CATEGORY_ORDER.map(async (c) => {
      const res = await fetchPublishedPosts({ categorySlug: c.slug, limit: 4 })
      return { ...c, posts: res.docs.map(toCardProps) }
    }),
  )

  const [heroCard, ...rest] = latestCards

  return (
    <>
      <BreakingTicker items={tickerItems} />

      <div className="max-w-7xl mx-auto px-4 pt-6 md:pt-8">
        {heroCard && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <NewsCard {...heroCard} variant="hero" />
            </div>
            <aside className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3 pb-3 mb-1 border-b border-slate-200">
                <span className="inline-block w-1.5 h-6 rounded bg-red-700" />
                <h2 className="text-lg font-extrabold uppercase text-slate-900">Latest Stories</h2>
              </div>
              <div className="divide-y divide-slate-100">
                {rest.slice(0, 5).map((post) => (
                  <NewsCard key={post.slug} {...post} variant="compact" />
                ))}
              </div>
            </aside>
          </section>
        )}

        {sections.map((s) => (
          <CategorySection key={s.slug} name={s.name} slug={s.slug} color={s.color} posts={s.posts} />
        ))}

        <div className="h-10" />
      </div>
    </>
  )
}
