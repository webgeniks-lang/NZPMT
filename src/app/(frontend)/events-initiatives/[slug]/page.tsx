import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function fetchEvent(slug: string) {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return res.docs[0] || null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ev = await fetchEvent(slug)
  if (!ev) return { title: 'Event Not Found' }
  return {
    title: `${ev.title} — NZPMT`,
    description: `Photo gallery for ${ev.title}`,
  }
}

export default async function EventGalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ev = await fetchEvent(slug)
  if (!ev) notFound()

  const photos: { imageUrl?: string | null; image?: { url?: string | null } | string | number | null; caption?: string | null }[] =
    (ev.photos as any[]) || []

  const resolveUrl = (photo: (typeof photos)[0]): string | null => {
    if (photo.imageUrl) return photo.imageUrl
    if (photo.image && typeof photo.image === 'object' && 'url' in photo.image) {
      return (photo.image as { url?: string | null }).url || null
    }
    return null
  }

  const validPhotos = photos.filter((p) => resolveUrl(p))

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-red-800">Home</Link>
        {' / '}
        <Link href="/events-initiatives" className="hover:text-red-800">Events &amp; Initiatives</Link>
        {' / '}
        <span className="text-slate-800">{ev.title}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start gap-3 border-b border-slate-200 pb-6 mb-8">
        <span className="inline-block w-1.5 h-10 rounded bg-red-700 mt-1 shrink-0" />
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="bg-red-700 text-white text-xs font-extrabold px-3 py-0.5 rounded-full">
              {ev.year}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
            {ev.title}
          </h1>
        </div>
      </div>

      {/* Cover image hero (if exists and we have photos) */}
      {ev.coverImageUrl && validPhotos.length === 0 && (
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow">
          <Image
            src={ev.coverImageUrl}
            alt={ev.title}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>
      )}

      {/* Photos grid */}
      {validPhotos.length > 0 ? (
        <div className="columns-2 sm:columns-3 md:columns-4 gap-3 space-y-3">
          {validPhotos.map((photo, i) => {
            const url = resolveUrl(photo)!
            return (
              <div key={i} className="break-inside-avoid rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow bg-white">
                <div className="relative w-full">
                  <Image
                    src={url}
                    alt={photo.caption || `${ev.title} — photo ${i + 1}`}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                {photo.caption && (
                  <p className="px-3 py-2 text-xs text-slate-500 leading-snug">{photo.caption}</p>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg font-medium mb-2">No photos yet</p>
          <p className="text-sm">
            Photos can be added in the{' '}
            <Link href="/admin/collections/events" className="text-red-800 hover:underline">
              admin panel
            </Link>
            .
          </p>
        </div>
      )}

      {/* Back link */}
      <div className="mt-12 pt-6 border-t border-slate-200">
        <Link
          href="/events-initiatives"
          className="inline-flex items-center gap-2 text-sm font-semibold text-red-800 hover:text-red-900"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Events
        </Link>
      </div>
    </div>
  )
}
