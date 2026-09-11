import '../globals.css'
import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AppDownloadPopup from '@/components/AppDownloadPopup'
import RadioPlayer from '@/components/RadioPlayer'

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <RadioPlayer />
        <AppDownloadPopup />
      </body>
    </html>
  )
}
