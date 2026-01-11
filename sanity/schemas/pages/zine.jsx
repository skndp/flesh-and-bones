import { defineField, defineType } from 'sanity';
import { DashboardIcon, ImageIcon, LinkIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'zine',
  title: 'Zine',
  type: 'document',
  singleton: true,
  icon: DashboardIcon,
  fieldsets: [
    {
      name: 'hero',
      title: 'HERO'
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      hidden: true
    }),
    defineField({
      fieldset: 'hero',
      name: 'heroHeading',
      title: 'Heading',
      type: 'text',
      rows: 2,
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'hero',
      name: 'heroHeadingSketches',
      title: 'Heading Sketches',
      type: 'object',
      fields: [
        {
          name: 'sketch1',
          title: 'Sketch 1',
          type: 'sketchImage'
        },
        {
          name: 'sketch2',
          title: 'Sketch 2',
          type: 'sketchImage'
        }
      ]
    }),
    defineField({
      name: 'items',
      title: 'GRID',
      type: 'array',
      of: [
        {
          name: 'articleItem',
          title: 'Article',
          type: 'object',
          icon: DashboardIcon,
          fields: [
            {
              name: 'article',
              title: 'Article',
              type: 'reference',
              to: [{ type: 'article' }],
              validation: [
                Rule => Rule.required()
              ]
            },
            {
              name: 'zineImage',
              title: 'Zine Grid Image (Base)',
              type: 'zineImage'
            },
            {
              name: 'zineImageOverlay',
              title: 'Zine Grid Image (Overlay)',
              type: 'zineImage'
            }
          ],
          preview: {
            select: {
              title: 'article.title',
              slug: 'article.slug',
              baseImage: 'zineImage.image.asset.url',
              overlayImage: 'zineImageOverlay.image.asset.url'
            },
            prepare({ title, slug, baseImage, overlayImage }) {
              const mediaItems = (
                <div className="media-items-stacked">
                  {baseImage ? (
                    <div className="media-item">
                      <img src={baseImage} alt="" />
                    </div>
                  ) : (
                    <div className="media-item --empty" />
                  )}
                  {overlayImage && (
                    <div className="media-item --overlay">
                      <img src={overlayImage} alt="" />
                    </div>
                  )}
                </div>
              );

              return {
                title: title || 'Untitled',
                subtitle: slug ? `/zine/${slug.current}` : '/zine/untitled',
                media: mediaItems
              }
            }
          }
        },
        {
          name: 'linkItem',
          title: 'External link',
          type: 'object',
          icon: LinkIcon,
          fields: [
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: [
                Rule => Rule.required()
              ]
            },
            {
              name: 'zineImage',
              title: 'Zine Grid Image (Base)',
              type: 'zineImage'
            },
            {
              name: 'zineImageOverlay',
              title: 'Zine Grid Image (Overlay)',
              type: 'zineImage'
            }
          ],
          preview: {
            select: {
              title: 'url',
              slug: 'article.slug',
              baseImage: 'zineImage.image.asset.url',
              overlayImage: 'zineImageOverlay.asset.url'
            },
            prepare({ title, slug, baseImage, overlayImage }) {
              const mediaItems = (
                <div className="media-items-stacked">
                  {baseImage ? (
                    <div className="media-item">
                      <img src={baseImage} alt="" />
                    </div>
                  ) : (
                    <div className="media-item --empty" />
                  )}
                  {overlayImage && (
                    <div className="media-item --overlay">
                      <img src={overlayImage} alt="" />
                    </div>
                  )}
                </div>
              );

              return {
                title: title || 'Untitled',
                subtitle: slug ? `/zine/${slug.current}` : '/zine/untitled',
                media: mediaItems
              }
            }
          }
        }
      ]
    })
  ]
});
