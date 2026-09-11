import { getPayload } from 'payload'
import config from '@payload-config'

const events = [
  { year: '2026', title: 'NZ Painting Competition 2026', slug: 'nz-painting-competition-2026', coverImageUrl: '/wp-content/uploads/2026/08/DSC09021.jpg' },
  { year: '2026', title: 'Sufi Mehfil 2026', slug: 'sufi-mehfil-2026', coverImageUrl: '/wp-content/uploads/2026/08/0N6A9794-1024x683.jpg' },
  { year: '2026', title: 'Family Fun Day 2026', slug: 'family-fun-day-2026', coverImageUrl: '/wp-content/uploads/2026/02/ku9R0gvA-1024x683.jpeg' },
  { year: '2025', title: 'NZ Punjab Day 2025', slug: 'nz-punjab-day-2025', coverImageUrl: '/wp-content/uploads/2025/11/DSC00098-1-1024x767.jpg' },
  { year: '2025', title: 'Sufi Night 2025', slug: 'sufi-night-2025', coverImageUrl: '/wp-content/uploads/2026/01/537181725_1243841764450885_7792337148379712437_n-1024x683.jpg' },
  { year: '2025', title: 'Janmashtami 2025', slug: 'janmashtami-2025', coverImageUrl: '/wp-content/uploads/2025/08/535017872_1240655508102844_7745444021083411544_n-1024x768.jpg' },
  { year: '2025', title: 'India 79th Independence Day 2025', slug: 'india-independence-day-2025', coverImageUrl: '/wp-content/uploads/2025/08/534495667_1240652588103136_4435254371379744823_n-1024x473.jpg' },
  { year: '2025', title: 'Indian Food Festival 2025', slug: 'indian-food-festival-2025', coverImageUrl: '/wp-content/uploads/2025/08/534528626_1241000801401648_3443670892847263584_n-1024x577.jpg' },
  { year: '2025', title: 'Family Picnic 2025', slug: 'family-picnic-2025', coverImageUrl: '/wp-content/uploads/2025/12/489630107_1132448142256915_2874668154625279216_n-1024x683.jpg' },
  { year: '2025', title: 'NZ 5th Painting Competition', slug: 'nz-5th-painting-competition', coverImageUrl: '/wp-content/uploads/2025/07/IMG_5943-1-1024x559.jpeg' },
  { year: '2025', title: 'RadioSpice 16th Anniversary', slug: 'radiospice-16th-anniversary', coverImageUrl: '/wp-content/uploads/2025/05/IMG_4636-1024x683.jpeg' },
  { year: '2025', title: 'Punjab To Aotearoa — Part 1 Auckland Screening', slug: 'punjab-to-aotearoa-part-1', coverImageUrl: '/wp-content/uploads/2025/06/IMG_5406-1024x683.jpeg' },
  { year: '2025', title: 'Punjab To Aotearoa — Part 2 Auckland Screening', slug: 'punjab-to-aotearoa-part-2', coverImageUrl: '/wp-content/uploads/2025/06/IMG_5435-1-1024x837.jpeg' },
  { year: '2025', title: 'NZ 4th Painting Competition', slug: 'nz-4th-painting-competition', coverImageUrl: '/wp-content/uploads/2025/08/Screenshot-2024-09-13-at-1.09.25-PM-1024x578.png' },
  { year: '2023', title: 'Vaisakhi Celebration 2023', slug: 'vaisakhi-celebration-2023', coverImageUrl: '/wp-content/uploads/2025/12/482272605_1106253071543089_3969264954942272800_n-1024x683.jpg' },
  { year: '2020', title: 'Lohri Celebration 2020', slug: 'lohri-celebration-2020', coverImageUrl: '/wp-content/uploads/2025/12/113595060_3490094771042799_7931678645330363969_n-1024x768.jpg' },
  { year: '2019', title: '3rd Kiwi Punjabi Awards Night 2019', slug: 'kiwi-punjabi-awards-2019', coverImageUrl: '/wp-content/uploads/2025/04/Screenshot-2025-04-23-at-8.37.08%20PM.png' },
  { year: '2016', title: 'Radio Spice Covered The Marae Event 2016', slug: 'marae-event-2016', coverImageUrl: '/wp-content/uploads/2025/04/Screenshot-2025-04-23-at-8.37.14%20PM.png' },
  { year: 'Historical', title: '6th Hind Pak Sufi Mehfil', slug: '6th-hind-pak-sufi-mehfil', coverImageUrl: '/wp-content/uploads/2025/12/487793003_1126406032861126_3994489441649842236_n-1024x768.jpg' },
  { year: 'Historical', title: 'Artist in Our Studio', slug: 'artist-in-our-studio', coverImageUrl: '/wp-content/uploads/2025/12/511125369_24375936572031981_3687364042849019124_n-1024x683.jpg' },
  { year: '2014', title: 'Vaisakhi Sham', slug: 'vaisakhi-sham-2014', coverImageUrl: '/wp-content/uploads/2025/04/Screenshot-2025-04-23-at-8.37.36%20PM.png' },
  { year: '2014', title: 'Coverage Manukau Diwali Mela 2014', slug: 'manukau-diwali-mela-2014', coverImageUrl: '/wp-content/uploads/2025/04/Screenshot-2025-04-23-at-8.37.29%20PM.png' },
  { year: '2014', title: 'Radio Spice Covering The Elderly Show 2014', slug: 'elderly-show-2014', coverImageUrl: '/wp-content/uploads/2025/04/Screenshot-2025-04-23-at-8.37.47%20PM.png' },
  { year: '2013', title: 'Waikato Radio Spice Transmission Inauguration 2013', slug: 'waikato-transmission-2013', coverImageUrl: '/wp-content/uploads/2025/04/Screenshot-2025-04-23-at-8.38.01%20PM.png' },
  { year: '2012', title: 'Diwali Mela Coverage 2012', slug: 'diwali-mela-2012', coverImageUrl: '/wp-content/uploads/2025/04/Screenshot-2025-04-23-at-8.37.56%20PM.png' },
  { year: 'Historical', title: 'Celebrations Of 1st Anniversary Of Radio Spice', slug: 'radio-spice-1st-anniversary', coverImageUrl: '/wp-content/uploads/2025/04/Screenshot-2025-04-23-at-8.37.22%20PM.png' },
]

async function seed() {
  const payload = await getPayload({ config })

  let created = 0
  let skipped = 0

  for (const ev of events) {
    const existing = await payload.find({
      collection: 'events',
      where: { slug: { equals: ev.slug } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      skipped++
      continue
    }
    await payload.create({
      collection: 'events',
      data: {
        title: ev.title,
        slug: ev.slug,
        year: ev.year,
        coverImageUrl: ev.coverImageUrl,
        photos: [{ imageUrl: ev.coverImageUrl, caption: '' }],
      },
    })
    created++
    console.log(`Created: ${ev.title}`)
  }

  console.log(`\nDone — created ${created}, skipped ${skipped}`)
  process.exit(0)
}

seed().catch((err) => { console.error(err); process.exit(1) })
