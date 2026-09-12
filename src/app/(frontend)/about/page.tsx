import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'About Us — NZPMT Radio Spice',
  description:
    'About the New Zealand Punjabi Multimedia Trust (NZPMT) and Radio Spice — voice of the Punjabi community in Aotearoa New Zealand.',
}

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-red-800">Home</Link>
        {' / '}
        <span className="text-slate-800">About Us</span>
      </nav>

      {/* Page heading */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5 mb-8">
        <span className="inline-block w-1.5 h-10 rounded bg-red-700" />
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
            About NZPMT
          </h1>
          <p className="punjabi text-red-800 text-lg mt-1">
            ਨਿਊਜ਼ੀਲੈਂਡ ਵਿੱਚ ਵਸੇ ਪੰਜਾਬੀਆਂ ਦੀ ਆਵਾਜ਼
          </p>
        </div>
      </div>

      {/* Hero image + intro */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
        <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/wp-content/uploads/2025/04/WhatsApp-Image-2021-08-31-at-3.14.19-AM-1-1024x683.jpeg"
            alt="NZPMT community"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
          <p className="text-slate-700 leading-relaxed">
            <strong>New Zealand Punjabi Multimedia Trust (NZPMT)</strong> — trading as{' '}
            <strong>Radio Spice</strong> — is a community-focused news and media organisation
            serving the Punjabi diaspora in Aotearoa New Zealand.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Promoting Punjabi language, art, culture and sports activities within the wider
            New Zealand community via multimedia resources of TV, Radio and Print media.
          </p>
          <p className="text-slate-700 leading-relaxed">
            We are a <strong>charitable, voluntary and non-profitable trust</strong> dedicated to
            recognizing achievement and service of the people of Punjabi diaspora in New Zealand
            in the areas of Art, culture, sports, volunteering and excellence in community work
            for the betterment of all.
          </p>
        </div>
      </div>

      {/* Sub-pages nav */}
      <div className="flex gap-4 mb-10">
        <Link
          href="/about"
          className="bg-red-700 text-white font-semibold px-5 py-2 rounded-lg text-sm hover:bg-red-800 transition-colors"
        >
          About NZPMT
        </Link>
        <Link
          href="/about/trust"
          className="border border-red-700 text-red-800 font-semibold px-5 py-2 rounded-lg text-sm hover:bg-red-50 transition-colors"
        >
          About Trust &amp; Objectives
        </Link>
      </div>

      {/* What we do */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="inline-block w-1 h-6 bg-red-700 rounded" />
          What We Do
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[
            { icon: '📻', title: 'Radio', desc: 'Radio Spice broadcasts community news, music and cultural programmes.' },
            { icon: '📺', title: 'Television', desc: 'Khoj TV delivers visual storytelling for the Punjabi community.' },
            { icon: '📰', title: 'Print & Digital', desc: 'Online news across all categories — Breaking, India, Local, Sports.' },
            { icon: '🎭', title: 'Arts & Culture', desc: 'Celebrating Punjabi art, music, poetry and cultural heritage.' },
            { icon: '🏆', title: 'Community Awards', desc: 'Kiwi Punjabi Awards recognising excellence in sports, arts & volunteering.' },
            { icon: '🎨', title: 'Painting Competitions', desc: 'Annual NZ Punjabi painting competition for all age groups.' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:border-red-200 transition-colors">
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="inline-block w-1 h-6 bg-red-700 rounded" />
          Community Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { src: '/wp-content/uploads/2025/04/2-1.jpg', alt: 'NZPMT community event' },
            { src: '/wp-content/uploads/2025/04/2-copy-scaled-1-1024x682.jpg', alt: 'Community gathering' },
            { src: '/wp-content/uploads/2025/04/3.jpg', alt: 'Cultural event' },
            { src: '/wp-content/uploads/2025/08/535017872_1240655508102844_7745444021083411544_n-1024x768.jpg', alt: 'Janmashtami 2025' },
            { src: '/wp-content/uploads/2025/05/IMG_4636-1024x683.jpeg', alt: 'Radio Spice 16th Anniversary' },
            { src: '/wp-content/uploads/2025/12/489630107_1132448142256915_2874668154625279216_n-1024x683.jpg', alt: 'Family Picnic 2025' },
          ].map((img) => (
            <div key={img.src} className="relative h-40 rounded-lg overflow-hidden bg-slate-200">
              <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 50vw, 33vw" />
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-navy-900 text-white rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-5">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 text-slate-300 text-sm">
            <p>
              <span className="text-red-600 font-semibold">Address:</span><br />
              Suite 1, 129 Great South Road<br />
              Papatoetoe, Auckland, New Zealand
            </p>
            <p>
              <span className="text-red-600 font-semibold">Phone:</span>{' '}
              <a href="tel:021409622" className="hover:text-red-500">021 409 622</a>
            </p>
            <p>
              <span className="text-red-600 font-semibold">Email:</span>{' '}
              <a href="mailto:nzpunjabimultimedia@gmail.com" className="hover:text-red-500 break-all">
                nzpunjabimultimedia@gmail.com
              </a>
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-3">
              Editors and contributors can access the content management system to publish and manage stories.
            </p>
            <Link
              href="/admin"
              className="inline-block bg-red-700 hover:bg-red-800 text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors"
            >
              CMS Admin Panel →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
