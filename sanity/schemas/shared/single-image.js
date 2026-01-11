import { defineField, defineType } from 'sanity';
import { getExtension, getImageDimensions } from '@sanity/asset-utils';
import { ImageIcon } from '@sanity/icons';

export default defineType({
  name: 'singleImage',
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

          if (filetype !== 'jpg' && filetype !== 'png' && filetype !== 'webp') {
            return 'Image must be a JPG, PNG, or WEBP';
          }

          return true;
        })
      ],
      options: {
        hotspot: false
      }
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
