import { defineField, defineType } from 'sanity';
import { ProjectsIcon, ImageIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fieldsets: [
    {
      name: 'hero',
      title: 'HERO'
    },
    {
      name: 'modal',
      title: 'MODAL'
    },
    {
      name: 'cta-card',
      title: 'CTA CARD'
    }
  ],
  validation: [
    Rule => Rule.custom(doc => {
      if (!doc?.director && !doc?.directorName) {
        return 'Please include either a Director (Reference) or Director (Write-In)';
      }

      return true;
    })
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
      name: 'director',
      title: 'Director (Reference)',
      type: 'reference',
      to: [{ type: 'director' }]
    }),
    defineField({
      fieldset: 'hero',
      name: 'directorName',
      title: 'Director (Write-In)',
      type: 'string'
    }),
    defineField({
      fieldset: 'modal',
      name: 'projectVideo',
      title: 'Video (Player w/ Controls)',
      type: 'videoPlayer'
    }),
    defineField({
      fieldset: 'modal',
      name: 'modalPortrait',
      title: 'Portrait Layout',
      description: 'Enable this to display as portrait (9/16) in modal slide',
      type: 'boolean'
    }),
    defineField({
      fieldset: 'modal',
      name: 'modalSquare',
      title: 'Square Layout',
      description: 'Enable this to display as square (1/1) in modal slide',
      type: 'boolean'
    }),
    defineField({
      fieldset: 'cta-card',
      name: 'ctaCardImages',
      title: 'Images',
      type: 'object',
      fields: [
        {
          name: 'landscapeImage',
          title: 'Landscape (16:9)',
          type: 'singleImage'
        },
        {
          name: 'squareImage',
          title: 'Square (1:1)',
          type: 'singleImage'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      landscapeImg: 'ctaCardImages.landscapeImage.image.asset',
      squareImg: 'ctaCardImages.squareImage.image.asset'
    },
    prepare({ title, landscapeImg, squareImg }) {
      let image = landscapeImg ? landscapeImg : squareImg ? squareImg : null;
      return {
        title: title ? title : 'Untitled',
        media: image ? image : ImageIcon
      };
    }
  }
});
