'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

const STREAM_URL = 'https://stream9.broadcast.co.nz:8000/radiospicewebsiteaudio.mp3'

export default function RadioPlayer() {
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'none'
    audioRef.current = audio

    audio.addEventListener('playing', () => { setPlaying(true); setLoading(false); setError(false) })
    audio.addEventListener('pause', () => setPlaying(false))
    audio.addEventListener('waiting', () => setLoading(true))
    audio.addEventListener('canplay', () => setLoading(false))
    audio.addEventListener('error', () => { setError(true); setLoading(false); setPlaying(false) })

    return () => { audio.pause(); audio.src = '' }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      audio.src = ''
    } else {
      setError(false)
      setLoading(true)
      audio.src = STREAM_URL
      audio.play().catch(() => { setError(true); setLoading(false) })
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Label — slides in when playing */}
      <div
        className={`
          flex items-center gap-2 bg-navy-900 text-white text-xs font-semibold
          px-3 py-2 rounded-full shadow-lg whitespace-nowrap
          transition-all duration-300
          ${playing ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
        `}
      >
        {/* Animated bars */}
        <span className="flex items-end gap-px h-3.5">
          {[10, 14, 8, 14, 10].map((h, i) => (
            <span
              key={i}
              className="w-px bg-red-600 rounded-full"
              style={{
                height: playing ? `${h}px` : '3px',
                animation: playing ? `pulse 0.8s ease-in-out ${i * 0.12}s infinite alternate` : 'none',
                transition: 'height 0.3s ease',
              }}
            />
          ))}
        </span>
        Radio Spice Live
      </div>

      {/* Main button */}
      <button
        onClick={toggle}
        aria-label={playing ? 'Pause Radio Spice' : 'Play Radio Spice Live'}
        className={`
          relative flex items-center gap-2.5 pl-1 pr-4 h-14 rounded-full shadow-xl
          transition-all duration-200 active:scale-95
          ${error ? 'bg-red-700 hover:bg-red-800' : 'bg-red-700 hover:bg-red-800'}
        `}
      >
        {/* Pulse ring */}
        {playing && (
          <span className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-20" />
        )}

        {/* Radio Spice logo circle */}
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white shrink-0 shadow-inner">
          <Image
            src="/wp-content/uploads/2025/04/banner1-1.png"
            alt="Radio Spice"
            fill
            className="object-contain p-1.5"
            sizes="48px"
          />
        </div>

        {/* Icon */}
        <span className="shrink-0">
          {loading ? (
            <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : error ? (
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 4v5h5M20 20v-5h-5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.93 15A9 9 0 1115 4.93" strokeLinecap="round" />
            </svg>
          ) : playing ? (
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <rect x="5" y="4" width="4" height="16" rx="1.5" />
              <rect x="15" y="4" width="4" height="16" rx="1.5" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          )}
        </span>
      </button>

      <style jsx>{`
        @keyframes pulse {
          from { height: 3px; }
          to { height: var(--h); }
        }
      `}</style>
    </div>
  )
}
