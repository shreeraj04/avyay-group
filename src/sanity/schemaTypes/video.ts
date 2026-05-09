import { defineType, defineField } from 'sanity'

export const videoSchema = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Paste the full YouTube video URL (e.g. https://www.youtube.com/watch?v=...)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'thumbnail',
      title: 'Custom Thumbnail (optional)',
      description: 'Leave empty to use YouTube auto-thumbnail',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Market Insights', value: 'market-insights' },
          { title: 'Investment Tips', value: 'investment-tips' },
          { title: 'Financial Planning', value: 'financial-planning' },
          { title: 'Company Updates', value: 'company-updates' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'youtubeUrl' },
  },
})
