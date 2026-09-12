import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'About Trust — NZPMT Radio Spice',
  description: 'New Zealand Punjabi Multimedia Trust objectives and charitable trust information.',
}

const objectives = [
  'To broadcast, telecast and via print media recognize the achievement and service of Kiwis of Punjabi diaspora in the areas of Art, culture, language, sports, volunteering and community work in New Zealand.',
  'To establish Art, culture, sports and community multimedia awards for people of Punjabi diaspora New Zealand to encourage their participation and excellence in cultural, sports and community work.',
  'To cover the work of individuals, organizations, businesses in the Punjabi community to develop cohesive and integrated communities.',
  'To support individuals helping people of Punjabi diaspora to enjoy and participate in their chosen passion in New Zealand.',
  'To raise awareness of Punjabi culture, language, sports, volunteering among Kiwi Punjabis and advance their spirit of community development in New Zealand.',
  'To promote, establish, operate or maintain facilities for child, youth, elderly in Art, culture, sports, language programmes, skills and coaching training as may benefit the wider Punjabi community in New Zealand.',
  'To educate and promote the benefits of cultural participation and integration in sports to young people of Punjabi origin and those who are associated with sports and physical education in school, colleges, private institutions, clubs and universities.',
  'To provide scholarships and opportunities for training and participation in local, regional, national and international events to amateur sportsperson, cultural groups and individuals of Punjabi origin and teams.',
  'To encourage new migrants of Punjabi origin to participate in cultural, sports, volunteering and community work that will help them integrate in New Zealand through an orientation programme.',
  'To create, develop and promote community development programmes that are culturally and sensitively safe to all Punjabis in New Zealand.',
  'To utilize opportunities offered by various organizations in New Zealand to create, develop interest of Punjabis in what New Zealand has to offer in terms of sports, cultural and community development to work on wider outreach initiatives.',
  'To conduct and perform all such acts and deeds as are incidental or conducive to the attainment of our objectives.',
]

export default function AboutTrustPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-red-800">Home</Link>
        {' / '}
        <Link href="/about" className="hover:text-red-800">About Us</Link>
        {' / '}
        <span className="text-slate-800">About Trust</span>
      </nav>

      <div className="flex items-center gap-3 border-b border-slate-200 pb-5 mb-8">
        <span className="inline-block w-1.5 h-10 rounded bg-red-700" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
          About the Trust
        </h1>
      </div>

      {/* Sub-nav */}
      <div className="flex gap-4 mb-10">
        <Link href="/about" className="border border-red-700 text-red-800 font-semibold px-5 py-2 rounded-lg text-sm hover:bg-red-50 transition-colors">
          About NZPMT
        </Link>
        <Link href="/about/trust" className="bg-red-700 text-white font-semibold px-5 py-2 rounded-lg text-sm hover:bg-red-800 transition-colors">
          About Trust &amp; Objectives
        </Link>
      </div>

      {/* Gallery photos from trust page */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { src: 'https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev/2025/04/2-1.jpg', alt: 'NZPMT event 1' },
          { src: 'https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev/2025/04/2-copy-scaled-1-1024x682.jpg', alt: 'NZPMT event 2' },
          { src: 'https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev/2025/04/3.jpg', alt: 'NZPMT event 3' },
          { src: 'https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev/2025/04/WhatsApp-Image-2021-08-31-at-3.22.35-AM-1-1024x768.jpeg', alt: 'Community gathering' },
        ].map((img) => (
          <div key={img.src} className="relative h-32 rounded-lg overflow-hidden bg-slate-200">
            <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="25vw" />
          </div>
        ))}
      </div>

      {/* Trust description */}
      <section className="bg-red-50 border border-red-200 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">New Zealand Punjabi Multimedia Trust</h2>
        <p className="text-slate-700 leading-relaxed">
          The New Zealand Punjabi Multimedia Trust (NZPMT) is a charitable, voluntary and non-profitable
          trust established to encourage, promote and recognize achievement and service of the people of
          Punjabi diaspora in New Zealand in the areas of Art, culture, sports, volunteering and excellence
          in community work for the betterment of all.
        </p>
      </section>

      {/* Objectives list */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <span className="inline-block w-1 h-6 bg-red-700 rounded" />
          Key Objectives for Kiwi Punjabi Community Living in Aotearoa
        </h2>
        <ol className="space-y-4">
          {objectives.map((obj, i) => (
            <li key={i} className="flex gap-4 bg-white rounded-lg p-4 shadow-sm border border-slate-100">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-700 text-white text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-slate-700 text-sm leading-relaxed pt-1">{obj}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Contact box */}
      <div className="mt-10 bg-navy-900 text-white rounded-xl p-6">
        <h3 className="font-bold mb-3">Contact NZPMT</h3>
        <p className="text-slate-300 text-sm">
          Suite 1, 129 Great South Road, Papatoetoe, Auckland, New Zealand<br />
          <a href="tel:021409622" className="hover:text-red-500">021 409 622</a>
          {' · '}
          <a href="mailto:nzpunjabimultimedia@gmail.com" className="hover:text-red-500">
            nzpunjabimultimedia@gmail.com
          </a>
        </p>
      </div>
    </div>
  )
}
