import { defineField, defineType } from 'sanity';
import { ArrayMaxItems } from '../../components/array-max-items';
import { DashboardIcon, ProjectsIcon, ImageIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID;
const dataset = import.meta.env.SANITY_STUDIO_DATASET;

export default defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  singleton: true,
  icon: DashboardIcon,
  fieldsets: [
    {
      name: 'hero',
      title: 'HERO'
    },
    {
      name: 'work',
      title: 'WORK'
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
      name: 'seoSocial',
      title: 'SEO / Social Sharing',
      type: 'seoSocial'
    }),
    defineField({
      fieldset: 'hero',
      name: 'heroHeading',
      title: 'Heading',
      type: 'text',
      rows: 3,
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
          title: 'Sketch 1',
          type: 'sketchImage'
        },
        {
          name: 'sketch2',
          title: 'Sketch 2',
          type: 'sketchImage'
        }
      ]
    }),
    defineField({
      fieldset: 'hero',
      name: 'heroCopy',
      title: 'Copy',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'work',
      name: 'filters',
      title: 'Filters',
      type: 'array',
      validation: [
        Rule => Rule.required().unique()
      ],
      of: [
        {
          type: 'reference',
          to: [{ type: 'workFilter' }]
        }
      ]
    })
  ]
});
