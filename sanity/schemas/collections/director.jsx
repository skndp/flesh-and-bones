import { defineField, defineType } from 'sanity';
import { SlugInput } from 'sanity-plugin-prefixed-slug';
import { ProjectsIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'director',
  title: 'Director',
  type: 'document',
  icon: ProjectsIcon,
  fieldsets: [
    {
      name: 'hero',
      title: 'HERO'
    },
    {
      name: 'anatomy',
      title: 'ANATOMY'
    }
  ],
  fields: [
    defineField({
      fieldset: 'hero',
      name: 'title',
      title: 'Name',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'hero',
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      components: {
        input: SlugInput,
      },
      description: 'Press "Generate" to automatically create a slug from the name above.',
      options: {
        source: 'title',
        urlPrefix: '/directors/'
      },
      validation: [
        Rule => Rule.required().custom((slug) => {
          if (typeof slug === "undefined") return true;
          const regex = /(^[a-z0-9-]+$)/;
          if (regex.test(slug.current)) {
            return true;
          } else {
            return 'Invalid slug: Only lowercase letters, numbers, and dashes are allowed.'
          }
        })
      ]
    }),
    defineField({
      fieldset: 'hero',
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2
    }),
    defineField({
      fieldset: 'anatomy',
      name: 'anatomyLabel',
      title: 'Label',
      type: 'string',
      initialValue: 'Artist Anatomy',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'anatomy',
      name: 'anatomyBio',
      title: 'Bio',
      type: 'text',
      rows: 10,
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'anatomy',
      name: 'anatomyLocation',
      title: 'Location',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'anatomy',
      name: 'anatomyTags',
      title: 'Tags',
      type: 'array',
      validation: [
        Rule => Rule.required().unique()
      ],
      of: [
        {
          type: 'reference',
          to: [{ type: 'anatomyTag' }]
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug'
    },
    prepare({ title, slug }) {
      return {
        title: title ? title : 'Untitled',
        subtitle: slug ? `/directors/${slug.current}` : '/directors/untitled'
      };
    }
  }
});
