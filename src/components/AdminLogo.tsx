'use client'

export default function AdminLogo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
      <div style={{ background: '#fff', borderRadius: '12px', padding: '10px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://pub-95ed881ed6cd420d83a10facc6131c54.r2.dev/2025/04/radio.png"
          alt="Radio Spice"
          style={{ width: '160px', height: 'auto', display: 'block' }}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#fff', fontWeight: 800, fontSize: '18px', letterSpacing: '0.05em' }}>
          NZPMT Admin
        </div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '2px' }}>
          New Zealand Punjabi Multimedia Trust
        </div>
      </div>
    </div>
  )
}
