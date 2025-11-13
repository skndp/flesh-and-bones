import { defineField, defineType } from 'sanity';
import { DashboardIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  singleton: true,
  icon: DashboardIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      validation: [
        Rule => Rule.required()
      ],
      of: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: [
            (Rule) => Rule.required()
          ]
        }
      ]
    }),
    defineField({
      name: 'socials',
      title: 'Socials',
      type: 'array',
      validation: [
        Rule => Rule.required()
      ],
      of: [
        {
          name: 'link',
          title: 'Link',
          type: 'url',
          validation: [
            (Rule) => Rule.required().uri({ scheme: ['http', 'https'] })
          ]
        }
      ]
    })
  ]
});
