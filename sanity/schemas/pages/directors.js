import { defineField, defineType } from 'sanity';
import { DashboardIcon, UserIcon } from '@sanity/icons';
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
          type: 'object',
          name: 'directorItem',
          fields: [
            {
              name: 'director',
              title: 'Director',
              type: 'reference',
              to: [{ type: 'director' }],
              validation: [
                Rule => Rule.required()
              ]
            },
            {
              name: 'backgroundVideo',
              title: 'Video',
              description: 'Fullscreen, background looping video (best at 5-15 seconds)',
              type: 'videoPlayer'
            }
          ],
          preview: {
            select: {
              title: 'director.title',
              image: 'director.profileImage.asset'
            },
            prepare({ title, image }) {
              return {
                title: title ? title : 'Untitled',
                media: image ? image : UserIcon
              };
            }
          }
        }
      ]
    })
  ]
});
