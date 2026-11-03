// Singleton: About page (src/content/about.json).
import { defineArrayMember, defineField, defineType } from 'sanity';
import { headingFields, paragraphList, requiredString, requiredText, section, stringList } from '../fields.js';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    section('hero', 'Hero', [
      requiredString('eyebrow', 'Eyebrow'),
      defineField({ name: 'title', title: 'Title', type: 'accentTitle', validation: (rule) => rule.required() }),
      paragraphList('paragraphs', 'Paragraphs'),
      defineField({ name: 'cta', title: 'Button', type: 'link' }),
      defineField({ name: 'image', title: 'Photo', type: 'imageWithAlt' }),
    ]),

    section('experience', 'Experience', [
      ...headingFields(),
      defineField({
        name: 'roles',
        title: 'Roles',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'experienceRole',
            type: 'object',
            fields: [
              requiredString('period', 'Period', { description: 'e.g. Mar 2026 – now' }),
              defineField({ name: 'current', title: 'Current role', type: 'boolean', initialValue: false }),
              requiredString('role', 'Role'),
              requiredString('company', 'Company'),
              stringList('bullets', 'Bullet points', { description: 'Use bullets or text.' }),
              defineField({ name: 'text', title: 'Text', type: 'text', rows: 3 }),
            ],
            preview: { select: { title: 'role', subtitle: 'company' } },
          }),
        ],
      }),
    ]),

    section('leadership', 'Leadership', [
      ...headingFields(),
      requiredText('intro', 'Intro'),
      section('link', 'Link', [
        defineField({ name: 'before', title: 'Text before', type: 'string' }),
        requiredString('label', 'Link text'),
        defineField({
          name: 'href',
          title: 'URL',
          type: 'url',
          validation: (rule) => rule.required().uri({ scheme: ['https'] }),
        }),
        defineField({ name: 'after', title: 'Text after', type: 'string' }),
      ]),
      defineField({
        name: 'roles',
        title: 'Roles',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'leadershipRole',
            type: 'object',
            fields: [requiredString('period', 'Period'), requiredString('title', 'Title'), requiredText('text', 'Text')],
            preview: { select: { title: 'title', subtitle: 'period' } },
          }),
        ],
      }),
    ]),

    section('learning', 'Certifications & education', [
      ...headingFields(),
      defineField({
        name: 'items',
        title: 'Items',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'learningItem',
            type: 'object',
            fields: [requiredString('title', 'Title'), requiredString('detail', 'Detail')],
            preview: { select: { title: 'title', subtitle: 'detail' } },
          }),
        ],
      }),
    ]),

    section('techStack', 'Tech stack', [
      ...headingFields(),
      defineField({
        name: 'groups',
        title: 'Groups',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'techGroup',
            type: 'object',
            fields: [requiredString('label', 'Label'), stringList('items', 'Items')],
            preview: { select: { title: 'label' } },
          }),
        ],
      }),
    ]),

    section('beyondCode', 'Beyond code', [
      ...headingFields(),
      defineField({
        name: 'items',
        title: 'Items',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'beyondCodeItem',
            type: 'object',
            fields: [requiredString('caption', 'Caption'), defineField({ name: 'image', title: 'Image', type: 'imageWithAlt' })],
            preview: { select: { title: 'caption', media: 'image' } },
          }),
        ],
      }),
    ]),
  ],
  preview: { prepare: () => ({ title: 'About page' }) },
});
