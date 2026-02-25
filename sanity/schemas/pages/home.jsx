import { defineField, defineType } from 'sanity';
import { ArrayMaxItems } from '../../components/array-max-items';
import { HomeIcon, ProjectsIcon, ImageIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID;
const dataset = import.meta.env.SANITY_STUDIO_DATASET;

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  singleton: true,
  icon: HomeIcon,
  fieldsets: [
    {
      name: 'hero',
      title: 'HERO'
    },
    {
      name: 'featured',
      title: 'FEATURED'
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
      name: 'heroVideo',
      title: 'Video',
      description: 'Fullscreen, background looping video',
      type: 'videoPlayer',
      validation: [
        Rule => Rule.required()
      ]
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
      fieldset: 'hero',
      name: 'heroCopy',
      title: 'Copy',
      type: 'string'
    }),
    defineField({
      fieldset: 'featured',
      name: 'sketchnoteLeft',
      title: 'Sketchnote (left gutter)',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'featured',
      name: 'sketchnoteRight',
      title: 'Sketchnote (right gutter)',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'featured',
      name: 'modalPaginationLabel',
      title: 'Modal Pagination Label',
      type: 'string',
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'featured',
      name: 'featuredGrid',
      title: 'Projects & Articles',
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
              hidden: ({ parent }) => {
                const items = parent?.items || [];

                // Must have exactly 2 items
                if (items.length !== 2) return true;

                // If either item is an article, hide layout
                const hasArticle = items.some(
                  (item) => item?.type?.[0]?._type === 'articleItem'
                );

                return hasArticle;
              }
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
                        },
                        {
                          name: 'articleItem',
                          title: 'Article',
                          type: 'object',
                          icon: ProjectsIcon,
                          fields: [
                            {
                              name: 'article',
                              title: 'Select a Zine Article',
                              type: 'reference',
                              to: [{ type: 'article' }],
                              validation: [
                                Rule => Rule.required()
                              ]
                            }
                          ],
                          preview: {
                            select: {
                              title: 'article.title',
                              slug: 'article.slug',
                              landscapeImg: 'article.ctaCardImages.landscapeImage.image.asset',
                              squareImg: 'article.ctaCardImages.squareImage.image.asset'
                            },
                            prepare(selection) {
                              const { title, slug, landscapeImg, squareImg } = selection;
                              let image = landscapeImg ? landscapeImg : squareImg ? squareImg : null;
                              return {
                                title: title ? title : 'Untitled',
                                subtitle: slug ? `/zine/${slug.current}` : '/zine/untitled',
                                media: image ? image : ImageIcon
                              };
                            }
                          }
                        },
                        {
                          name: 'sketchItem',
                          title: 'Sketch',
                          type: 'singleImage',
                          validation: [
                            Rule => Rule.required()
                          ]
                        }
                      ]
                    }
                  ],
                  preview: {
                    select: {
                      type0: 'type.0._type',
                      projectTitle: 'type.0.project.title',
                      projectImgLandscape: 'type.0.project.ctaCardImages.landscapeImage.image.asset',
                      projectImgSquare: 'type.0.project.ctaCardImages.squareImage.image.asset',
                      articleTitle: 'type.0.article.title',
                      articleSlug: 'type.0.article.slug.current',
                      articleImgLandscape: 'type.0.article.ctaCardImages.landscapeImage.image.asset',
                      articleImgSquare: 'type.0.article.ctaCardImages.squareImage.image.asset',
                      sketchTitle: 'type.0.image.asset.originalFilename',
                      sketchImg: 'type.0.image.asset'
                    },
                    prepare({
                      type0,
                      projectTitle,
                      projectImgLandscape,
                      projectImgSquare,
                      articleTitle,
                      articleSlug,
                      articleImgLandscape,
                      articleImgSquare,
                      sketchTitle,
                      sketchImg
                    }) {
                      let projectImage = projectImgLandscape ? projectImgLandscape : projectImgSquare ? projectImgSquare : null;
                      let articleImage = articleImgLandscape ? articleImgLandscape : articleImgSquare ? articleImgSquare : null;
                      let sketchImage = sketchImg ? sketchImg : null;
                      let title = 'No items selected';
                      let subtitle = '';
                      let media = null;

                      switch (type0) {
                        case 'projectItem':
                          title = projectTitle || 'Untitled';
                          media = projectImage ? projectImage : ImageIcon;
                          break;
                        case 'articleItem':
                          title = articleTitle || 'Untitled';
                          subtitle = `/zine/${articleSlug || 'untitled'}`;
                          media = articleImage ? articleImage : ImageIcon;
                          break;
                        case 'sketchItem':
                          title = sketchTitle || 'Untitled';
                          media = sketchImg ? sketchImg : ImageIcon;
                          break;
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
              articleTitle1: 'items.0.type.0.article.title',
              articleImgLandscape1: 'items.0.type.0.article.ctaCardImages.landscapeImage.image.asset',
              articleImgSquare1: 'items.0.type.0.article.ctaCardImages.squareImage.image.asset',
              sketchTitle1: 'items.0.type.0.image.asset.originalFilename',
              sketchImage1: 'items.0.type.0.image.asset',
              // Item 2
              type2: 'items.1.type.0._type',
              projectTitle2: 'items.1.type.0.project.title',
              projectImgLandscape2: 'items.1.type.0.project.ctaCardImages.landscapeImage.image.asset',
              projectImgSquare2: 'items.1.type.0.project.ctaCardImages.squareImage.image.asset',
              articleTitle2: 'items.1.type.0.article.title',
              articleImgLandscape2: 'items.1.type.0.article.ctaCardImages.landscapeImage.image.asset',
              articleImgSquare2: 'items.1.type.0.article.ctaCardImages.squareImage.image.asset',
              sketchTitle2: 'items.1.type.0.image.asset.originalFilename',
              sketchImage2: 'items.1.type.0.image.asset'
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
                  case 'articleItem':
                    title = data.articleTitle ? `[Article] ${data.articleTitle}` : 'Article';
                    media = data.articleImage || null;
                    break;
                  case 'sketchItem':
                    title = data.sketchTitle ? `[Sketch] ${data.sketchTitle}` : 'Sketch';
                    media = data.sketchImage || null;
                    break;
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
                    : null,
                  articleTitle: selection.articleTitle1,
                  articleImage: selection.articleImgLandscape1
                    ? selection.articleImgLandscape1
                    : selection.articleImgSquare1
                    ? selection.articleImgSquare1
                    : null,
                  sketchTitle: selection.sketchTitle1,
                  sketchImage: selection.sketchImage1 ? selection.sketchImage1 : null
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
                    : null,
                  articleTitle: selection.articleTitle2,
                  articleImage: selection.articleImgLandscape2
                    ? selection.articleImgLandscape2
                    : selection.articleImgSquare2
                    ? selection.articleImgSquare2
                    : null,
                  sketchTitle: selection.sketchTitle2,
                  sketchImage: selection.sketchImage2 ? selection.sketchImage2 : null
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
