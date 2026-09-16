/**
 * Import new posts published on nzpmt.co.nz after the September 10 WordPress export.
 * Run with: npx tsx src/scripts/import-new-posts.ts
 */

import { getPayload } from 'payload'
import config from '../payload.config'

const NEW_POSTS = [
  {
    title: 'ਜੰਗਲਾਤ ਖੇਤਰ ਅਤੇ ਗਿਸਬੋਰਨ ਕੌਂਸਲ ਦੇ ਨੁਮਾਇੰਦਿਆਂ ਵਿਚਕਾਰ ਵਿਚੋਲਗੀ ਬੈਠਕ',
    slug: 'gisborne-council-forestry-mediation',
    categorySlug: 'local-news',
    publishedAt: '2026-09-13T00:00:00.000Z',
    featuredImageUrl: 'https://nzpmt.co.nz/wp-content/uploads/2026/09/WEBSITE-NEWS-6-990x557.jpg',
    excerpt:
      'A mediation session took place between representatives of the forestry sector and Gisborne Council, allowing both parties to present their positions and seek mutually acceptable resolutions.',
    contentHtml: `<p>A mediation session took place between representatives of the forestry sector and Gisborne Council.</p>
<p>The mediation process allowed both parties to present their positions and seek mutually acceptable resolutions. However, it was not clarified whether any agreement was reached during the discussions.</p>`,
    author: 'RadioSpice',
  },
  {
    title: "BRICS ਸੰਬੋਧਨ ਦੌਰਾਨ ਸ਼ੀ ਜਿਨਪਿੰਗ ਅਸਹਿਜ ਨਜ਼ਰ ਆਏ—ਮੋਦੀ ਨੇ ਭਾਸ਼ਣ ਰੋਕ ਕੇ ਪੁੱਛਿਆ, 'ਸਭ ਠੀਕ ਹੈ?'",
    slug: 'brics-xi-jinping-uncomfortable-modi-asked',
    categorySlug: 'international-news',
    publishedAt: '2026-09-14T00:00:00.000Z',
    featuredImageUrl: 'https://nzpmt.co.nz/wp-content/uploads/2026/09/WEBSITE-NEWS-7-990x557.jpg',
    excerpt:
      "During a BRICS address, Chinese President Xi Jinping appeared uncomfortable, prompting PM Modi to pause his remarks and ask 'Is everything okay?' Xi subsequently did not attend the formal state dinner.",
    contentHtml: `<p>According to Economic Times, during a BRICS address, Chinese President Xi Jinping appeared uncomfortable, prompting Indian Prime Minister Narendra Modi to pause his remarks and inquire about his wellbeing.</p>
<p>The report notes that Xi subsequently did not attend the formal state dinner. However, the publication cautions against drawing definitive conclusions about health or connections between these two separate events.</p>`,
    author: 'RadioSpice',
  },
  {
    title: "ਈਂਧਨ ਦੀਆਂ ਕੀਮਤਾਂ ਹੋਰ ਵਧਣ ਦਾ ਖ਼ਦਸ਼ਾ—ਵਿਸ਼ਵ ਪੱਧਰੀ ਸਪਲਾਈ 'ਤੇ ਟਕਰਾਅ ਦਾ ਦਬਾਅ",
    slug: 'fuel-prices-expected-to-rise-global-supply-conflict',
    categorySlug: 'international-news',
    publishedAt: '2026-09-14T06:00:00.000Z',
    featuredImageUrl: 'https://nzpmt.co.nz/wp-content/uploads/2026/09/WEBSITE-NEWS-8-990x557.jpg',
    excerpt:
      'International conflicts are creating pressure on global fuel supply chains. Fuel costs are expected to continue rising, affecting commuters, taxi services, delivery operations, and transportation businesses.',
    contentHtml: `<p>International conflicts are creating pressure on global fuel supply chains. According to 1News, fuel costs are expected to continue rising.</p>
<p>Should prices increase further, daily commuters alongside taxi services, delivery operations, and transportation businesses may face escalating expenses.</p>`,
    author: 'RadioSpice',
  },
  {
    title: 'Vision NZ Announces New Zealand Candidate After Renouncing Indian Passport',
    slug: 'vision-nz-candidate-savan-jairy-epsom',
    categorySlug: 'local-news',
    publishedAt: '2026-09-15T00:00:00.000Z',
    featuredImageUrl: 'https://nzpmt.co.nz/wp-content/uploads/2026/09/WEBSITE-NEWS-9-990x557.jpg',
    excerpt:
      "Vision New Zealand has selected Savan Jairy, an India-born IT professional, as its candidate for the Epsom electorate. Jairy has renounced his Indian passport and considers himself fully committed to New Zealand: 'Now I am a Kiwi.'",
    contentHtml: `<p>Vision New Zealand has selected Savan Jairy, an India-born IT professional, as its candidate for the Epsom electorate. Party leader Hannah Tamaki emphasized that Jairy has renounced his Indian passport and fully integrated into New Zealand society.</p>
<p>Jairy arrived in 2011 and has over 17 years of technology and logistics experience, having held senior positions with major corporations including Fonterra and IBM. He stated his primary motivation: "I want to be a bridge between my Indian community and Vision New Zealand."</p>
<p>The candidacy aligns with Vision NZ's immigration policies, which advocate extending residency requirements to 10 years for citizenship and eliminating dual citizenship for new applicants. Party co-founder Brian Tamaki has made sharp immigration critiques in recent months.</p>
<p>Jairy noted that he now requires a visa to visit India and considers himself fully committed to New Zealand: "Now I am a Kiwi."</p>`,
    author: 'RadioSpice',
  },
  {
    title: 'ਨਵੇਂ ਪੋਲ ਵਿੱਚ Labour ਦੀ ਹਮਾਇਤ ਘਟੀ, ਫਿਰ ਵੀ National ਤੋਂ ਅੱਗੇ',
    slug: 'labour-support-declines-poll-ahead-national',
    categorySlug: 'local-news',
    publishedAt: '2026-09-15T06:00:00.000Z',
    featuredImageUrl: 'https://nzpmt.co.nz/wp-content/uploads/2026/09/WEBSITE-NEWS-10-990x557.jpg',
    excerpt:
      "A recent polling survey shows Labour Party's popularity has declined. Despite this decrease in support, the party maintains a lead over its primary rival, the National Party, ahead of upcoming elections.",
    contentHtml: `<p>A recent polling survey shows that Labour's popularity has declined. Despite this decrease in support, the party maintains a lead over its primary rival, the National Party.</p>
<p>The polling results arrive ahead of upcoming elections and suggest intensifying competition between these two major political forces. While polls reflect current public sentiment, final election outcomes may differ significantly from poll predictions.</p>`,
    author: 'RadioSpice',
  },
  {
    title: 'ਭਾਰਤੀ ਪਾਸਪੋਰਟ ਦੀ ਵਧੀ ਤਾਕਤ—70 ਦੇਸ਼ਾਂ ਦੀ ਯਾਤਰਾ ਹੋਈ ਹੋਰ ਆਸਾਨ',
    slug: 'indian-passport-70-countries-visa-free',
    categorySlug: 'international-news',
    publishedAt: '2026-09-16T00:00:00.000Z',
    featuredImageUrl: 'https://nzpmt.co.nz/wp-content/uploads/2026/09/WEBSITE-NEWS-11-990x557.jpg',
    excerpt:
      'Indian passport holders now enjoy expanded international access — 25 nations visa-free, 40 countries visa-on-arrival, and 5 more with electronic travel authorization, totalling 70 destinations with streamlined procedures.',
    contentHtml: `<p>Indian passport holders now enjoy expanded international access. According to September 2026 passport rankings, citizens can enter 25 nations without prior visa requirements.</p>
<p>An additional 40 countries permit visa-on-arrival approval, while 5 more nations require electronic travel authorization or online pre-registration. Collectively, this provides access to 70 destinations with streamlined procedures.</p>
<p>However, travelers should verify current visa regulations and entry requirements before booking tickets to ensure compliance with each country's latest policies.</p>`,
    author: 'RadioSpice',
  },
]

