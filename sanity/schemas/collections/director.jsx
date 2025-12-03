import { defineField, defineType } from 'sanity';
import { SlugInput } from 'sanity-plugin-prefixed-slug';
import { ArrayMaxItems } from '../../components/array-max-items';
import { ProjectsIcon, ImageIcon } from '@sanity/icons';
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
    }),
    defineField({
      name: 'projects',
      title: 'PROJECTS',
      type: 'array',
      of: [
        {
          name: 'row',
          title: 'Row',
          type: 'object',
          fields: [
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              components: { input: ArrayMaxItems },
              validation: [
                Rule => Rule.required().max(2).error('Please include 1–2 items per row')
              ],
              of: [
                {
                  name: 'projectItem',
                  title: 'Project Item',
                  type: 'reference',
                  to: [{ type: 'project' }],
                  options: {
                    filter: ({ document }) => {
                      const id = document?._id;

                      if (!id) {
                        return {
                          filter: 'false',
                          params: {}
                        }
                      }

                      const draftId = id.startsWith('drafts.') ? id : `drafts.${id}`;
                      const publishedId = id.replace(/^drafts\./, '');

                      return {
                        filter: `!(_id in path("drafts.**")) && director._ref in [$draftId, $publishedId]`,
                        params: {
                          draftId,
                          publishedId
                        }
                      }
                    }
                  },
                  preview: {
                    select: {
                      title: 'title',
                      image: 'ctaCardImages.landscapeImage.asset'
                    },
                    prepare({ title, image }) {
                      return {
                        title: title || 'Untitled project',
                        media: image || ImageIcon
                      };
                    }
                  }
                }
              ]
            }
          ],
          preview: {
            select: {
              // Item 1
              title1: 'items.0.title',
              img1: 'items.0.ctaCardImages.landscapeImage.asset',
              // Item 2
              title2: 'items.1.title',
              img2: 'items.1.ctaCardImages.landscapeImage.asset'
            },

            prepare({ title1, img1, title2, img2 }) {
              const items = [];

              if (title1) items.push({ title: title1, media: img1 || ImageIcon });
              if (title2) items.push({ title: title2, media: img2 || ImageIcon });
              if (items.length === 0) {
                return {
                  title: 'No items selected',
                  subtitle: '',
                  media: ImageIcon
                };
              }

              const rowTitle = items.length === 2 ? `${items[0].title} • ${items[1].title}` : items[0].title;
              const validMedia = items.filter(item => item.media);
              const mediaItems = validMedia.length === 0 ? ImageIcon : () =>
                validMedia.map((item, index) =>
                  typeof item.media === 'string' ? (
                    <div className="media-item" key={index}>
                      <img src={item.media} alt="" />
                    </div>
                  ) : (<div className="media-item --empty" key={index}></div>)
                );

              return {
                title: rowTitle,
                subtitle: '',
                media: mediaItems
              };
            }
          }
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
