import Link from 'next/link'
import { notFound } from 'next/navigation'
import NewsCard from '@/components/NewsCard'
import RichText from '@/components/RichText'
import Sidebar from '@/components/Sidebar'
import {
  fetchCategoryBySlug,
  fetchPostBySlug,
  fetchPublishedPosts,
  toCardProps,
  type PostRecord,
} from '@/lib/posts'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Props {
  params: Promise<{ category: string; slug: string }>
}

function formatDateLong(iso?: string | null) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleString('en-NZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return ''
  }
}

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params
  const post = await fetchPostBySlug(category, slug)
  if (!post) return { title: 'Not found' }
  return {
    title: `${post.title} — NZPMT Radio Spice`,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.featuredImageUrl ? [post.featuredImageUrl] : undefined,
    },
  }
}

const EXTERNAL_DOMAINS = /https?:\/\/(www\.)?(nzpmt\.co\.nz|nzpmt\.org|news\.nzpmt\.org)/i

function getYoutubeEmbedUrl(url: string): string {
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/)
  const shortMatch = url.match(/youtu\.be\/([^?]+)/)
  const embedMatch = url.match(/youtube\.com\/embed\/([^?]+)/)
  const id = watchMatch?.[1] || shortMatch?.[1] || embedMatch?.[1] || ''
  return `https://www.youtube.com/embed/${id}`
}

function sanitizeHtml(html: string): string {
  // Remove href from <a> tags pointing to nzpmt external domains so no link navigates out.
  return html.replace(/(<a\s[^>]*?)href=["']([^"']*?)["']([^>]*>)/gi, (match, before, url, after) => {
    if (EXTERNAL_DOMAINS.test(url)) return `${before}${after}`
    return match
  })
}

function extractHtml(post: PostRecord): string | null {
  // Prefer legacy WordPress HTML (imported posts)
  const legacy = (post as any).contentHtml
  if (legacy && typeof legacy === 'string' && legacy.trim()) return sanitizeHtml(legacy)
  // Fallback: Lexical JSON content (new posts created in admin)
  const c: any = post.content
  if (!c) return null
  if (typeof c === 'string' && /<\w+/.test(c)) return sanitizeHtml(c)
  return null
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params
  const post = await fetchPostBySlug(category, slug)
  if (!post) notFound()

  const cat = await fetchCategoryBySlug(category)
  const catName = cat?.name || (typeof post.category === 'object' && post.category ? (post.category as any).name : 'News')
  const catColor = cat?.color || (typeof post.category === 'object' && post.category ? (post.category as any).color : 'orange')

  const relatedRes = await fetchPublishedPosts({ categorySlug: category, limit: 5 })
  const related = relatedRes.docs
    .filter((p) => p.slug !== slug)
    .slice(0, 4)
    .map(toCardProps)

  const html = extractHtml(post)
  const image = post.featuredImageUrl || null

  const badgeMap: Record<string, string> = {
    orange: 'bg-red-700 text-white',
    blue: 'bg-blue-600 text-white',
    green: 'bg-emerald-600 text-white',
    red: 'bg-red-800 text-white',
    purple: 'bg-purple-600 text-white',
    yellow: 'bg-yellow-500 text-slate-900',
  }
  const badge = badgeMap[catColor] || badgeMap.orange

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* ── Main article ─────────────────────────────────── */}
        <article className="min-w-0 flex-1">
          <nav className="text-sm text-slate-500 mb-4">
            <Link href="/" className="hover:text-red-800">Home</Link>{' '}
            /{' '}
            <Link href={`/${category}`} className="hover:text-red-800">{catName}</Link>{' '}
            / <span className="text-slate-800 line-clamp-1">{post.title}</span>
          </nav>

          <header className="mb-8">
            <span className={`inline-block text-xs uppercase font-bold px-2.5 py-1 rounded ${badge}`}>
              {catName}
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight text-slate-900">
              {post.title}
            </h1>
            <div className="mt-4 text-sm text-slate-500 flex items-center gap-3">
              <span>By {post.author || 'NZPMT Team'}</span>
              <span>•</span>
              <time>{formatDateLong(post.publishedAt)}</time>
            </div>
            {post.excerpt && (
              <p className="mt-5 text-lg text-slate-600 leading-relaxed border-l-4 border-red-700 pl-4">
                {post.excerpt}
              </p>
            )}
          </header>

          {image && (
            <figure className="mb-8 rounded-lg overflow-hidden bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={post.title} className="w-full h-auto" />
            </figure>
          )}

          <div className="punjabi">
            {html ? <RichText html={html} /> : <RichText content={post.content} />}
          </div>

          {(post as any).youtubeUrl && (
            <div className="mt-8">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={getYoutubeEmbedUrl((post as any).youtubeUrl)}
                  className="absolute inset-0 w-full h-full rounded-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`Video: ${post.title}`}
                />
              </div>
            </div>
          )}

          {related.length > 0 && (
            <section className="mt-14 border-t border-slate-200 pt-8">
              <h2 className="text-xl font-extrabold uppercase text-slate-900 mb-4">
                More {catName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((p) => (
                  <NewsCard key={p.slug} {...p} variant="standard" />
                ))}
              </div>
            </section>
          )}
        </article>

        {/* ── Right sidebar ─────────────────────────────────── */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </aside>

      </div>
    </div>
  )
}
