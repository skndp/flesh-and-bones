import { defineField, defineType } from 'sanity';
import { FilterIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'workFilter',
  title: 'Work Filter',
  type: 'document',
  icon: FilterIcon,
  fields: [
    defineField({
      name: 'filter',
      title: 'Filter',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      name: 'id',
      title: 'ID',
      type: 'slug',
      description: 'Press "Generate" to automatically create an ID from the filter above.',
      options: {
        source: 'filter'
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
    }),
    defineField({
      name: 'filterLayout',
      title: 'Filter Layout',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ],
      options: {
        list: [
          { title: 'Landscape', value: 'landscape' },
          { title: 'Square', value: 'square' }
        ],
        layout: 'radio'
      },
      initialValue: 'landscape'
    })
  ]
});
