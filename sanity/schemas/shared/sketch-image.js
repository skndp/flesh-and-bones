import { defineField, defineType } from 'sanity';
import { getExtension, getImageDimensions } from '@sanity/asset-utils';
import { ImageIcon } from '@sanity/icons';

export default defineType({
  name: 'sketchImage',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: [
        Rule => Rule.custom((value) => {
          if (!value || !value.asset) {
            return 'Please upload or select an image';
          }

          const filetype = getExtension(value.asset._ref);

          if (filetype !== 'png') {
            return 'Image must be a PNG.'
          }

          return true;
        })
      ],
      options: {
        hotspot: false
      }
    }),
    defineField({
      name: 'properties',
      title: 'Properties (size and position)',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        {
          name: 'height',
          title: 'Height',
          type: 'number',
          description: 'Percent of line height (between 0% and 300%, defaults to 50%)',
          validation: [
            Rule => Rule.min(0).max(300).error('Please enter a number between 0% and 300%')
          ]
        },
        {
          name: 'offsetX',
          title: 'Offset X%',
          type: 'number',
          description: 'Position from left (between -100% and 100%, defaults to 0%)',
          validation: [
            Rule => Rule.min(-100).max(100).error('Please enter a number between -100% and 100%')
          ]
        },
        {
          name: 'offsetY',
          title: 'Offset Y%',
          type: 'number',
          description: 'Position from top (between -100% and 100%, defaults to 0%)',
          validation: [
            Rule => Rule.min(-100).max(100).error('Please enter a number between -100% and 100%')
          ]
        }
      ]
    })
  ],
  preview: {
    select: {
      image: 'image.asset',
      title: 'image.asset.originalFilename'
    },
    prepare: ({ image, title }) => {
      return {
        media: image ? image : ImageIcon,
        title: image ? title : 'Must select an image'
      }
    }
  }
});
