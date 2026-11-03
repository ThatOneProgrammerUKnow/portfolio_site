// Singleton: Contact page (src/content/contact.json).
import { defineArrayMember, defineField, defineType } from 'sanity';
import { requiredString, requiredText, section } from '../fields.js';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  fields: [
    section('hero', 'Hero', [
      requiredString('eyebrow', 'Eyebrow'),
      defineField({ name: 'title', title: 'Title', type: 'accentTitle', validation: (rule) => rule.required() }),
      requiredText('lead', 'Lead'),
    ]),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'contactCard',
          type: 'object',
          fields: [
            requiredString('label', 'Label'),
            requiredString('title', 'Title'),
            defineField({ name: 'text', title: 'Text', type: 'string' }),
            defineField({ name: 'link', title: 'Link', type: 'link' }),
          ],
          preview: { select: { title: 'label', subtitle: 'title' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Contact page' }) },
});
