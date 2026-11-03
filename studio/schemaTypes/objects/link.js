// A site link: either an internal path ("/projects") or one of the shared links in
// Site settings (linkKey: github / linkedin / email / cv). Mirrors { label, to | linkKey }
// in src/content/*.json.
import { defineField, defineType } from 'sanity';

export const LINK_KEYS = [
  { title: 'GitHub', value: 'github' },
  { title: 'LinkedIn', value: 'linkedin' },
  { title: 'Email', value: 'email' },
  { title: 'CV', value: 'cv' },
];

/** Exactly one of `to` / `linkKey` must be set. */
export const validateLink = (value) => {
  if (!value) return true;
  const count = [value.to, value.linkKey].filter(Boolean).length;
  return count === 1 ? true : 'Set either a page path or a shared link, not both.';
};

/** Fields shared by `link` and nav items. */
export const linkTargetFields = () => [
  defineField({
    name: 'to',
    title: 'Page path',
    type: 'string',
    description: 'Internal path, e.g. /projects or /projects#brighthire',
    validation: (rule) => rule.regex(/^\/[^\s]*$/, { name: 'path' }).error('Must start with "/".'),
  }),
  defineField({
    name: 'linkKey',
    title: 'Shared link',
    type: 'string',
    description: 'Uses the URL from Site settings.',
    options: { list: LINK_KEYS, layout: 'radio', direction: 'horizontal' },
  }),
];

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
    ...linkTargetFields(),
  ],
  validation: (rule) => rule.custom(validateLink),
});
