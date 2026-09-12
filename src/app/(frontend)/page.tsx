import Image from 'next/image'
import Link from 'next/link'
import BreakingTicker from '@/components/BreakingTicker'
import { fetchPublishedPosts } from '@/lib/posts'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const platforms = [
  { name: 'Radio Spice', img: 'https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev/2025/04/banner1-1.png', desc: 'Community Radio' },
  { name: 'Kiwi TV', img: 'https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev/2025/04/banner2.png', desc: 'Videography & Events' },
  { name: 'Punjab to Aotearoa', img: 'https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev/2025/04/banner3.png', desc: 'Migration & Settlement' },
  { name: 'Virsa Academy', img: 'https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev/2025/04/banner-4.png', desc: 'Arts & Culture' },
  { name: 'NZ Punjabi Volunteers', img: 'https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev/2025/04/banner5.png', desc: 'Helping Communities' },
]

const recentEvents = [
  { title: 'NZ Painting Competition 2026', img: 'https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev/2026/08/DSC09021.jpg', href: '/events-initiatives' },
  { title: 'Sufi Mehfil 2026', img: 'https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev/2026/08/0N6A9794-1024x683.jpg', href: '/events-initiatives' },
  { title: 'Family Fun Day 2026', img: 'https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev/2026/02/ku9R0gvA-1024x683.jpeg', href: '/events-initiatives' },
  { title: 'Sufi Night 2025', img: 'https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev/2026/01/537181725_1243841764450885_7792337148379712437_n-1024x683.jpg', href: '/events-initiatives' },
]

