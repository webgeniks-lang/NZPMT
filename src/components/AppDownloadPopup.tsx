'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const STORAGE_KEY = 'radiospice_app_popup_dismissed'

export default function AppDownloadPopup() {
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (dismissed) return

    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    setIsMobile(mobile)

    const timer = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = (permanent = false) => {
    if (permanent) localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => dismiss(false)}
      />

      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md overflow-hidden z-10">
        {/* Header */}
        <div className="bg-red-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/20">
              <Image
                src="/wp-content/uploads/2025/04/banner1-1.png"
                alt="Radio Spice"
                fill
                className="object-contain p-1"
                sizes="40px"
              />
            </div>
            <div>
              <p className="text-white font-extrabold text-base leading-none">Radio Spice</p>
              <p className="text-white/80 text-xs mt-0.5">Download the app</p>
            </div>
          </div>
          <button
            onClick={() => dismiss(true)}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-slate-700 text-sm text-center mb-5">
            {isMobile
              ? 'Download the Radio Spice app and stay connected with your community!'
              : 'Scan the QR code to download the Radio Spice app on your phone.'}
          </p>

          {isMobile ? (
            /* Mobile: direct download buttons */
            <div className="flex flex-col gap-3">
              <a
                href="https://apps.apple.com/app/radio-spice"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-center gap-3 bg-black text-white rounded-xl px-5 py-3 font-semibold text-sm hover:bg-slate-800 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.78 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
                Download on App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.radiospice"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-center gap-3 bg-emerald-600 text-white rounded-xl px-5 py-3 font-semibold text-sm hover:bg-emerald-700 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" />
                </svg>
                Get it on Google Play
              </a>
            </div>
          ) : (
            /* Desktop: QR codes side by side */
            <div className="flex gap-4 justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-slate-200 bg-white p-1">
                  <Image
                    src="/apple.jpg"
                    alt="App Store QR Code"
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.78 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                  </svg>
                  App Store
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-slate-200 bg-white p-1">
                  <Image
                    src="/google.jpg"
                    alt="Google Play QR Code"
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" />
                  </svg>
                  Google Play
                </span>
              </div>
            </div>
          )}

          <button
            onClick={() => dismiss(true)}
            className="mt-5 w-full text-center text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            Don't show again
          </button>
        </div>
      </div>
    </div>
  )
}
