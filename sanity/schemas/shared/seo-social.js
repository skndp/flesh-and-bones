import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seoSocial',
  title: 'SEO / Social Sharing',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true
  },
  fields: [
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'For search engines and social media sharing previews (Max 160 characters)',
      validation: [
        Rule => Rule.max(160).error('Maximum of 160 characters')
      ]
    }),
    defineField({
      name: 'image',
      title: 'Social Sharing Image',
      type: 'image',
      description: 'Must be under 1.2MB (best at 1200 × 630)',
      validation: [
        Rule => Rule.custom(async (value, context) => {
          if (!value?.asset?._ref) return true;

          const client = context.getClient({ apiVersion: '2023-10-01' });
          const asset = await client.fetch(
            `*[_id == $id][0]{size}`,
            { id: value.asset._ref }
          );

          const maxSize = 1.2 * 1024 * 1024;
          return asset?.size <= maxSize ? true : 'Image must be under 1.2MB';
        })
      ],
      options: {
        hotspot: false
      }
    })
  ]
});
