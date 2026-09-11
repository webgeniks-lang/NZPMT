import type { CollectionConfig } from 'payload'
import { adminOnly, editorOrAdmin } from '@/lib/access'

export const SidebarWidgets: CollectionConfig = {
  slug: 'sidebar-widgets',
  labels: { singular: 'Sidebar Widget', plural: 'Sidebar Widgets' },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'type', 'active', 'order'],
  },
  access: {
    read: () => true,
    create: editorOrAdmin,
    update: editorOrAdmin,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Internal label — not shown on site' },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Image / Ad Banner', value: 'image' },
        { label: 'YouTube Video', value: 'youtube' },
      ],
      defaultValue: 'image',
    },
    // Image / Ad Banner fields
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Image URL',
      admin: {
        description: 'Paste an image URL or upload below',
        condition: (data) => data?.type === 'image',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Or Upload Image',
      admin: {
        condition: (data) => data?.type === 'image',
      },
    },
    {
      name: 'linkUrl',
      type: 'text',
      label: 'Click Link (optional)',
      admin: {
        description: 'Where clicking the image goes (leave blank for no link)',
        condition: (data) => data?.type === 'image',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption (optional)',
      admin: {
        condition: (data) => data?.type === 'image',
      },
    },
    // YouTube fields
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube URL',
      admin: {
        description: 'e.g. https://www.youtube.com/watch?v=...',
        condition: (data) => data?.type === 'youtube',
      },
      validate: (value: string | null | undefined, { data }: any) => {
        if (data?.type !== 'youtube') return true
        if (!value) return 'YouTube URL is required.'
        if (!/youtube\.com\/watch|youtu\.be\/|youtube\.com\/embed/.test(value)) {
          return 'Please enter a valid YouTube URL.'
        }
        return true
      },
    },
    {
      name: 'youtubeTitle',
      type: 'text',
      label: 'Video Title (optional)',
      admin: {
        condition: (data) => data?.type === 'youtube',
      },
    },
    // Shared fields
    {
      name: 'active',
      type: 'checkbox',
      label: 'Show on site',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower number = shown first',
      },
    },
  ],
}
