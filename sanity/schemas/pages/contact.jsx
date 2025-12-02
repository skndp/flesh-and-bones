import { defineField, defineType } from 'sanity';
import { ArrayMaxItems } from '../../components/array-max-items';
import { DashboardIcon, UlistIcon, StringIcon, UserIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  singleton: true,
  icon: DashboardIcon,
  fieldsets: [
    {
      name: 'hero',
      title: 'HERO'
    },
    {
      name: 'directory',
      title: 'DIRECTORY'
    },
    {
      name: 'founders',
      title: 'FOUNDERS'
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      hidden: false
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
      fieldset: 'directory',
      name: 'directory',
      title: 'Rows',
      type: 'array',
      validation: [
        Rule => Rule.required().min(1).error('Please include at least 1 directory row')
      ],
      of: [
        {
          name: 'row',
          title: 'Row',
          type: 'object',
          icon: UlistIcon,
          validation: [
            Rule => Rule.required()
          ],
          fields: [
            {
              name: 'sketchnote',
              title: 'Sketchnote',
              type: 'text',
              rows: 3,
              validation: [
                Rule => Rule.required()
              ]
            },
            {
              name: 'lists',
              title: 'Lists',
              type: 'array',
              validation: [
                Rule => Rule.required().min(1).error('Please include at least 1 list')
              ],
              of: [
                {
                  name: 'list',
                  title: 'List',
                  type: 'object',
                  icon: UlistIcon,
                  validation: [
                    Rule => Rule.required()
                  ],
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: [
                        Rule => Rule.required()
                      ]
                    },
                    {
                      name: 'items',
                      title: 'Items',
                      type: 'array',
                      validation: [
                        Rule => Rule.required().min(1).error('Please include at least 1 list item')
                      ],
                      of: [
                        {
                          name: 'item',
                          title: 'Item',
                          type: 'object',
                          icon: StringIcon,
                          validation: [
                            Rule => Rule.required()
                          ],
                          fields: [
                            {
                              name: 'label',
                              title: 'Label',
                              type: 'string',
                              validation: [
                                Rule => Rule.required()
                              ]
                            },
                            {
                              name: 'link',
                              title: 'Link (optional)',
                              type: 'url',
                              validation: [
                                Rule => Rule.uri({ scheme: ['https', 'http', 'mailto', 'tel'] })
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ],
          preview: {
            select: {
              firstListLabel: 'lists.0.label',
              secondListLabel: 'lists.1.label'
            },
            prepare({ firstListLabel, secondListLabel }) {
              let titleLabel = firstListLabel ? firstListLabel : 'No list created';

              if (firstListLabel && secondListLabel) {
                titleLabel = `${firstListLabel} • ${secondListLabel}`;
              }

              return {
                title: titleLabel
              }
            }
          }
        }
      ]
    }),
    defineField({
      fieldset: 'founders',
      name: 'foundersSketchnote',
      title: 'Sketchnote',
      type: 'text',
      rows: 2,
      validation: [
        Rule => Rule.required()
      ]
    }),
    defineField({
      fieldset: 'founders',
      name: 'founders',
      title: 'Founders',
      type: 'array',
      components: { input: ArrayMaxItems },
      validation: [
        Rule => Rule.required().min(2).max(2).error('Please include 2 founders')
      ],
      of: [
        {
          name: 'founder',
          title: 'Founder',
          type: 'object',
          icon: UserIcon,
          validation: [
            Rule => Rule.required()
          ],
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: [
                Rule => Rule.required()
              ]
            },
            {
              name: 'role',
              title: 'Role',
              type: 'string',
              validation: [
                Rule => Rule.required()
              ]
            },
            {
              name: 'email',
              title: 'Email',
              type: 'string',
              validation: [
                Rule => Rule.required().email().error('Please enter a valid email address')
              ]
            },
            {
              name: 'location',
              title: 'Location',
              type: 'string',
              validation: [
                Rule => Rule.required()
              ]
            },
            {
              name: 'bio',
              title: 'Bio',
              type: 'text',
              rows: 10,
              validation: [
                Rule => Rule.required()
              ]
            }
          ]
        }
      ]
    })
  ]
});
