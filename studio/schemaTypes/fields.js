// Small field helpers reused by every page schema (DRY).
// Each returns a plain defineField() config, so the shapes stay close to src/content/*.json.
import { defineArrayMember, defineField } from 'sanity';

export const requiredString = (name, title, extra = {}) =>
  defineField({ name, title, type: 'string', validation: (rule) => rule.required(), ...extra });

export const requiredText = (name, title, extra = {}) =>
  defineField({ name, title, type: 'text', rows: 3, validation: (rule) => rule.required(), ...extra });

/** eyebrow + title, the heading pair most sections start with. */
export const headingFields = () => [requiredString('eyebrow', 'Eyebrow'), requiredString('title', 'Title')];

/** An array of short strings (tags, stack items, bullets). */
export const stringList = (name, title, extra = {}) =>
  defineField({ name, title, type: 'array', of: [defineArrayMember({ type: 'string' })], ...extra });

/** An array of paragraphs. */
export const paragraphList = (name, title, extra = {}) =>
  defineField({ name, title, type: 'array', of: [defineArrayMember({ type: 'text', rows: 4 })], ...extra });

/** A collapsible group of fields: one per page section (hero, experience, ...). */
export const section = (name, title, fields) =>
  defineField({
    name,
    title,
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields,
  });
