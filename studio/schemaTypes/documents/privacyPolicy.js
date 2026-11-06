// An app's privacy policy, shown at /my-products/<slug>/privacy-policy.
// One document per app. The text must match the policy shown inside the app.
import { defineArrayMember, defineField, defineType } from 'sanity';
import { requiredString } from '../fields.js';

export const privacyPolicy = defineType({
  name: 'privacyPolicy',
  title: 'Privacy policy',
  type: 'document',
  fields: [
    requiredString('eyebrow', 'Eyebrow', { description: 'e.g. "Funds Viewer"' }),
    requiredString('title', 'Title'),
    defineField({
      name: 'slug',
      title: 'URL name',
      type: 'slug',
      description: 'The app part of the URL: /my-products/<this>/privacy-policy (e.g. "fundsviewer"). Changing it breaks links in the app stores.',
      validation: (rule) => rule.required(),
    }),
    requiredString('version', 'Version', { description: 'e.g. "v0.3". Shown next to the date.' }),
    defineField({
      name: 'lastUpdated',
      title: 'Last updated',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    requiredString('lastUpdatedLabel', 'Label for "Last updated"'),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'policySection',
          type: 'object',
          fields: [
            requiredString('heading', 'Heading'),
            defineField({ name: 'text', title: 'Text', type: 'richText', validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'heading' } },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'slug.current' } },
});
