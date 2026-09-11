import type { CollectionConfig } from 'payload'
import { adminOnly, editorOrAdmin } from '@/lib/access'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    read: editorOrAdmin,
    create: editorOrAdmin,
    update: editorOrAdmin,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'date', 'updatedAt'],
    group: 'Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier — auto-filled from title, can be edited',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            return (data?.title as string | undefined)
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '')
          },
        ],
      },
    },
    {
      name: 'year',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. 2026, 2025, Historical',
      },
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        description: 'Optional specific date for sorting',
        date: { pickerAppearance: 'monthOnly' },
      },
    },
    {
      name: 'coverImageUrl',
      type: 'text',
      admin: {
        description: 'Local image path, e.g. /wp-content/uploads/2026/08/photo.jpg',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Optional event description shown at top of gallery page',
      },
    },
    {
      name: 'photos',
      type: 'array',
      label: 'Event Photos',
      admin: {
        description: 'Add photos for this event gallery. Upload or paste a local image path.',
      },
      fields: [
        {
          name: 'imageUrl',
          type: 'text',
          label: 'Image Path',
          admin: {
            description: 'Local path e.g. /wp-content/uploads/2026/08/photo.jpg',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Or Upload Image',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Caption (optional)',
        },
      ],
    },
  ],
}
