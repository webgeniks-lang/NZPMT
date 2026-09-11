/*
 * NZPMT seed script.
 *
 * Reads the WordPress WXR XML exports and imports categories + posts into
 * Payload's SQLite database. Uses regex-based extraction so no extra parser
 * dependency is required.
 *
 * Run with:  npm run seed
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Where the exported WordPress XML files live.
const EXPORT_DIR = path.resolve(__dirname, '../../../export')
const XML_FILES = [
  'nzpmt-radiospice.wordpress.2026-09-10.000.xml',
  'nzpmt-radiospice.wordpress.2026-09-10.001.xml',
  'nzpmt-radiospice.wordpress.2026-09-10.002.xml',
]

// Category slug -> friendly meta.
const CATEGORY_DEFS: Record<
  string,
  { name: string; color: string; order: number; description?: string }
> = {
  'breaking-news': {
    name: 'Breaking News',
    color: 'orange',
    order: 1,
    description: 'Urgent global news for the Punjabi community.',
  },
  'india-news': {
    name: 'India News',
    color: 'red',
    order: 2,
    description: 'News and stories from India.',
  },
  'international-news': {
    name: 'International News',
    color: 'blue',
    order: 3,
    description: 'World news for our community.',
  },
  'local-news': {
    name: 'Local News',
    color: 'green',
    order: 4,
    description: 'New Zealand local news.',
  },
  'sports-news': {
    name: 'Sports News',
    color: 'purple',
    order: 5,
    description: 'Sports coverage.',
  },
  weather: {
    name: 'Weather',
    color: 'yellow',
    order: 6,
    description: 'Weather updates.',
  },
}

// WordPress category slugs we accept. Anything else is skipped/mapped to breaking-news.
const ACCEPTED_SLUGS = new Set(Object.keys(CATEGORY_DEFS))

/* -------------------------------------------------------------------------- */
/* XML helpers                                                                */
/* -------------------------------------------------------------------------- */

function stripCdata(s: string): string {
  return s.replace(/^\s*<!\[CDATA\[/, '').replace(/\]\]>\s*$/, '')
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '—')
    .replace(/&#0*39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function firstMatch(s: string, re: RegExp): string | null {
  const m = s.match(re)
  return m ? m[1] : null
}

function extractItems(xml: string): string[] {
  const items: string[] = []
  const re = /<item>([\s\S]*?)<\/item>/g
  let m: RegExpExecArray | null
  while ((m = re.exec(xml)) !== null) {
    items.push(m[1])
  }
  return items
}

function stripHtml(html: string): string {
  return decodeEntities(
    html
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  )
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 96)
}

function pickThumbnailFromContent(html: string): string | null {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return m ? m[1] : null
}

interface WPItem {
  title: string
  slug: string
  contentHtml: string
  excerpt: string
  publishedAt: string | null
  status: string
  postType: string
  categorySlug: string | null
  featuredImage: string | null
  author: string | null
  postId: string | null
}

function parseItem(raw: string): WPItem | null {
  const cdata = /^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/

  const titleRaw = firstMatch(raw, /<title>([\s\S]*?)<\/title>/)
  const contentRaw = firstMatch(raw, /<content:encoded>([\s\S]*?)<\/content:encoded>/)
  const excerptRaw = firstMatch(raw, /<excerpt:encoded>([\s\S]*?)<\/excerpt:encoded>/)
  const postType = firstMatch(raw, /<wp:post_type>([\s\S]*?)<\/wp:post_type>/) || ''
  const status = firstMatch(raw, /<wp:status>([\s\S]*?)<\/wp:status>/) || ''
  const postDate = firstMatch(raw, /<wp:post_date_gmt>([\s\S]*?)<\/wp:post_date_gmt>/)
    || firstMatch(raw, /<wp:post_date>([\s\S]*?)<\/wp:post_date>/)
  const postName = firstMatch(raw, /<wp:post_name>([\s\S]*?)<\/wp:post_name>/) || ''
  const creator = firstMatch(raw, /<dc:creator>([\s\S]*?)<\/dc:creator>/)
  const postId = firstMatch(raw, /<wp:post_id>([\s\S]*?)<\/wp:post_id>/)

  const title = decodeEntities(stripCdata(titleRaw || '').trim())
  const contentHtml = stripCdata(contentRaw || '').trim()
  const excerptHtml = stripCdata(excerptRaw || '').trim()

  // Pull category (nicename) — prefer domain="category"
  let categorySlug: string | null = null
  const catRe = /<category domain="category" nicename="([^"]+)"[^>]*>[\s\S]*?<\/category>/g
  let cm: RegExpExecArray | null
  while ((cm = catRe.exec(raw)) !== null) {
    const slug = cm[1]
    if (ACCEPTED_SLUGS.has(slug)) {
      categorySlug = slug
      break
    }
    if (!categorySlug) categorySlug = slug
  }

  // Try to find a featured image in the content
  const featuredImage = pickThumbnailFromContent(contentHtml)

  // Author display name lookup — leave to raw login for now
  const author = creator ? decodeEntities(stripCdata(creator).trim()) : null

  // Normalize slug: if the WP post_name is percent-encoded (Punjabi titles), fall back to title-based slug
  let slug = decodeURIComponent(postName || '')
  slug = slugify(slug || title || postId || '')
  if (!slug) slug = `post-${postId || Date.now()}`

  // Normalize published date to ISO
  let publishedAt: string | null = null
  if (postDate) {
    const iso = postDate.replace(' ', 'T') + 'Z'
    const d = new Date(iso)
    if (!isNaN(d.getTime())) publishedAt = d.toISOString()
  }

  return {
    title,
    slug,
    contentHtml,
    excerpt: stripHtml(excerptHtml || contentHtml).slice(0, 300),
    publishedAt,
    status,
    postType: postType.trim(),
    categorySlug,
    featuredImage,
    author,
    postId,
  }
}

