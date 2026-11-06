// Short rich text: paragraphs with **bold** and links only (no headings, lists or images).
// Rendered on the site by src/components/RichText (no HTML strings, no extra library).
import { defineArrayMember, defineField, defineType } from 'sanity';

export const richText = defineType({
  name: 'richText',
  title: 'Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [{ title: 'Bold', value: 'strong' }],
        annotations: [
          defineField({
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                description: 'https://… or mailto:you@example.com',
                validation: (rule) => rule.required().uri({ scheme: ['https', 'mailto'] }),
              }),
            ],
          }),
        ],
      },
    }),
  ],
});
