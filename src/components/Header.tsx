'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const nav = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'About NZPMT', href: '/about' },
      { label: 'About Trust', href: '/about/trust' },
    ],
    badge: false,
  },
  { label: 'Events', href: '/events-initiatives', badge: false },
  { label: 'News', href: '/news', badge: false },
  { label: 'Breaking News', href: '/breaking-news', badge: true },
  { label: 'India News', href: '/india-news', badge: false },
  { label: 'International', href: '/international-news', badge: false },
  { label: 'Local News', href: '/local-news', badge: false },
  { label: 'Sports', href: '/sports-news', badge: false },
  { label: 'Weather', href: '/weather', badge: false },
]


export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname?.startsWith(href + '/')
  }

  return (
    <header className="sticky top-0 z-40 shadow-md">
      {/* Top brand bar */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <div className="bg-white rounded-xl px-3 py-1.5 shadow-sm shrink-0">
              <Image
                src="/wp-content/uploads/2025/04/radio.png"
                alt="Radio Spice"
                width={130}
                height={70}
                className="object-contain"
                priority
              />
            </div>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="text-2xl font-extrabold tracking-tight text-white">NZPMT</span>
              <span className="text-base font-semibold text-white/70">Radio Spice</span>
            </span>
          </Link>
          <div className="hidden md:block text-right">
            <p className="text-xs text-white/70">New Zealand Punjabi Multimedia Trust</p>
            <p className="punjabi text-sm text-red-500">
              ਨਿਊਜ਼ੀਲੈਂਡ ਵਿੱਚ ਵਸੇ ਪੰਜਾਬੀਆਂ ਦੀ ਆਵਾਜ਼
            </p>
          </div>
          <button
            aria-label="Open menu"
            className="md:hidden p-2 rounded hover:bg-white/10"
            onClick={() => setOpen(!open)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop navigation */}
      <nav className="bg-white border-b border-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-1 overflow-x-auto">
            {nav.map((item) => {
              const active = isActive(item.href)
              if (item.children) {
                return (
                  <li key={item.href} className="relative group">
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-1 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                        active
                          ? 'text-red-800 border-red-700'
                          : 'text-slate-700 border-transparent hover:text-red-800 hover:border-red-500'
                      }`}
                    >
                      {item.label}
                    </Link>
                    <div className="absolute top-full left-0 bg-white shadow-lg border border-slate-100 rounded-b-lg min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-red-50 hover:text-red-800 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </li>
                )
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-block px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                      active
                        ? 'text-red-800 border-red-700'
                        : 'text-slate-700 border-transparent hover:text-red-800 hover:border-red-500'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <nav className="md:hidden bg-white border-b border-slate-200">
          <ul className="flex flex-col">
            {nav.map((item) => {
              const active = isActive(item.href)
              if (item.children) {
                return (
                  <li key={item.href} className="border-b border-slate-100">
                    <button
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold ${
                        active ? 'text-red-800 bg-red-50' : 'text-slate-700'
                      }`}
                      onClick={() => setAboutOpen(!aboutOpen)}
                    >
                      {item.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d={aboutOpen ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {aboutOpen && (
                      <ul className="bg-slate-50 pl-8">
                        {item.children.map((child) => (
                          <li key={child.href} className="border-t border-slate-100">
                            <Link
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className="block px-4 py-2.5 text-sm text-slate-600 hover:text-red-800"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              }
              return (
                <li key={item.href} className="border-b border-slate-100">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 text-sm font-semibold ${
                      active ? 'text-red-800 bg-red-50' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}
