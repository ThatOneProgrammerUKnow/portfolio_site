// Singleton: Projects page copy (the non-project parts of src/content/projects.json).
// The projects themselves are separate `project` documents.
import { defineField, defineType } from 'sanity';
import { requiredString, requiredText, section } from '../fields.js';

export const projectsPage = defineType({
  name: 'projectsPage',
  title: 'Projects page',
  type: 'document',
  fields: [
    section('hero', 'Hero', [
      requiredString('eyebrow', 'Eyebrow'),
      defineField({ name: 'title', title: 'Title', type: 'accentTitle', validation: (rule) => rule.required() }),
      requiredText('lead', 'Lead'),
    ]),
    requiredString('featuredCta', 'Featured project button'),
    requiredString('downloadCta', 'Download app button', {
      description: 'Shown on projects that have a download link; links to the Apps page.',
    }),
    requiredString('backLink', 'Case study: back link'),
    requiredString('nextLabel', 'Case study: next project label'),
  ],
  preview: { prepare: () => ({ title: 'Projects page' }) },
});
