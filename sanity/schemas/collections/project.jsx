import { defineField, defineType } from 'sanity';
import { ProjectsIcon, ImageIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fieldsets: [
    {
      name: 'hero',
      title: 'HERO'
    },
    {
      name: 'cta-card',
      title: 'CTA CARD'
    }
  ],
  fields: [
    defineField({
      fieldset: 'hero',
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'hero',
      name: 'director',
      title: 'Director',
      type: 'reference',
      to: [{ type: 'director' }],
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'cta-card',
      name: 'ctaCardImages',
      title: 'Images',
      type: 'object',
      fields: [
        {
          name: 'landscapeImage',
          title: 'Landscape (16:9)',
          type: 'singleImage'
        },
        {
          name: 'squareImage',
          title: 'Square (1:1)',
          type: 'singleImage'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      image: 'ctaCardImages.landscapeImage.asset'
    },
    prepare({ title, image }) {
      return {
        title: title ? title : 'Untitled',
        media: image ? image : ImageIcon
      };
    }
  }
});
