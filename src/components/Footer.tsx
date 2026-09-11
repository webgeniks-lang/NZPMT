import Link from 'next/link'

const categories = [
  { label: 'Breaking News', href: '/breaking-news' },
  { label: 'India News', href: '/india-news' },
  { label: 'International News', href: '/international-news' },
  { label: 'Local News', href: '/local-news' },
  { label: 'Sports News', href: '/sports-news' },
  { label: 'Weather', href: '/weather' },
]

const pages = [
  { label: 'Events & Initiatives', href: '/events-initiatives' },
  { label: 'About NZPMT', href: '/about' },
  { label: 'About Trust', href: '/about/trust' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div>
          <h3 className="text-white text-xl font-extrabold">
            <span className="text-red-700">NZPMT</span> Radio Spice
          </h3>
          <p className="punjabi text-red-500 mt-2 text-sm">
            ਨਿਊਜ਼ੀਲੈਂਡ ਵਿੱਚ ਵਸੇ ਪੰਜਾਬੀਆਂ ਦੀ ਆਵਾਜ਼
          </p>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            New Zealand Punjabi Multimedia Trust — bringing you the latest news that matters
            to the Punjabi community in New Zealand and around the world.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Categories</h4>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="hover:text-red-600 transition-colors">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">About</h4>
          <ul className="space-y-2 text-sm">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="hover:text-red-600 transition-colors">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <address className="not-italic text-sm space-y-2 text-slate-400">
            <p>Suite 1, 129 Great South Road</p>
            <p>Papatoetoe, Auckland</p>
            <p>New Zealand</p>
            <p className="pt-2">
              <span className="text-slate-500">Phone:</span>{' '}
              <a href="tel:021409622" className="hover:text-red-600">
                021 409 622
              </a>
            </p>
            <p>
              <span className="text-slate-500">Email:</span>{' '}
              <a
                href="mailto:nzpunjabimultimedia@gmail.com"
                className="hover:text-red-600 break-all"
              >
                nzpunjabimultimedia@gmail.com
              </a>
            </p>
          </address>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Follow Us</h4>
          <ul className="flex gap-3">
            <li>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-700 flex items-center justify-center transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 22v-8h3l1-4h-4V7.5c0-1 .5-2 2-2h2V2s-1.8-.3-3.5-.3C10 1.7 8 4 8 7v3H5v4h3v8h5z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Twitter / X"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-700 flex items-center justify-center transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2H21l-6.52 7.45L22 22h-6.79l-4.73-6.19L4.6 22H2l7-8L2 2h6.91l4.28 5.66L18.244 2Zm-1.19 18h1.66L7.06 4H5.3l11.754 16Z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-700 flex items-center justify-center transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.16.56.55.9 1.11 1.16 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43-.26.66-.6 1.22-1.16 1.77-.55.56-1.11.9-1.77 1.16-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.16 4.9 4.9 0 0 1-1.16-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43a4.9 4.9 0 0 1 1.16-1.77 4.9 4.9 0 0 1 1.77-1.16c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6.5-.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p>© {year} New Zealand Punjabi Multimedia Trust. All rights reserved.</p>
          <p>
            Designed &amp; Managed by{' '}
            <a href="https://webgenik.co.nz" target="_blank" rel="noreferrer noopener" className="text-red-500 font-semibold hover:text-red-400">WebGenik</a>
            {' · '}
            <Link href="/admin" className="hover:text-red-600">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
