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
      name: 'backgroundTexture',
      title: 'BACKGROUND TEXTURE',
      description: 'Background tile (best as JPG at 1600 x 1600)',
      type: 'image',
      options: {
        hotspot: false
      }
    }),
    defineField({
      name: 'leftEdgeDistress',
      title: 'LEFT EDGE DISTRESS',
      description: 'Background tile (best as PNG at 20px wide, really tall)',
      type: 'image',
      options: {
        hotspot: false
      }
    }),
    defineField({
      name: 'rightEdgeDistress',
      title: 'RIGHT EDGE DISTRESS',
      description: 'Background tile (best as PNG at 20px wide, really tall)',
      type: 'image',
      options: {
        hotspot: false
      }
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
      title: 'MENU',
      type: 'image',
      options: {
        hotspot: false
      }
    })
  ]
});
