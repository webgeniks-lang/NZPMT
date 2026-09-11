import Link from 'next/link'
import NewsCard, { NewsCardProps } from './NewsCard'

interface CategorySectionProps {
  name: string
  slug: string
  color?: string
  posts: Omit<NewsCardProps, 'variant'>[]
}

const accentBar: Record<string, string> = {
  orange: 'bg-red-700',
  blue: 'bg-blue-600',
  green: 'bg-emerald-600',
  red: 'bg-red-800',
  purple: 'bg-purple-600',
  yellow: 'bg-yellow-500',
}

export default function CategorySection({
  name,
  slug,
  color = 'orange',
  posts,
}: CategorySectionProps) {
  if (!posts?.length) return null
  const bar = accentBar[color] ?? accentBar.orange

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
        <div className="flex items-center gap-3">
          <span className={`inline-block w-1.5 h-6 rounded ${bar}`} />
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 uppercase tracking-tight">
            {name}
          </h2>
        </div>
        <Link
          href={`/${slug}`}
          className="text-sm text-red-800 hover:text-red-900 font-semibold whitespace-nowrap"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {posts.slice(0, 4).map((post) => (
          <NewsCard key={post.slug} {...post} variant="standard" />
        ))}
      </div>
    </section>
  )
}
