import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Events & Initiatives — NZPMT Radio Spice',
  description:
    'NZPMT community events, cultural initiatives and past event galleries — NZ Punjabi Multimedia Trust.',
}

async function fetchEvents() {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'events',
    sort: '-year',
    limit: 200,
    depth: 0,
  })
  return res.docs
}

export default async function EventsPage() {
  const events = await fetchEvents()

  const yearOrder = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', 'Historical']
  const years = [...new Set(events.map((e) => e.year))].sort((a, b) => {
    const ai = yearOrder.indexOf(a)
    const bi = yearOrder.indexOf(b)
    if (ai === -1 && bi === -1) return b.localeCompare(a)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-red-800">Home</Link>
        {' / '}
        <span className="text-slate-800">Events &amp; Initiatives</span>
      </nav>

      <div className="flex items-center gap-3 border-b border-slate-200 pb-5 mb-10">
        <span className="inline-block w-1.5 h-10 rounded bg-red-700" />
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
            Events &amp; Initiatives
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Celebrating Punjabi community milestones in Aotearoa New Zealand since 2010.
          </p>
        </div>
      </div>

      {events.length === 0 && (
        <p className="text-slate-500 text-center py-20">No events found.</p>
      )}

      {years.map((year) => {
        const yearEvents = events.filter((e) => e.year === year)
        return (
          <section key={year} className="mb-14">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-red-700 text-white text-sm font-extrabold px-4 py-1 rounded-full">
                {year}
              </span>
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-slate-400 text-xs">
                {yearEvents.length} event{yearEvents.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {yearEvents.map((ev) => (
                <Link
                  key={ev.id}
                  href={`/events-initiatives/${ev.slug}`}
                  className="group block rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow bg-white"
                >
                  <div className="relative h-40 bg-slate-200 overflow-hidden">
                    {ev.coverImageUrl ? (
                      <Image
                        src={ev.coverImageUrl}
                        alt={ev.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100">
                        <span className="text-slate-400 text-xs">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-red-800 transition-colors leading-snug line-clamp-2">
                      {ev.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
