import type { CollectionConfig } from 'payload'
import { adminOnly, adminOrSelf } from '@/lib/access'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: adminOrSelf,
    create: adminOnly,
    update: adminOrSelf,
    delete: adminOnly,
  },
  admin: { useAsTitle: 'email', group: 'Admin' },
  auth: true,
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      defaultValue: 'editor',
    },
  ],
}
