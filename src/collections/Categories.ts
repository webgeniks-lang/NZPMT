import type { CollectionConfig } from 'payload'
import { adminOnly, editorOrAdmin } from '@/lib/access'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: editorOrAdmin,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  admin: { useAsTitle: 'name', group: 'Content' },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL-friendly name' },
    },
    { name: 'description', type: 'textarea' },
    {
      name: 'color',
      type: 'select',
      options: [
        { label: 'Orange (Breaking)', value: 'orange' },
        { label: 'Blue (International)', value: 'blue' },
        { label: 'Green (Local)', value: 'green' },
        { label: 'Red (India)', value: 'red' },
        { label: 'Purple (Sports)', value: 'purple' },
        { label: 'Yellow (Weather)', value: 'yellow' },
      ],
      defaultValue: 'orange',
    },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
