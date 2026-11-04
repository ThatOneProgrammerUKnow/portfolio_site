// Singleton: Apps page copy. The apps themselves are the `project` documents
// that have a download link (Project → Card → Download link).
import { defineField, defineType } from 'sanity';
import { requiredString, requiredText, section } from '../fields.js';

export const appsPage = defineType({
  name: 'appsPage',
  title: 'Apps page',
  type: 'document',
  fields: [
    section('hero', 'Hero', [
      requiredString('eyebrow', 'Eyebrow'),
      defineField({ name: 'title', title: 'Title', type: 'accentTitle', validation: (rule) => rule.required() }),
      requiredText('lead', 'Lead'),
    ]),
    requiredString('downloadLabel', 'Download button'),
    requiredString('viewProjectLabel', 'View project button'),
  ],
  preview: { prepare: () => ({ title: 'Apps page' }) },
});
