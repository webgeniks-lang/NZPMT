import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import { Categories } from './collections/Categories'
import { Events } from './collections/Events'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { SidebarWidgets } from './collections/SidebarWidgets'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      graphics: {
        Logo: '@/components/AdminLogo',
        Icon: '@/components/AdminLogo',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- NZPMT Admin',
      icons: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          url: '/favicon.ico',
        },
      ],
    },
  },
  collections: [Posts, Categories, Events, Media, SidebarWidgets, Users],
  db: sqliteAdapter({
    client: { url: 'file:./nzpmt.db' },
  }),
  editor: lexicalEditor(),
  sharp,
  secret: process.env.PAYLOAD_SECRET || 'nzpmt-payload-secret-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  upload: {
    limits: {
      fileSize: 5242880, // 5 MB — images only, videos go on YouTube
    },
  },
})
