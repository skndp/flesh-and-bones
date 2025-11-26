import { defineField, defineType } from 'sanity';
import { TagIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'anatomyTag',
  title: 'Anatomy Tag',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      name: 'id',
      title: 'ID',
      type: 'slug',
      description: 'Press "Generate" to automatically create an ID from the tag above.',
      options: {
        source: 'tag'
      },
      validation: [
        Rule => Rule.required().custom((slug) => {
          if (typeof slug === "undefined") return true;
          const regex = /(^[a-z0-9-]+$)/;
          if (regex.test(slug.current)) {
            return true;
          } else {
            return 'Invalid ID: Only lowercase letters, numbers, and dashes are allowed.'
          }
        })
      ]
    })
  ]
});
