import { defineField, defineType } from 'sanity';
import { getExtension } from '@sanity/asset-utils';
import { ImageIcon } from '@sanity/icons';

export default defineType({
  name: 'zineImage',
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

          const dimensions = value.asset.metadata?.dimensions;
          if (!dimensions) return true;

          const { width, height } = dimensions;

          if (width !== height) {
            return 'Image must be square (e.g. 500 × 500)';
          }

          if (width > 1000 || height > 1000) {
            return 'Image must be no larger than 1000 × 1000';
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
