import { defineField, defineType } from 'sanity';
import { ImageIcon } from '@sanity/icons';

export default defineType({
  name: 'pngFile',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'file',
      validation: [
        Rule => Rule.custom(async (value, context) => {
          if (!value?.asset?._ref) {
            return true;
          }

          const client = context.getClient({ apiVersion: '2023-10-01' });
          let asset;
          try {
            asset = await getFileAsset(value.asset, client);
          } catch {
            return true;
          }

          if (asset.mimeType !== 'image/png') {
            return 'File must be a PNG';
          }

          return true;
        })
      ]
    })
  ]
});
