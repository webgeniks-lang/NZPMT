/**
 * Downloads the 6 new post images from nzpmt.co.nz and uploads them to Cloudflare R2.
 * Then updates the featuredImageUrl in the local DB to use the relative /wp-content/uploads/... path
 * so they resolve correctly via the Next.js rewrite (→ R2) in production.
 *
 * Run with: npx tsx src/scripts/upload-new-images-to-r2.ts
 */

import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { getPayload } from 'payload'
import config from '../payload.config'

const IMAGES = [
  {
    slug: 'gisborne-council-forestry-mediation',
    filename: 'WEBSITE-NEWS-6-990x557.jpg',
    srcUrl: 'https://nzpmt.co.nz/wp-content/uploads/2026/09/WEBSITE-NEWS-6-990x557.jpg',
  },
  {
    slug: 'brics-xi-jinping-uncomfortable-modi-asked',
    filename: 'WEBSITE-NEWS-7-990x557.jpg',
    srcUrl: 'https://nzpmt.co.nz/wp-content/uploads/2026/09/WEBSITE-NEWS-7-990x557.jpg',
  },
  {
    slug: 'fuel-prices-expected-to-rise-global-supply-conflict',
    filename: 'WEBSITE-NEWS-8-990x557.jpg',
    srcUrl: 'https://nzpmt.co.nz/wp-content/uploads/2026/09/WEBSITE-NEWS-8-990x557.jpg',
  },
  {
    slug: 'vision-nz-candidate-savan-jairy-epsom',
    filename: 'WEBSITE-NEWS-9-990x557.jpg',
    srcUrl: 'https://nzpmt.co.nz/wp-content/uploads/2026/09/WEBSITE-NEWS-9-990x557.jpg',
  },
  {
    slug: 'labour-support-declines-poll-ahead-national',
    filename: 'WEBSITE-NEWS-10-990x557.jpg',
    srcUrl: 'https://nzpmt.co.nz/wp-content/uploads/2026/09/WEBSITE-NEWS-10-990x557.jpg',
  },
  {
    slug: 'indian-passport-70-countries-visa-free',
    filename: 'WEBSITE-NEWS-11-990x557.jpg',
    srcUrl: 'https://nzpmt.co.nz/wp-content/uploads/2026/09/WEBSITE-NEWS-11-990x557.jpg',
  },
]

const R2_KEY_PREFIX = '2026/09' // path inside R2 bucket (mirrors /wp-content/uploads/2026/09/)

async function main() {
  console.log('\n=== Uploading new post images to Cloudflare R2 ===\n')

  const bucket = process.env.R2_BUCKET || 'nzpmt-media'
  const endpoint = process.env.R2_ENDPOINT
  const accessKeyId = process.env.R2_ACCESS_KEY_ID || ''
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || ''
  const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || ''

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    console.error('Missing R2 env vars. Copy .env.example → .env and fill in R2 credentials.')
    process.exit(1)
  }

  const s3 = new S3Client({
    credentials: { accessKeyId, secretAccessKey },
    region: 'auto',
    endpoint,
  })

  const payload = await getPayload({ config })

  for (const img of IMAGES) {
    const r2Key = `${R2_KEY_PREFIX}/${img.filename}`
    const relPath = `/wp-content/uploads/${r2Key}` // what gets stored in featuredImageUrl

    // Check if already uploaded
    try {
      await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: r2Key }))
      console.log(`  = Already in R2: ${r2Key}`)
    } catch {
      // Not found — download and upload
      console.log(`  ↓ Downloading: ${img.srcUrl}`)
      const response = await fetch(img.srcUrl)
      if (!response.ok) {
        console.warn(`  ! Failed to fetch ${img.srcUrl}: ${response.status}`)
        continue
      }
      const buffer = Buffer.from(await response.arrayBuffer())
      const contentType = response.headers.get('content-type') || 'image/jpeg'

      console.log(`  ↑ Uploading to R2: ${r2Key} (${(buffer.length / 1024).toFixed(0)} KB)`)
      await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: r2Key,
          Body: buffer,
          ContentType: contentType,
          CacheControl: 'public, max-age=31536000, immutable',
        }),
      )
      console.log(`  ✓ Uploaded: ${publicUrl}/${r2Key}`)
    }

    // Update the post's featuredImageUrl to use the relative /wp-content/uploads/... path
    const postRes = await payload.find({
      collection: 'posts',
      where: { slug: { equals: img.slug } },
      limit: 1,
    })
    const post = postRes.docs[0] as any
    if (!post) {
      console.warn(`  ! Post not found in DB: ${img.slug}`)
      continue
    }

    if (post.featuredImageUrl === relPath) {
      console.log(`  = DB already has R2 path for: ${img.slug}`)
      continue
    }

    await payload.update({
      collection: 'posts',
      id: post.id,
      data: { featuredImageUrl: relPath } as any,
    })
    console.log(`  ✎ Updated DB: ${img.slug} → ${relPath}`)
  }

  console.log('\n=== Done ===')
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
