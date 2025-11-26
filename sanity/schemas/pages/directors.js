import { defineField, defineType } from 'sanity';
import { DashboardIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'directors',
  title: 'Directors',
  type: 'document',
  singleton: true,
  icon: DashboardIcon,
  fieldsets: [
    {
      name: 'hero',
      title: 'HERO'
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      hidden: true
    }),
    defineField({
      fieldset: 'hero',
      name: 'heroHeading',
      title: 'Heading',
      type: 'richTextSketch',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'hero',
      name: 'sketchnoteLeft',
      title: 'Sketchnote (left gutter)',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'hero',
      name: 'directors',
      title: 'Directors',
      type: 'array',
      validation: [
        Rule => Rule.required().unique()
      ],
      of: [
        {
          type: 'reference',
          to: [{ type: 'director' }]
        }
      ]
    })
  ]
});