/* -------------------------------------------------------------------------- */
/* Payload seeding                                                            */
/* -------------------------------------------------------------------------- */

async function ensureCategories(payload: any) {
  const idBySlug: Record<string, string | number> = {}
  for (const [slug, def] of Object.entries(CATEGORY_DEFS)) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      idBySlug[slug] = existing.docs[0].id
      continue
    }
    const created = await payload.create({
      collection: 'categories',
      data: {
        name: def.name,
        slug,
        color: def.color,
        order: def.order,
        description: def.description,
      },
    })
    idBySlug[slug] = created.id
    console.log(`  + Category: ${def.name}`)
  }
  return idBySlug
}

async function ensureAdminUser(payload: any) {
  const email = 'admin@nzpmt.co.nz'
  const password = 'nzpmt-admin-2026'
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    console.log(`  = Admin user already exists (${email})`)
    return
  }
  await payload.create({
    collection: 'users',
    data: {
      email,
      password,
      name: 'NZPMT Admin',
      role: 'admin',
    },
  })
  console.log(`  + Admin user created — email: ${email}  password: ${password}`)
}

async function main() {
  console.log('\n=== NZPMT seed starting ===\n')

  console.log('Booting Payload...')
  const payload = await getPayload({ config })
  console.log('Payload ready.\n')

  console.log('Ensuring categories...')
  const catIdBySlug = await ensureCategories(payload)

  console.log('\nEnsuring admin user...')
  await ensureAdminUser(payload)

  // Collect items across all XML files
  const items: WPItem[] = []
  for (const file of XML_FILES) {
    const filePath = path.join(EXPORT_DIR, file)
    if (!fs.existsSync(filePath)) {
      console.warn(`  ! Missing XML: ${filePath} (skipping)`)
      continue
    }
    console.log(`\nReading ${file}...`)
    const xml = fs.readFileSync(filePath, 'utf-8')
    const raws = extractItems(xml)
    console.log(`  found ${raws.length} <item> blocks`)
    for (const raw of raws) {
      const item = parseItem(raw)
      if (!item) continue
      if (item.postType !== 'post') continue
      if (item.status !== 'publish') continue
      if (!item.title) continue
      items.push(item)
    }
  }

  console.log(`\nTotal publishable posts: ${items.length}`)

  // Dedupe by slug — attach counter for duplicates
  const usedSlugs = new Set<string>()
  const seenTitles = new Map<string, number>()
  let created = 0
  let skipped = 0
  let errors = 0

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    let slug = item.slug
    if (usedSlugs.has(slug)) {
      const n = (seenTitles.get(slug) || 1) + 1
      seenTitles.set(slug, n)
      slug = `${item.slug}-${n}`
      while (usedSlugs.has(slug)) {
        const nn = (seenTitles.get(item.slug) || 1) + 1
        seenTitles.set(item.slug, nn)
        slug = `${item.slug}-${nn}`
      }
    }
    usedSlugs.add(slug)

    // Skip if already in DB
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      skipped++
      continue
    }

    const catSlug =
      item.categorySlug && ACCEPTED_SLUGS.has(item.categorySlug)
        ? item.categorySlug
        : 'breaking-news'
    const categoryId = catIdBySlug[catSlug]

    try {
      await payload.create({
        collection: 'posts',
        data: {
          title: item.title,
          slug,
          status: 'published',
          publishedAt: item.publishedAt || new Date().toISOString(),
          category: categoryId,
          featuredImageUrl: item.featuredImage || undefined,
          excerpt: item.excerpt || undefined,
          // Store the raw HTML in `content` as a string. Our RichText renderer
          // detects HTML strings and renders them via dangerouslySetInnerHTML.
          content: item.contentHtml || undefined,
          author: item.author || 'NZPMT Team',
        } as any,
      })
      created++
    } catch (err: any) {
      errors++
      if (errors < 5) {
        console.warn(`  ! Failed to import "${item.title}": ${err.message || err}`)
      }
    }

    if ((i + 1) % 100 === 0) {
      console.log(`  ...processed ${i + 1}/${items.length}  (created=${created}, skipped=${skipped}, errors=${errors})`)
    }
  }

  console.log('\n=== Seed complete ===')
  console.log(`  Created: ${created}`)
  console.log(`  Skipped (already existed): ${skipped}`)
  console.log(`  Errors:  ${errors}`)
  console.log('\nAdmin login: http://localhost:3000/admin')
  console.log('  Email:    admin@nzpmt.co.nz')
  console.log('  Password: nzpmt-admin-2026')

  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
