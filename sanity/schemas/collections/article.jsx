import { defineField, defineType } from 'sanity';
import { SlugInput } from 'sanity-plugin-prefixed-slug';
import { ProjectsIcon, ImageIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'article',
  title: 'Zine Article',
  type: 'document',
  icon: ProjectsIcon,
  fieldsets: [
    {
      name: 'hero',
      title: 'HERO'
    },
    {
      name: 'cta-card',
      title: 'CTA CARD'
    }
  ],
  fields: [
    defineField({
      fieldset: 'hero',
      name: 'title',
      title: 'Title',
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
      description: 'Press "Generate" to automatically create a slug from the title above.',
      options: {
        source: 'title',
        urlPrefix: '/zine/'
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
      fieldset: 'cta-card',
      name: 'ctaCardImages',
      title: 'Images',
      type: 'object',
      fields: [
        {
          name: 'squareImage',
          title: 'Square (1:1)',
          type: 'singleImage'
        }
      ]
    }),
    defineField({
      fieldset: 'cta-card',
      name: 'ctaCardLabel',
      title: 'CTA Label',
      type: 'string',
      initialValue: 'Read About It'
    }),
    defineField({
      fieldset: 'cta-card',
      name: 'ctaCardSummary',
      title: 'Summary',
      type: 'string'
    })
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      landscapeImg: 'ctaCardImages.landscapeImage.image.asset',
      squareImg: 'ctaCardImages.squareImage.image.asset'
    },
    prepare({ title, slug, landscapeImg, squareImg }) {
      let image = landscapeImg ? landscapeImg : squareImg ? squareImg : null;
      return {
        title: title ? title : 'Untitled',
        subtitle: slug ? `/zine/${slug.current}` : '/zine/untitled',
        media: image ? image : ImageIcon
      };
    }
  }
});
