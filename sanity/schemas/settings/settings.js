import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  singleton: true,
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true
    }),
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      name: 'seoSocial',
      title: 'SEO / Social Sharing',
      type: 'seoSocial'
    }),
    defineField({
      name: 'locations',
      title: 'LOCATIONS',
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
      title: 'SOCIALS',
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
    }),
    defineField({
      name: 'lightPaper',
      title: 'LIGHT PAPER',
      description: 'Base paper used in menu, footer, and cutouts',
      type: 'image',
      options: {
        hotspot: false
      }
    }),
    defineField({
      name: 'modalPaper',
      title: 'MODAL PAPER',
      type: 'image',
      options: {
        hotspot: false
      }
    }),
    defineField({
      name: 'playButton',
      title: 'PLAY',
      type: 'image',
      options: {
        hotspot: false
      }
    }),
    defineField({
      name: 'menuSticker',
      title: 'MENU (and MODAL)',
      type: 'image',
      options: {
        hotspot: false
      }
    })
  ]
});
