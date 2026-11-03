// Singleton: site-wide settings (src/content/site.json).
import { defineArrayMember, defineField, defineType } from 'sanity';
import { requiredString, section } from '../fields.js';
import { LINK_KEYS, linkTargetFields, validateLink } from '../objects/link.js';

const externalLink = (name, title) =>
  section(name, title, [
    requiredString('label', 'Label'),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required().uri({ scheme: ['https'] }),
    }),
  ]);

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    requiredString('name', 'Name'),
    requiredString('role', 'Role'),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    section('links', 'Shared links', [
      externalLink('github', 'GitHub'),
      externalLink('linkedin', 'LinkedIn'),
      section('email', 'Email link', [requiredString('label', 'Label')]),
      section('cv', 'CV', [
        requiredString('label', 'Label'),
        defineField({
          name: 'file',
          title: 'CV (PDF)',
          type: 'file',
          options: { accept: 'application/pdf' },
          description: 'Uploaded files are public, like everything on the site.',
        }),
      ]),
    ]),
    section('nav', 'Menu', [
      requiredString('ariaLabel', 'Menu label (screen readers)'),
      requiredString('openLabel', 'Open button label'),
      requiredString('closeLabel', 'Close button label'),
      defineField({
        name: 'items',
        title: 'Items',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'navItem',
            type: 'object',
            fields: [
              requiredString('number', 'Number', { description: 'e.g. 01' }),
              requiredString('label', 'Label'),
              ...linkTargetFields(),
            ],
            validation: (rule) => rule.custom(validateLink),
            preview: { select: { title: 'label', subtitle: 'number' } },
          }),
        ],
      }),
    ]),
    requiredString('skipLink', 'Skip link text'),
    section('footer', 'Footer', [
      requiredString('quote', 'Quote'),
      requiredString('reference', 'Reference'),
      defineField({
        name: 'linkKeys',
        title: 'Footer links',
        type: 'array',
        of: [defineArrayMember({ type: 'string' })],
        options: { list: LINK_KEYS },
      }),
    ]),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
