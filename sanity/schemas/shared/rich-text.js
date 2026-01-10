import { defineType, defineField } from 'sanity';
import { BlockContentIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Subhead', value: 'h4' }
          ],
          marks: {
            decorators: [],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: [
                      (Rule) => Rule.uri({ scheme: ['http', 'https', 'tel', 'mailto'] })
                    ]
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'singleImage'
        }
      ],
      validation: [
        Rule => Rule.required()
      ]
    })
  ]
});
