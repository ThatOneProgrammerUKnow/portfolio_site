// Singleton: Home page (src/content/home.json).
import { defineArrayMember, defineField, defineType } from 'sanity';
import { headingFields, paragraphList, requiredString, requiredText, section, stringList } from '../fields.js';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    section('hero', 'Hero', [
      requiredString('badge', 'Badge'),
      defineField({ name: 'title', title: 'Title', type: 'accentTitle', validation: (rule) => rule.required() }),
      requiredText('lead', 'Lead'),
      defineField({ name: 'primaryCta', title: 'Primary button', type: 'link' }),
      defineField({ name: 'secondaryCta', title: 'Secondary button', type: 'link' }),
      defineField({ name: 'image', title: 'Portrait', type: 'imageWithAlt' }),
      defineField({
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'tag',
            type: 'object',
            fields: [
              requiredString('label', 'Label'),
              defineField({
                name: 'tone',
                title: 'Tone',
                type: 'string',
                options: { list: ['light', 'dark'], layout: 'radio', direction: 'horizontal' },
                initialValue: 'light',
                validation: (rule) => rule.required(),
              }),
            ],
          }),
        ],
      }),
    ]),

    section('howIWork', 'How I work', [
      ...headingFields(),
      defineField({
        name: 'steps',
        title: 'Steps',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'step',
            type: 'object',
            fields: [
              requiredString('number', 'Number', { description: 'e.g. 01' }),
              requiredString('title', 'Title'),
              paragraphList('paragraphs', 'Paragraphs'),
              defineField({
                name: 'images',
                title: 'Images',
                type: 'array',
                of: [defineArrayMember({ type: 'imageWithAlt' })],
              }),
            ],
            preview: { select: { title: 'title', subtitle: 'number' } },
          }),
        ],
      }),
    ]),

    section('selectedWork', 'Selected work', [
      ...headingFields(),
      defineField({ name: 'allLink', title: '"All projects" link', type: 'link' }),
      defineField({
        name: 'projects',
        title: 'Projects',
        description: 'Title and link come from the project; the rest is the short home-page version.',
        type: 'array',
        validation: (rule) => rule.max(3),
        of: [
          defineArrayMember({
            name: 'workItem',
            type: 'object',
            fields: [
              defineField({
                name: 'project',
                title: 'Project',
                type: 'reference',
                to: [{ type: 'project' }],
                validation: (rule) => rule.required(),
              }),
              stringList('meta', 'Meta', { description: 'e.g. "OrbTech", "In progress"' }),
              requiredText('text', 'Short description'),
              stringList('stack', 'Stack'),
              defineField({ name: 'image', title: 'Image', type: 'imageWithAlt' }),
            ],
            preview: { select: { title: 'project.title', subtitle: 'text', media: 'image' } },
          }),
        ],
      }),
    ]),

    section('rightNow', 'Right now', [
      ...headingFields(),
      defineField({
        name: 'items',
        title: 'Items',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'rightNowItem',
            type: 'object',
            fields: [requiredString('label', 'Label'), requiredText('text', 'Text')],
          }),
        ],
      }),
    ]),

    section('contactCta', 'Contact call-to-action', [
      requiredString('title', 'Title'),
      requiredString('text', 'Text'),
    ]),
  ],
  preview: { prepare: () => ({ title: 'Home page' }) },
});