async function main() {
  console.log('\n=== Importing new posts (post-Sep-10 2026) ===\n')

  const payload = await getPayload({ config })

  // Resolve category IDs once
  const catIdBySlug: Record<string, string | number> = {}
  for (const slug of ['local-news', 'international-news', 'breaking-news', 'india-news']) {
    const res = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (res.docs[0]) catIdBySlug[slug] = res.docs[0].id
  }

  let created = 0
  let skipped = 0

  for (const post of NEW_POSTS) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      console.log(`  = Already exists: ${post.slug}`)
      skipped++
      continue
    }

    const categoryId = catIdBySlug[post.categorySlug]
    if (!categoryId) {
      console.warn(`  ! Category not found: ${post.categorySlug} — skipping "${post.title}"`)
      continue
    }

    await payload.create({
      collection: 'posts',
      data: {
        title: post.title,
        slug: post.slug,
        status: 'published',
        publishedAt: post.publishedAt,
        category: categoryId,
        featuredImageUrl: post.featuredImageUrl,
        excerpt: post.excerpt,
        contentHtml: post.contentHtml,
        author: post.author,
      } as any,
    })

    console.log(`  + Created: ${post.slug}`)
    created++
  }

  console.log(`\n=== Done — created: ${created}, skipped (already existed): ${skipped} ===`)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