export default async function HomePage() {
  const breaking = await fetchPublishedPosts({ categorySlug: 'breaking-news', limit: 8 })
  const tickerItems = breaking.docs.map((p) => {
    const cat = typeof p.category === 'object' && p.category ? (p.category as any) : null
    return { title: p.title, slug: p.slug, categorySlug: cat?.slug || 'breaking-news' }
  })

  return (
    <>
      <BreakingTicker items={tickerItems} />

      {/* ── NZPMT Trust Emblem & Org Chart ────────────────────────────── */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">

          {/* Emblem */}
          <div className="flex justify-center mb-4">
            <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden bg-white shadow-md border-2 border-transparent">
              <Image
                src="https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev/2025/04/nzpmt-emblem-circle.png"
                alt="NZPMT Emblem"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 240px"
                priority
              />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-800 text-white font-bold text-sm md:text-base px-8 py-2 rounded-full shadow-md mb-3">
            NZ PUNJABI MULTI MEDIA TRUST
          </div>

          {/* Arrow */}
          <div className="flex justify-center mb-6">
            <svg width="24" height="32" viewBox="0 0 24 32" fill="none" className="text-red-800">
              <path d="M12 0v24M4 18l8 10 8-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Platform logos */}
          <div className="flex flex-nowrap justify-center gap-6 md:gap-10">
            {platforms.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-3 group">
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden bg-white shadow-md group-hover:shadow-lg transition-shadow border-2 border-transparent group-hover:border-red-600">
                  <Image src={p.img} alt={p.name} fill className="object-contain p-1" sizes="(max-width: 768px) 144px, 176px" />
                </div>
                <span className="text-sm text-slate-600 font-medium text-center leading-tight max-w-[120px]">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Vision ────────────────────────────────────────────────── */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Community photo */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev/2025/04/community-vision.png"
                alt="Working with the community"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="bg-red-700 text-white text-center py-3 px-4">
                <p className="font-bold text-sm tracking-wide">Working With the Community, For the Community</p>
              </div>
            </div>

            {/* Vision text */}
            <div>
              <p className="text-red-700 text-sm font-semibold uppercase tracking-widest mb-2">Our Vision</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 leading-snug">
                New Zealand Punjabi<br />Multimedia Trust
              </h2>
              <p className="punjabi text-red-800 text-xl mb-5 leading-relaxed">
                ਨਿਊਜ਼ੀਲੈਂਡ ਵਿੱਚ ਵਸੇ ਪੰਜਾਬੀਆਂ ਦੀ ਆਵਾਜ਼ ਅਤੇ ਅੰਦਾਜ਼
              </p>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
                <p>
                  Promoting Punjabi language, art, culture and sports activities within the wider New
                  Zealand community via multimedia resources of TV, Radio and Print media.
                </p>
                <p>
                  New Zealand Punjabi Multimedia Trust (NZPMT) is a <strong>charitable, voluntary and
                  non-profitable trust</strong> to encourage, promote and recognize achievement and service
                  of the people of Punjabi diaspora in New Zealand in the areas of Art, culture, sports,
                  volunteering and excellence in community work for the betterment of all.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/about" className="bg-red-700 hover:bg-red-800 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors">
                  About Us
                </Link>
                <Link href="/about/trust" className="border border-red-700 text-red-800 hover:bg-red-50 font-bold px-6 py-2.5 rounded-lg text-sm transition-colors">
                  About Trust
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Objectives ────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 text-center mb-8 uppercase tracking-wide">
            Our Key Objectives for Kiwi Punjabi Community Living in Aotearoa
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-xl overflow-hidden shadow">
              <Image
                src="https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev/2025/04/Untitled-design21.png"
                alt="NZPMT Key Objectives — Broadcast, Recognize, Support, Awareness"
                width={700}
                height={780}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '📡', title: 'Broadcast', desc: 'Cover the achievements & activities of the Punjabi community in NZ.' },
                { icon: '🏆', title: 'Recognize', desc: 'Excellence in cultural sports & community works.' },
                { icon: '🤝', title: 'Support', desc: 'To connect with their heritage & culture.' },
                { icon: '📢', title: 'Awareness', desc: 'Of Punjabi culture & language.' },
                { icon: '🎨', title: 'Arts & Culture', desc: 'Promote Punjabi language, art and cultural identity in Aotearoa.' },
                { icon: '👥', title: 'Community', desc: 'Build cohesive and integrated Punjabi communities across NZ.' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:border-red-500 transition-colors">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Events & Initiatives ──────────────────────────────────────── */}
      <section className="bg-white py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="inline-block w-1.5 h-8 rounded bg-red-700" />
              <h2 className="text-2xl font-extrabold uppercase text-slate-900">Events &amp; Initiatives</h2>
            </div>
            <Link href="/events-initiatives" className="text-sm font-semibold text-red-800 hover:text-red-900 border border-red-700 px-4 py-1.5 rounded hover:bg-red-50 transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recentEvents.map((ev) => (
              <Link key={ev.title} href={ev.href} className="group block overflow-hidden rounded-xl shadow hover:shadow-md transition-shadow">
                <div className="relative h-44 bg-slate-200 overflow-hidden">
                  <Image src={ev.img} alt={ev.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 50vw, 25vw" />
                </div>
                <div className="bg-white p-3">
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-red-800 transition-colors leading-snug">{ev.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community Photo Banner ────────────────────────────────────── */}
      <section className="relative h-96 md:h-[520px] overflow-hidden">
        <Image
          src="https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev/2025/04/WhatsApp-Image-2021-08-31-at-3.14.19-AM-1-1024x683.jpeg"
          alt="NZPMT community"
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-900/60 flex flex-col items-center justify-center text-center px-4">
          <p className="text-red-500 text-sm font-semibold uppercase tracking-widest mb-2">Join Our Community</p>
          <h3 className="text-white text-2xl md:text-3xl font-extrabold mb-4">
            ਨਿਊਜ਼ੀਲੈਂਡ ਵਿੱਚ ਵਸੇ ਪੰਜਾਬੀਆਂ ਦੀ ਆਵਾਜ਼
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/news" className="bg-red-700 hover:bg-red-800 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors">
              Read the News
            </Link>
            <Link href="/events-initiatives" className="border border-white text-white hover:bg-white/10 font-bold px-6 py-2.5 rounded-lg text-sm transition-colors">
              See Our Events
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
