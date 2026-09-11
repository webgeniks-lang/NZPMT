import { getPayload } from 'payload'
import config from '@payload-config'
import type { NewsCardProps } from '@/components/NewsCard'
import { localImg } from '@/lib/imageUrl'

// Canonical category order for the homepage.
export const CATEGORY_ORDER = [
  { slug: 'breaking-news', name: 'Breaking News', color: 'orange' },
  { slug: 'india-news', name: 'India News', color: 'red' },
  { slug: 'international-news', name: 'International News', color: 'blue' },
  { slug: 'local-news', name: 'Local News', color: 'green' },
  { slug: 'sports-news', name: 'Sports News', color: 'purple' },
  { slug: 'weather', name: 'Weather', color: 'yellow' },
] as const

export type PostRecord = {
  id: string | number
  title: string
  slug: string
  excerpt?: string | null
  publishedAt?: string | null
  featuredImageUrl?: string | null
  featuredImage?:
    | {
        url?: string | null
        sizes?: Record<string, { url?: string | null }>
      }
    | string
    | number
    | null
  category?:
    | {
        id: string | number
        name: string
        slug: string
        color?: string
      }
    | string
    | number
    | null
  isFeatured?: boolean
  content?: unknown
  contentHtml?: string | null
  author?: string
}

function firstImageFromContent(content: unknown): string | null {
  if (!content) return null
  try {
    // Lexical stores rich text as JSON — walk for image URLs
    const walk = (node: any): string | null => {
      if (!node) return null
      if (Array.isArray(node)) {
        for (const n of node) {
          const r = walk(n)
          if (r) return r
        }
        return null
      }
      if (typeof node === 'object') {
        if (typeof node.src === 'string') return node.src
        if (typeof node.url === 'string' && /\.(jpg|jpeg|png|webp|gif)/i.test(node.url))
          return node.url
        for (const key of Object.keys(node)) {
          const r = walk(node[key])
          if (r) return r
        }
      }
      return null
    }
    return walk(content)
  } catch {
    return null
  }
}

function pickImageUrl(post: PostRecord): string | null {
  const raw = (() => {
    if (post.featuredImageUrl) return post.featuredImageUrl
    const fi = post.featuredImage
    if (fi && typeof fi === 'object') {
      const sized = fi.sizes?.card?.url || fi.sizes?.hero?.url || fi.sizes?.thumbnail?.url
      if (sized) return sized
      if (fi.url) return fi.url
    }
    return firstImageFromContent(post.content)
  })()
  return raw ? localImg(raw) : null
}

export function toCardProps(post: PostRecord): NewsCardProps {
  const cat = (post.category && typeof post.category === 'object' ? post.category : null) as
    | { name: string; slug: string; color?: string }
    | null
  return {
    title: post.title,
    slug: post.slug,
    category: cat?.name || 'News',
    categorySlug: cat?.slug || 'news',
    categoryColor: cat?.color || 'orange',
    excerpt: post.excerpt || undefined,
    publishedAt: post.publishedAt || undefined,
    imageUrl: pickImageUrl(post),
    isFeatured: !!post.isFeatured,
  }
}

export async function getPayloadClient() {
  return getPayload({ config })
}

export async function fetchPublishedPosts(opts: {
  limit?: number
  categorySlug?: string
  page?: number
} = {}) {
  const payload = await getPayloadClient()
  const where: any = { status: { equals: 'published' } }
  if (opts.categorySlug) {
    // Resolve category id from slug
    const catRes = await payload.find({
      collection: 'categories',
      where: { slug: { equals: opts.categorySlug } },
      limit: 1,
    })
    const cat = catRes.docs[0]
    if (!cat) return { docs: [], totalDocs: 0, totalPages: 0, page: 1 }
    where.category = { equals: cat.id }
  }
  const res = await payload.find({
    collection: 'posts',
    where,
    sort: '-publishedAt',
    limit: opts.limit ?? 12,
    page: opts.page ?? 1,
    depth: 1,
  })
  return res as unknown as {
    docs: PostRecord[]
    totalDocs: number
    totalPages: number
    page: number
  }
}

export async function fetchPostBySlug(categorySlug: string, slug: string) {
  const payload = await getPayloadClient()
  const catRes = await payload.find({
    collection: 'categories',
    where: { slug: { equals: categorySlug } },
    limit: 1,
  })
  const cat = catRes.docs[0]
  if (!cat) return null
  const res = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { status: { equals: 'published' } },
        { slug: { equals: slug } },
        { category: { equals: cat.id } },
      ],
    },
    limit: 1,
    depth: 2,
  })
  return (res.docs[0] as unknown as PostRecord) || null
}

export async function fetchCategoryBySlug(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return (
    (res.docs[0] as unknown as { name: string; slug: string; color?: string; description?: string }) ||
    null
  )
}
