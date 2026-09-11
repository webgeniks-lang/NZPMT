import type { CollectionConfig } from 'payload'
import { adminOnly, editorOrAdmin } from '@/lib/access'
import {
  lexicalEditor,
  FixedToolbarFeature,
  HeadingFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  UnorderedListFeature,
  OrderedListFeature,
  LinkFeature,
  BlockquoteFeature,
  ParagraphFeature,
  AlignFeature,
  StrikethroughFeature,
} from '@payloadcms/richtext-lexical'

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 96)

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: editorOrAdmin,
    create: editorOrAdmin,
    update: editorOrAdmin,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
    listSearchableFields: ['title', 'excerpt'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) return slugify(data.title)
            return value
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: { position: 'sidebar' },
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    {
      name: 'featuredImageUrl',
      type: 'text',
      admin: { description: 'External image URL (from old site)' },
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube Video',
      admin: {
        description: 'Paste a YouTube link (e.g. https://www.youtube.com/watch?v=...) — shown below the article.',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return true
        const isYoutube = /youtube\.com\/watch|youtu\.be\/|youtube\.com\/embed/.test(value)
        if (!isYoutube) return 'Please enter a valid YouTube URL.'
        return true
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: { description: 'Short summary (max 300 chars)' },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      editor: lexicalEditor({
        features: [
          FixedToolbarFeature(),
          ParagraphFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          StrikethroughFeature(),
          AlignFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          LinkFeature(),
          BlockquoteFeature(),
        ],
      }),
    },
    {
      name: 'contentHtml',
      type: 'textarea',
      label: 'Legacy HTML Content',
      admin: {
        description: 'Read-only — imported from WordPress. Use the Content editor above for new posts.',
        readOnly: true,
        condition: (data) => Boolean(data?.contentHtml),
      },
    },
    { name: 'author', type: 'text', defaultValue: 'NZPMT Team' },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
    { name: 'views', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc, req }) => {
        // Auto-set publishedAt when first published
        if (data.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
return data
      },
    ],
  },
  versions: { drafts: true },
}
