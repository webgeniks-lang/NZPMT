import { getPayload } from 'payload'
import config from '@payload-config'

function getEmbedUrl(url: string): string {
  const watch = url.match(/youtube\.com\/watch\?v=([^&]+)/)
  const short = url.match(/youtu\.be\/([^?]+)/)
  const embed = url.match(/youtube\.com\/embed\/([^?]+)/)
  const id = watch?.[1] || short?.[1] || embed?.[1] || ''
  return `https://www.youtube.com/embed/${id}`
}

async function fetchWidgets() {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'sidebar-widgets',
    where: { active: { equals: true } },
    sort: 'order',
    limit: 20,
  })
  return res.docs
}

export default async function Sidebar() {
  const widgets = await fetchWidgets()
  if (!widgets.length) return null

  return (
    <aside className="flex flex-col gap-5">
      {widgets.map((w: any) => {
        if (w.type === 'youtube' && w.youtubeUrl) {
          return (
            <div key={w.id} className="rounded-xl overflow-hidden shadow border border-slate-100 bg-white">
              {w.youtubeTitle && (
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-800 line-clamp-2">{w.youtubeTitle}</p>
                </div>
              )}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={getEmbedUrl(w.youtubeUrl)}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={w.youtubeTitle || w.title}
                />
              </div>
            </div>
          )
        }

        if (w.type === 'image') {
          const imgUrl = w.imageUrl || (typeof w.image === 'object' ? w.image?.url : null)
          if (!imgUrl) return null
          const card = (
            <div className="rounded-xl overflow-hidden shadow border border-slate-100 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgUrl} alt={w.caption || w.title} className="w-full h-auto block" />
              {w.caption && (
                <p className="px-3 py-2 text-xs text-slate-500 text-center">{w.caption}</p>
              )}
            </div>
          )
          return w.linkUrl ? (
            <a key={w.id} href={w.linkUrl} target="_blank" rel="noreferrer noopener" className="block hover:opacity-90 transition-opacity">
              {card}
            </a>
          ) : (
            <div key={w.id}>{card}</div>
          )
        }

        return null
      })}
    </aside>
  )
}
