import { defineField, defineType } from 'sanity';
import { ArrayMaxItems } from '../../components/array-max-items';
import { DashboardIcon, ProjectsIcon, ImageIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID;
const dataset = import.meta.env.SANITY_STUDIO_DATASET;

export default defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  singleton: true,
  icon: DashboardIcon,
  fieldsets: [
    {
      name: 'hero',
      title: 'HERO'
    },
    {
      name: 'work',
      title: 'WORK'
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
      rows: 3,
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'hero',
      name: 'heroCopy',
      title: 'Copy',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'work',
      name: 'filters',
      title: 'Filters',
      type: 'array',
      validation: [
        Rule => Rule.required().unique()
      ],
      of: [
        {
          type: 'reference',
          to: [{ type: 'workFilter' }]
        }
      ]
    }),
    defineField({
      fieldset: 'work',
      name: 'projects',
      title: 'Projects',
      type: 'array',
      validation: [
        Rule => Rule.required()
      ],
      of: [
        {
          name: 'row',
          title: 'Row',
          type: 'object',
          fields: [
            {
              name: 'layout',
              title: 'Layout',
              type: 'string',
              options: {
                list: [
                  { title: 'Left 50%, Right 50% (Square, Square)', value: 'fifty-fifty' },
                  { title: 'Left 33%, Right 66% (Portrait, Landscape)', value: 'one-third-two-third' },
                  { title: 'Left 66%, Right 33% (Landscape, Portrait)', value: 'two-third-one-third' }
                ],
                layout: 'radio'
              },
              initialValue: 'fifty-fifty',
              hidden: ({ parent }) => parent?.items?.length !== 2
            },
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              components: { input: ArrayMaxItems },
              validation: [
                Rule => Rule.required().max(2).error('Please include 1-2 items per row')
              ],
              of: [
                {
                  name: 'item',
                  title: 'Item',
                  type: 'object',
                  fields: [
                    {
                      name: 'type',
                      title: 'Select an Item Type',
                      type: 'array',
                      components: { input: ArrayMaxItems },
                      validation: [
                        Rule => Rule.required().max(1).error('Please add an item type')
                      ],
                      of: [
                        {
                          name: 'projectItem',
                          title: 'Project',
                          type: 'object',
                          icon: ProjectsIcon,
                          fields: [
                            {
                              name: 'project',
                              title: 'Select a Project',
                              type: 'reference',
                              to: [{ type: 'project' }],
                              validation: [
                                Rule => Rule.required()
                              ]
                            }
                          ],
                          preview: {
                            select: {
                              title: 'project.title',
                              landscapeImg: 'project.ctaCardImages.landscapeImage.image.asset',
                              squareImg: 'project.ctaCardImages.squareImage.image.asset'
                            },
                            prepare(selection) {
                              const { title, landscapeImg, squareImg } = selection;
                              let image = landscapeImg ? landscapeImg : squareImg ? squareImg : null;
                              return {
                                title: title ? title : 'Untitled',
                                subtitle: '',
                                media: image ? image : ImageIcon
                              };
                            }
                          }
                        }
                        // NOTE: Are we maybe adding a random graphic grid items like "Always Walking the Line"hippoe skater?
                        // {
                        //   name: 'articleItem',
                        //   title: 'Article',
                        //   type: 'object',
                        //   icon: ProjectsIcon,
                        //   fields: [
                        //     {
                        //       name: 'article',
                        //       title: 'Select a Zine Article',
                        //       type: 'reference',
                        //       to: [{ type: 'article' }],
                        //       validation: [
                        //         Rule => Rule.required()
                        //       ]
                        //     }
                        //   ],
                        //   preview: {
                        //     select: {
                        //       title: 'article.title',
                        //       slug: 'article.slug',
                        //       image: 'article.ctaCardImages.landscapeImage.asset'
                        //     },
                        //     prepare(selection) {
                        //       const { title, slug, image } = selection;
                        //       return {
                        //         title: title ? title : 'Untitled',
                        //         subtitle: slug ? `/zine/${slug.current}` : '/zine/untitled',
                        //         media: image ? image : ImageIcon
                        //       };
                        //     }
                        //   }
                        // }
                      ]
                    }
                  ],
                  preview: {
                    select: {
                      type0: 'type.0._type',
                      projectTitle: 'type.0.project.title',
                      projectImgLandscape: 'type.0.project.ctaCardImages.landscapeImage.image.asset',
                      projectImgSquare: 'type.0.project.ctaCardImages.squareImage.image.asset',
                      // articleTitle: 'type.0.article.title',
                      // articleSlug: 'type.0.article.slug.current',
                      // articleImage: 'type.0.article.ctaCardImages.landscapeImage.asset'
                    },
                    prepare({
                      type0,
                      projectTitle,
                      projectImgLandscape,
                      projectImgSquare
                      // articleTitle,
                      // articleSlug,
                      // articleImage
                    }) {
                      let projectImage = projectImgLandscape ? projectImgLandscape : projectImgSquare ? projectImgSquare : null;
                      let title = 'No items selected';
                      let subtitle = '';
                      let media = null;

                      switch (type0) {
                        case 'projectItem':
                          title = projectTitle || '';
                          media = projectImage ? projectImage : ImageIcon;
                          break;
                        // case 'articleItem':
                        //   title = articleTitle || '';
                        //   subtitle = `/zine/${articleSlug || 'untitled'}`;
                        //   media = articleImage ? articleImage : ImageIcon;
                        //   break;
                      }

                      return {
                        title,
                        subtitle,
                        media
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
              type1: 'items.0.type.0._type',
              projectTitle1: 'items.0.type.0.project.title',
              projectImgLandscape1: 'items.0.type.0.project.ctaCardImages.landscapeImage.image.asset',
              projectImgSquare1: 'items.0.type.0.project.ctaCardImages.squareImage.image.asset',
              // articleTitle1: 'items.0.type.0.article.title',
              // articleImage1: 'items.0.type.0.article.ctaCardImages.landscapeImage.asset',
              // Item 2
              type2: 'items.1.type.0._type',
              projectTitle2: 'items.1.type.0.project.title',
              projectImgLandscape2: 'items.1.type.0.project.ctaCardImages.landscapeImage.image.asset',
              projectImgSquare2: 'items.1.type.0.project.ctaCardImages.squareImage.image.asset'
              // articleTitle2: 'items.1.type.0.article.title',
              // articleImage2: 'items.1.type.0.article.ctaCardImages.landscapeImage.asset'
            },
            prepare(selection) {
              const parseItem = (type, data) => {
                if (!type) return null;

                let title = 'Untitled';
                let media = null;

                switch (type) {
                  case 'projectItem':
                    title = data.projectTitle ? `[Project] ${data.projectTitle}` : 'Project';
                    media = data.projectImage || null;
                    break;
                  // case 'articleItem':
                  //   title = data.articleTitle ? `[Article] ${data.articleTitle}` : 'Article';
                  //   media = data.articleImage || null;
                  //   break;
                }

                return { title, media };
              };

              const items = [];
              // Add item 1 has type selected...
              if (selection.type1) {
                const item1 = parseItem(selection.type1, {
                  projectTitle: selection.projectTitle1,
                  projectImage: selection.projectImgLandscape1
                    ? selection.projectImgLandscape1
                    : selection.projectImgSquare1
                    ? selection.projectImgSquare1
                    : null
                  // articleTitle: selection.articleTitle1,
                  // articleImage: selection.articleImage1
                });
                if (item1) items.push(item1);
              }

              // Add item 2 has type selected...
              if (selection.type2) {
                const item2 = parseItem(selection.type2, {
                  projectTitle: selection.projectTitle2,
                  projectImage: selection.projectImgLandscape2
                    ? selection.projectImgLandscape2
                    : selection.projectImgSquare2
                    ? selection.projectImgSquare2
                    : null
                  // articleTitle: selection.articleTitle2,
                  // articleImage: selection.articleImage2
                });
                if (item2) items.push(item2);
              }

              const rowTitle = items.length === 2 ? `${items[0].title} • ${items[1].title}` : items[0]?.title || 'No item selected';
              const mediaItems = (
                <div className="media-items">
                  {items.map((item, index) =>
                    item.media?._ref ? (
                      <div className="media-item" key={index}>
                        <img
                          src={`https://cdn.sanity.io/images/${projectId}/${dataset}/${item.media._ref
                            .replace('image-', '')
                            .replace(/-(jpg|png|webp)$/, '.$1')}`}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="media-item --empty" key={index} />
                    )
                  )}
                </div>
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
  ]
});
