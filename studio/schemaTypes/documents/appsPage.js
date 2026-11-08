// Singleton: the "My products" page (/my-products). The document keeps its original
// type and ID `appsPage` (internal only, like project-budget-tracker); only the title changed. One app, its install guide, what beta means,
// the roadmap and a link to the project. The download link, app name and project link
// come from the chosen Project (Project → Card → Download link).
import { defineArrayMember, defineField, defineType } from 'sanity';
import { requiredString, requiredText, section } from '../fields.js';

const richText = (name, title) =>
  defineField({ name, title, type: 'richText', validation: (rule) => rule.required() });

const ROADMAP_STATUS = [
  { title: 'Now (filled dot)', value: 'now' },
  { title: 'Next (blue ring)', value: 'next' },
  { title: 'Later (grey ring)', value: 'later' },
];

export const appsPage = defineType({
  name: 'appsPage',
  title: 'My products page',
  type: 'document',
  fields: [
    requiredString('pageTitle', 'Browser tab title', { description: 'e.g. "My products"' }),
    defineField({
      name: 'app',
      title: 'App',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Its title, Download link and case study are used on this page.',
      validation: (rule) => rule.required(),
    }),
    section('header', 'Header', [
      requiredString('badge', 'Badge', { description: 'e.g. "My Products · Beta release"' }),
      defineField({ name: 'title', title: 'Title', type: 'accentTitle', validation: (rule) => rule.required() }),
      requiredText('lead', 'Lead'),
    ]),
    section('card', 'App card (blue)', [
      defineField({ name: 'icon', title: 'App icon', type: 'imageWithAlt' }),
      requiredText('tagline', 'Tagline'),
      requiredString('downloadLabel', 'Download button', { description: 'e.g. "Download fundsviewer.apk"' }),
      requiredString('note', 'Small print'),
    ]),
    section('install', 'How to install', [
      requiredString('title', 'Heading'),
      requiredString('intro', 'Intro'),
      defineField({
        name: 'steps',
        title: 'Steps',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'installStep',
            type: 'object',
            fields: [requiredString('title', 'Title'), richText('text', 'Text')],
            preview: { select: { title: 'title' } },
          }),
        ],
      }),
    ]),
    section('beta', 'What beta means', [
      requiredString('eyebrow', 'Eyebrow'),
      requiredString('title', 'Heading'),
      defineField({
        name: 'cards',
        title: 'Cards',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'betaCard',
            type: 'object',
            fields: [requiredString('title', 'Title'), richText('text', 'Text')],
            preview: { select: { title: 'title' } },
          }),
        ],
      }),
    ]),
    section('roadmap', 'Roadmap', [
      requiredString('eyebrow', 'Eyebrow'),
      requiredString('title', 'Heading'),
      requiredText('text', 'Text'),
      defineField({
        name: 'items',
        title: 'Milestones',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'roadmapItem',
            type: 'object',
            fields: [
              requiredString('label', 'When', { description: 'e.g. "Now", "December 2026", "Later"' }),
              requiredString('title', 'What'),
              requiredString('status', 'Dot', {
                options: { list: ROADMAP_STATUS, layout: 'radio', direction: 'horizontal' },
                initialValue: 'later',
              }),
            ],
            preview: { select: { title: 'title', subtitle: 'label' } },
          }),
        ],
      }),
    ]),
    section('more', 'Read more (blue link)', [
      requiredString('eyebrow', 'Eyebrow'),
      requiredString('label', 'Link text'),
    ]),
  ],
  preview: { prepare: () => ({ title: 'My products page' }) },
});
