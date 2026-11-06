// A project (one entry of "projects" in src/content/projects.json).
// The case study ("detail") is optional: a project gets a /projects/:slug page only
// when `hasCaseStudy` is on, same rule as the JSON version.
import { defineArrayMember, defineField, defineType } from 'sanity';
import { requiredString, requiredText, section, stringList } from '../fields.js';

const titledText = (name, title) =>
  section(name, title, [requiredString('title', 'Heading'), requiredText('text', 'Text')]);

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'card', title: 'Card', default: true },
    { name: 'caseStudy', title: 'Case study' },
  ],
  fields: [
    requiredString('title', 'Title', { group: 'card' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'card',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      group: 'card',
      description: 'Lower numbers show first on the Projects page.',
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', group: 'card', initialValue: false }),
    defineField({
      name: 'featuredLabel',
      title: 'Featured label',
      type: 'string',
      group: 'card',
      hidden: ({ document }) => !document?.featured,
    }),
    stringList('meta', 'Meta', { group: 'card', description: 'e.g. "OrbTech", "In progress"' }),
    requiredText('summary', 'Summary', { group: 'card' }),
    stringList('stack', 'Stack', { group: 'card' }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      group: 'card',
      of: [defineArrayMember({ type: 'imageWithAlt' })],
    }),
    defineField({
      name: 'downloadUrl',
      title: 'Download link',
      type: 'url',
      group: 'card',
      description: 'Set this when people can download and use the app. Used by the Apps page (when it is the chosen app) and the "Download app" buttons on the Projects page.',
      validation: (rule) => rule.uri({ scheme: ['https'] }),
    }),

    defineField({
      name: 'hasCaseStudy',
      title: 'Has a case study page',
      type: 'boolean',
      group: 'caseStudy',
      initialValue: false,
    }),
    defineField({
      name: 'detail',
      title: 'Case study',
      type: 'object',
      group: 'caseStudy',
      hidden: ({ document }) => !document?.hasCaseStudy,
      fields: [
        defineField({
          name: 'facts',
          title: 'Facts',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'fact',
              type: 'object',
              fields: [requiredString('label', 'Label'), requiredString('value', 'Value')],
              preview: { select: { title: 'label', subtitle: 'value' } },
            }),
          ],
        }),
        defineField({
          name: 'screens',
          title: 'Screens',
          type: 'array',
          of: [defineArrayMember({ type: 'imageWithAlt' })],
        }),
        titledText('goal', 'The goal'),
        section('built', 'What I built', [
          requiredString('title', 'Heading'),
          defineField({
            name: 'parts',
            title: 'Parts',
            type: 'array',
            of: [
              defineArrayMember({
                name: 'builtPart',
                type: 'object',
                fields: [
                  stringList('label', 'Label', { description: 'e.g. "Mobile app", "v1"' }),
                  stringList('items', 'Items'),
                ],
                preview: { select: { title: 'label.0', subtitle: 'label.1' } },
              }),
            ],
          }),
        ]),
        section('process', 'How I work on it', [requiredString('title', 'Heading'), stringList('steps', 'Steps')]),
        defineField({
          name: 'next',
          title: 'Next project',
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
    }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'slug.current', media: 'images.0' },
  },
});
