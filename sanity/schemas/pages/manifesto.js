import { defineField, defineType } from 'sanity';
import { DashboardIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'manifesto',
  title: 'Manifesto',
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
      name: 'heroKicker',
      title: 'Kicker',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'hero',
      name: 'heroHeading',
      title: 'Heading',
      type: 'text',
      rows: 2,
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'hero',
      name: 'heroHeadingSketches',
      title: 'Heading Sketches',
      type: 'object',
      fields: [
        {
          name: 'sketch1',
          title: ' ',
          type: 'sketchImage'
        },
        {
          name: 'sketch2',
          title: ' ',
          type: 'sketchImage'
        }
      ]
    }),
    defineField({
      fieldset: 'hero',
      name: 'heroCopy',
      title: 'Copy',
      type: 'richTextSketch',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'hero',
      name: 'heroEndMark',
      title: 'End Mark',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'hero',
      name: 'heroEndMarkSketch',
      title: 'End Mark Sketch',
      type: 'sketchImage'
    })
  ]
});
