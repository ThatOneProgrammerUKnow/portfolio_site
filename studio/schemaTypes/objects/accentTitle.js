// A headline with a highlighted (accent-coloured) part: { before, highlight, after }.
import { defineField, defineType } from 'sanity';

export const accentTitle = defineType({
  name: 'accentTitle',
  title: 'Title with highlight',
  type: 'object',
  fields: [
    defineField({ name: 'before', title: 'Before highlight', type: 'string' }),
    defineField({
      name: 'highlight',
      title: 'Highlighted words',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'after', title: 'After highlight', type: 'string' }),
  ],
});
