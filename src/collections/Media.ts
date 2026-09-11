import type { CollectionConfig } from 'payload'
import { editorOrAdmin, adminOnly } from '@/lib/access'
import { validateImageUpload } from '@/lib/validateImage'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: editorOrAdmin,
    create: editorOrAdmin,
    update: editorOrAdmin,
    delete: adminOnly,
  },
  admin: { group: 'Content' },
  upload: {
    staticDir: '../public/media',
    imageSizes: [
      { name: 'thumbnail', width: 300, height: 200, position: 'centre' },
      { name: 'card', width: 600, height: 400, position: 'centre' },
      { name: 'hero', width: 1200, height: 628, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'],
  },
  hooks: {
    beforeOperation: [
      async ({ operation, args }) => {
        if (operation !== 'create') return args

        const file = args?.req?.file
        if (!file?.tempFilePath && !file?.data) return args

        try {
          const filePath = file.tempFilePath as string | undefined
          if (filePath) {
            await validateImageUpload(filePath, file.name, file.mimetype)
          }
        } catch (err: any) {
          throw new Error(err.message || 'Invalid image upload.')
        }

        return args
      },
    ],
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
  ],
}
